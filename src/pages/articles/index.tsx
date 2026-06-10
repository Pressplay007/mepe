import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Newspaper,
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SEO from "../../components/common/SEO";
import { type Article } from "../../data/articles";
import { listPublishedArticles } from "../../services/articles";
import { articlePath } from "../../lib/slug";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;
type ViewMode = "grid" | "list";

const ArticleCard = ({
  article,
  view,
}: {
  article: Article;
  view: ViewMode;
}) => {
  const imageBlock = (
    <div
      className={cn(
        "relative overflow-hidden bg-mda-cream shrink-0",
        view === "grid"
          ? "aspect-[16/10] w-full rounded-xl"
          : "w-full sm:w-56 md:w-72 aspect-[16/10] sm:aspect-auto sm:min-h-[160px] rounded-xl sm:rounded-2xl",
      )}
    >
      {article.image ? (
        <img
          src={article.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-mda-maroon/5">
          <Newspaper className="w-10 h-10 text-mda-maroon/15" />
        </div>
      )}
    </div>
  );

  const meta = (
    <p className="text-xs font-semibold uppercase tracking-wide">
      <span className="text-amber-600">{article.category}</span>
      <span className="text-mda-maroon/25 mx-2">•</span>
      <span className="text-mda-maroon/40">{article.date}</span>
    </p>
  );

  const body = (
    <div
      className={cn(
        "flex flex-col justify-center min-w-0",
        view === "grid" ? "gap-2 pt-4" : "gap-2 p-5 md:p-6 flex-1",
      )}
    >
      {meta}
      <h3
        className={cn(
          "font-bold text-mda-maroon leading-snug group-hover:text-mda-pink transition-colors",
          view === "grid"
            ? "text-lg md:text-xl line-clamp-2"
            : "text-xl md:text-2xl line-clamp-2",
        )}
      >
        {article.title}
      </h3>
      {view === "list" && article.summary && (
        <p className="text-sm text-mda-maroon/55 leading-relaxed line-clamp-2">
          {article.summary}
        </p>
      )}
      <p className="text-sm text-mda-maroon/40">
        {article.author ? `By ${article.author}` : "Mepe Development Association"}
      </p>
    </div>
  );

  const card = (
    <Link
      to={articlePath(article)}
      className={cn(
        "group block",
        view === "list" &&
          "flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white rounded-2xl border border-mda-maroon/5 p-4 sm:p-0 sm:overflow-hidden hover:shadow-md transition-shadow",
      )}
    >
      {imageBlock}
      {body}
    </Link>
  );

  return view === "grid" ? card : <article>{card}</article>;
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    listPublishedArticles()
      .then(setArticles)
      .catch((err) => {
        console.error("[Articles] Failed to load articles:", err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(articles.map((a) => a.category))].filter(Boolean);
    return ["All", ...cats.sort()];
  }, [articles]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return articles.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.author?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [articles, activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [search, activeCategory, view]);

  return (
    <div className="bg-mda-cream min-h-screen">
      <SEO
        title="Articles | Mepe Development Association"
        description="Read the latest news, stories, and articles from the Mepe Development Association."
      />

      {/* Hero */}
      <section className="relative py-20 md:py-32 bg-mda-maroon overflow-hidden min-h-[45vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[60%] bg-mda-pink/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[50%] bg-mda-pink/5 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Newspaper size={14} className="text-mda-pink" />
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                Community Stories
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white leading-[0.95] uppercase mb-6">
              News &{" "}
              <span className="text-mda-pink italic font-serif normal-case">
                Articles
              </span>
            </h1>
            <p className="font-body text-lg md:text-xl text-white/50 max-w-xl leading-relaxed border-l-2 border-mda-pink/40 pl-6">
              Stories, updates, and insights from the Mepe Development
              Association and our community.
            </p>
          </div>
        </div>
      </section>

      {/* Listing */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 md:mb-10">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                    activeCategory === cat
                      ? "bg-mda-pink/15 border-mda-pink/30 text-mda-maroon"
                      : "bg-white border-mda-maroon/10 text-mda-maroon/55 hover:border-mda-maroon/25 hover:text-mda-maroon",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1 sm:w-64 lg:w-72">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/30"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-mda-maroon/10 bg-white text-sm text-mda-maroon placeholder:text-mda-maroon/35 focus:outline-none focus:border-mda-pink/40 transition-colors"
                />
              </div>

              <div className="flex items-center gap-1 p-1 rounded-full border border-mda-maroon/10 bg-mda-cream/30 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-label="Grid view"
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    view === "grid"
                      ? "bg-mda-maroon text-white"
                      : "text-mda-maroon/50 hover:text-mda-maroon",
                  )}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    view === "list"
                      ? "bg-mda-maroon text-white"
                      : "text-mda-maroon/50 hover:text-mda-maroon",
                  )}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
            </div>
          ) : paginated.length > 0 ? (
            <>
              <div
                className={cn(
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
                    : "flex flex-col gap-4 md:gap-5",
                )}
              >
                {paginated.map((article) => (
                  <ArticleCard key={article.id} article={article} view={view} />
                ))}
              </div>

              {filtered.length > PAGE_SIZE && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-mda-maroon/5">
                  <p className="text-sm text-mda-maroon/45">
                    Showing {(page - 1) * PAGE_SIZE + 1}–
                    {Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
                    {filtered.length} articles
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-full border border-mda-maroon/10 text-mda-maroon disabled:opacity-30 hover:bg-mda-cream transition-colors"
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-sm font-medium text-mda-maroon px-2">
                      {page} / {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-full border border-mda-maroon/10 text-mda-maroon disabled:opacity-30 hover:bg-mda-cream transition-colors"
                      aria-label="Next page"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-mda-maroon/5 bg-mda-cream/30 p-12 md:p-20 text-center">
              <Newspaper className="w-10 h-10 text-mda-maroon/15 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-mda-maroon mb-2">
                {articles.length === 0
                  ? "No articles yet"
                  : "No articles match your search"}
              </h3>
              <p className="text-sm text-mda-maroon/40 max-w-md mx-auto mb-8">
                {articles.length === 0
                  ? "Published articles will appear here once they are posted."
                  : "Try a different category or search term."}
              </p>
              {articles.length === 0 && (
                <Link
                  to="/announcements"
                  className="inline-flex items-center gap-2 text-mda-pink font-bold uppercase tracking-widest text-xs hover:text-mda-maroon transition-colors"
                >
                  View official announcements
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;

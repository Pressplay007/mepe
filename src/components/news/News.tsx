import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Newspaper, ArrowRight } from "lucide-react";
import type { Article } from "../../data/articles";
import { listPublishedArticles } from "../../services/articles";
import { articlePath } from "../../lib/slug";

const News = () => {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    listPublishedArticles()
      .then(setItems)
      .catch((err) => {
        console.error("[News] Failed to load articles:", err);
        setItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(items.map((a) => a.category))].filter(Boolean);
    return ["All", ...cats.sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.author?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, activeCategory, search]);

  const displayed = filtered.slice(0, 9);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-mda-maroon tracking-tight mb-10 md:mb-12">
          Latest Articles
        </h2>

        {/* Filters + search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 md:mb-12">
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-mda-pink/15 border-mda-pink/30 text-mda-maroon"
                    : "bg-white border-mda-maroon/10 text-mda-maroon/55 hover:border-mda-maroon/25 hover:text-mda-maroon"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72 xl:w-80 shrink-0">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/30"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-mda-maroon/10 bg-white text-sm text-mda-maroon placeholder:text-mda-maroon/35 focus:outline-none focus:border-mda-pink/40 transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
          </div>
        ) : displayed.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {displayed.map((item) => (
                <Link
                  key={item.id}
                  to={articlePath(item)}
                  className="group flex flex-col gap-4"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-mda-cream">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-mda-maroon/5">
                        <Newspaper
                          size={36}
                          className="text-mda-maroon/15"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wide">
                      <span className="text-amber-600">{item.category}</span>
                      <span className="text-mda-maroon/25 mx-2">•</span>
                      <span className="text-mda-maroon/40">{item.date}</span>
                    </p>
                    <h3 className="text-lg md:text-xl font-bold text-mda-maroon leading-snug group-hover:text-mda-pink transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-mda-maroon/40">
                      {item.author ? `By ${item.author}` : "Mepe Development Association"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length > 9 && (
              <p className="text-center text-sm text-mda-maroon/40 mt-8">
                Showing 9 of {filtered.length} articles
              </p>
            )}

            <div className="flex justify-center mt-12">
              <Link
                to="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-mda-maroon/10 text-sm font-semibold text-mda-maroon hover:bg-mda-pink/10 hover:border-mda-pink/30 transition-colors"
              >
                View all articles
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-mda-maroon/5 bg-mda-cream/30 p-12 md:p-20 text-center">
            <Newspaper className="w-10 h-10 text-mda-maroon/15 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-mda-maroon mb-2">
              {items.length === 0
                ? "No articles yet"
                : "No articles match your search"}
            </h3>
            <p className="text-sm text-mda-maroon/40 max-w-md mx-auto">
              {items.length === 0
                ? "Published articles will appear here once they are posted."
                : "Try a different category or search term."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;

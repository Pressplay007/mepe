import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Newspaper,
  Plus,
  Search,
  Edit2,
  Trash2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { type Article } from "../../data/articles";
import { listArticles, deleteArticle } from "../../services/articles";
import { useConfirm } from "../../components/common/ConfirmDialog";

const statusStyle = (status?: Article["status"]) => {
  switch (status) {
    case "Published":
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "Scheduled":
      return "bg-amber-50 text-amber-600 border-amber-200";
    default:
      return "bg-mda-cream text-mda-maroon/60 border-mda-maroon/10";
  }
};

const ArticlesManagement = () => {
  const confirm = useConfirm();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    listArticles()
      .then(setArticles)
      .catch((e) => setError(e.message ?? "Failed to load articles."))
      .finally(() => setLoading(false));
  }, []);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    const ok = await confirm({
      title: "Delete article",
      description:
        "This will permanently remove the article. This cannot be undone.",
      confirmText: "Delete",
    });
    if (!ok) return;
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
      toast.success("Article deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    }
  };

  return (
    <div className="space-y-8 animate-reveal">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            NEWS & <span className="text-mda-pink">ARTICLES</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
            Write, publish, and manage community articles.
          </p>
        </div>
        <Link
          to="/admin/articles/new"
          className="bg-mda-maroon text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[15px] px-6 py-4">
          <p className="text-xs font-medium text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/20"
            size={18}
          />
          <input
            type="text"
            placeholder="Search articles by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-4 pl-12 pr-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm hover:shadow-xl hover:shadow-mda-maroon/5 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-6 flex-1 min-w-0">
                {article.image ? (
                  <img
                    src={article.image}
                    alt=""
                    className="w-20 h-20 rounded-[10px] object-cover shrink-0 border border-mda-maroon/5"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-[10px] flex items-center justify-center shrink-0 bg-mda-pink/10 text-mda-pink">
                    <Newspaper size={24} />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-mda-pink">
                      {article.category}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${statusStyle(article.status)}`}
                    >
                      {article.status || "Draft"}
                    </span>
                  </div>
                  <h3 className="text-[25px] font-bold text-mda-maroon truncate">
                    {article.title}
                  </h3>
                  <p className="text-xs text-mda-maroon/40 mt-1 line-clamp-1">
                    {article.summary || "No summary provided."}
                  </p>
                  {article.author && (
                    <p className="text-[10px] text-mda-maroon/30 mt-1 uppercase tracking-widest">
                      By {article.author}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-4 lg:pt-0 border-mda-maroon/5">
                <div className="flex items-center gap-2 text-mda-maroon/40">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {article.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/articles/${article.id}/edit`}
                    className="p-3 hover:bg-mda-cream rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button
                    className="p-3 hover:bg-red-50 rounded-xl text-mda-maroon/40 hover:text-red-500 transition-all"
                    title="Delete"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredArticles.length === 0 && (
        <div className="bg-white p-20 rounded-3xl border border-mda-maroon/5 shadow-sm text-center">
          <div className="w-20 h-20 bg-mda-cream rounded-3xl flex items-center justify-center mx-auto mb-6 text-mda-maroon/20">
            <Newspaper size={40} />
          </div>
          <h3 className="text-xl font-display text-mda-maroon uppercase">
            No articles found
          </h3>
          <p className="text-mda-maroon/40 mt-2 text-sm font-medium">
            Create your first article to get started.
          </p>
          <Link
            to="/admin/articles/new"
            className="inline-block mt-6 text-mda-pink font-bold uppercase tracking-widest text-[10px] hover:text-mda-maroon transition-colors"
          >
            Write an article
          </Link>
        </div>
      )}

      <div className="p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
          Showing{" "}
          <span className="text-mda-maroon">{filteredArticles.length}</span>{" "}
          articles
        </p>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white border border-mda-maroon/5 rounded-xl text-mda-maroon/20 cursor-not-allowed shadow-sm">
            <ChevronLeft size={18} />
          </button>
          <button className="p-3 bg-white border border-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:bg-mda-cream transition-colors shadow-sm">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default ArticlesManagement;

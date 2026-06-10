import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { Article } from "../../data/articles";
import { getArticle, updateArticle } from "../../services/articles";
import ArticleForm from "../../components/admin/ArticleForm";

const EditArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    getArticle(id)
      .then((data) => {
        if (!data) {
          setError("Article not found.");
          return;
        }
        setArticle(data);
      })
      .catch((e) => setError(e.message ?? "Failed to load article."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (updated: Partial<Article>) => {
    if (!article) return;
    await updateArticle(article.id, { ...article, ...updated } as Omit<Article, "id">);
    toast.success("Article updated.");
    navigate("/admin/articles");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="space-y-6">
        <Link
          to="/admin/articles"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-mda-maroon/50 hover:text-mda-maroon transition-colors"
        >
          <ArrowLeft size={14} />
          Back to articles
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-[15px] px-6 py-4">
          <p className="text-xs font-medium text-red-600">
            {error || "Article not found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-reveal pb-24">
      <div className="flex flex-col gap-4">
        <Link
          to="/admin/articles"
          className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-mda-maroon/50 hover:text-mda-maroon transition-colors w-fit"
        >
          <ArrowLeft size={14} />
          Back to articles
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-display text-mda-maroon uppercase leading-tight">
            Edit <span className="text-mda-pink">Article</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide text-sm line-clamp-1">
            {article.title}
          </p>
        </div>
      </div>

      <ArticleForm
        key={article.id}
        initial={article}
        saveLabel="Save Changes"
        onSubmit={handleSubmit}
        onCancel={() => navigate("/admin/articles")}
      />

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

export default EditArticlePage;

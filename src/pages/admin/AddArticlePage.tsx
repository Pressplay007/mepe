import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import type { Article } from "../../data/articles";
import { createArticle } from "../../services/articles";
import ArticleForm from "../../components/admin/ArticleForm";
import { makeEmptyArticle } from "../../components/admin/articleDefaults";

const AddArticlePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (article: Partial<Article>) => {
    const created = await createArticle(article as Omit<Article, "id">);
    toast.success(
      created.status === "Published" ? "Article published." : "Article saved.",
    );
    navigate("/admin/articles");
  };

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
            Write <span className="text-mda-pink">Article</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide text-sm">
            Compose and publish news for the community.
          </p>
        </div>
      </div>

      <ArticleForm
        initial={makeEmptyArticle()}
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

export default AddArticlePage;

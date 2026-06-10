import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Tag,
  User,
  ArrowRight,
  Newspaper,
} from "lucide-react";
import SEO from "../../components/common/SEO";
import ArticleContent from "../../components/common/ArticleContent";
import { type Article } from "../../data/articles";
import { getArticleBySlug, listArticles } from "../../services/articles";
import { articlePath } from "../../lib/slug";

const ArticleDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    Promise.all([getArticleBySlug(slug), listArticles()])
      .then(([found, all]) => {
        const published = all.filter(
          (a) => !a.status || a.status === "Published",
        );
        if (!found || found.status === "Draft" || found.status === "Scheduled") {
          setNotFound(true);
          return;
        }
        setArticle(found);
        setRelated(
          published.filter((a) => a.id !== found.id).slice(0, 3),
        );
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-mda-cream min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <div className="bg-mda-cream min-h-screen">
      <SEO
        title={`${article.title} | Mepe Development Association`}
        description={article.summary || article.title}
      />

      {/* Hero */}
      {article.image ? (
        <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end">
          <img
            src={article.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-mda-maroon via-mda-maroon/70 to-mda-maroon/30" />
          <div className="relative z-10 w-full max-w-4xl mx-auto px-4 md:px-8 pb-12 md:pb-16 pt-32">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              All articles
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-white/70">
              <span className="flex items-center gap-2">
                <Calendar size={12} className="text-mda-pink" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={12} className="text-mda-pink" />
                {article.category}
              </span>
              {article.author && (
                <span className="flex items-center gap-2">
                  <User size={12} className="text-mda-pink" />
                  {article.author}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </section>
      ) : (
        <section className="relative pt-32 pb-12 md:pb-16 bg-mda-maroon overflow-hidden">
          <div className="absolute inset-0 bg-mda-pink/5 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-[10px] font-bold uppercase tracking-widest mb-8 transition-colors"
            >
              <ArrowLeft size={14} />
              All articles
            </Link>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-white/70">
              <span className="flex items-center gap-2">
                <Calendar size={12} className="text-mda-pink" />
                {article.date}
              </span>
              <span className="flex items-center gap-2">
                <Tag size={12} className="text-mda-pink" />
                {article.category}
              </span>
              {article.author && (
                <span className="flex items-center gap-2">
                  <User size={12} className="text-mda-pink" />
                  {article.author}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </section>
      )}

      {/* Body */}
      <article className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {article.summary && (
            <p className="font-body text-xl md:text-2xl text-mda-maroon/70 leading-relaxed mb-12 pb-12 border-b border-mda-maroon/10 italic">
              {article.summary}
            </p>
          )}
          <ArticleContent
            content={article.content}
            className="text-base md:text-lg"
          />
          <div className="mt-16 pt-8 border-t border-mda-maroon/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-mda-maroon flex items-center justify-center shrink-0">
                <Newspaper size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40">
                  Published by
                </p>
                <p className="text-sm font-bold text-mda-maroon">
                  Mepe Development Association
                </p>
              </div>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center justify-center gap-2 bg-mda-maroon text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-mda-pink hover:text-mda-maroon transition-colors"
            >
              <ArrowLeft size={14} />
              Back to articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white border-t border-mda-maroon/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display text-mda-maroon uppercase mb-10">
              More <span className="text-mda-pink">to read</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={articlePath(item)}
                  className="group block rounded-2xl overflow-hidden border border-mda-maroon/5 hover:shadow-lg transition-all"
                >
                  {item.image ? (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-mda-cream flex items-center justify-center">
                      <Newspaper size={32} className="text-mda-maroon/15" />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-mda-pink mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-display text-mda-maroon leading-tight group-hover:text-mda-pink transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-mda-maroon/50 group-hover:text-mda-maroon transition-colors">
                      Read
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ArticleDetailPage;

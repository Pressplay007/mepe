import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Newspaper, User } from "lucide-react";
import SEO from "../../components/common/SEO";
import { type Article } from "../../data/articles";
import { listArticles } from "../../services/articles";
import { articlePath } from "../../lib/slug";

const CategoryBadge = ({ category }: { category: string }) => (
  <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-mda-pink/10 text-mda-pink rounded-full">
    {category}
  </span>
);

const ArticleCard = ({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) => {
  if (featured) {
    return (
      <Link
        to={articlePath(article)}
        className="group grid lg:grid-cols-2 gap-0 rounded-[2rem] overflow-hidden bg-mda-maroon shadow-2xl shadow-mda-maroon/20 mb-16 md:mb-20 animate-reveal"
      >
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-2 lg:order-1">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-white/10 text-mda-pink rounded-full">
              Featured
            </span>
            <CategoryBadge category={article.category} />
          </div>
          <p className="text-mda-pink/80 font-display text-lg uppercase tracking-widest mb-4">
            {article.date}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-white leading-tight mb-6 group-hover:text-mda-pink transition-colors">
            {article.title}
          </h2>
          <p className="font-body text-white/60 text-base md:text-lg leading-relaxed line-clamp-3 mb-8">
            {article.summary}
          </p>
          {article.author && (
            <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 mb-8">
              <User size={12} />
              {article.author}
            </p>
          )}
          <span className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
            Read full story
            <ArrowRight size={16} className="text-mda-pink" />
          </span>
        </div>
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] order-1 lg:order-2 overflow-hidden">
          {article.image ? (
            <img
              src={article.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-mda-pink/10 flex items-center justify-center">
              <Newspaper size={64} className="text-white/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-mda-maroon/40 via-transparent to-transparent lg:bg-gradient-to-l lg:from-mda-maroon/60 lg:via-transparent lg:to-transparent" />
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={articlePath(article)}
      className="group flex flex-col rounded-[1.5rem] overflow-hidden bg-white border border-mda-maroon/5 shadow-sm hover:shadow-xl hover:shadow-mda-maroon/5 transition-all duration-500 animate-reveal h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mda-cream">
        {article.image ? (
          <img
            src={article.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-mda-maroon/5">
            <Newspaper size={40} className="text-mda-maroon/15" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <CategoryBadge category={article.category} />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 mb-3">
          {article.date}
        </p>
        <h3 className="text-2xl md:text-3xl font-display text-mda-maroon leading-tight mb-4 group-hover:text-mda-pink transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="font-body text-mda-maroon/60 text-sm md:text-base leading-relaxed line-clamp-3 flex-1">
          {article.summary || "Read the full article for more."}
        </p>
        {article.author && (
          <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-mda-maroon/30">
            By {article.author}
          </p>
        )}
        <div className="mt-6 pt-6 border-t border-mda-maroon/5 flex items-center gap-2 text-mda-maroon font-bold uppercase tracking-widest text-[10px] group-hover:text-mda-pink transition-colors">
          Read article
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listArticles()
      .then((data) => {
        const published = data.filter(
          (a) => !a.status || a.status === "Published",
        );
        setArticles(published);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = articles;

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

      {/* Articles */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
            </div>
          ) : articles.length > 0 ? (
            <>
              {featured && <ArticleCard article={featured} featured />}

              {rest.length > 0 && (
                <>
                  <div className="flex items-end justify-between gap-4 mb-10">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-display text-mda-maroon uppercase">
                        More <span className="text-mda-pink">Stories</span>
                      </h2>
                      <div className="h-1 w-16 bg-mda-pink mt-3" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 hidden sm:block">
                      {articles.length} article{articles.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rest.map((article, index) => (
                      <div
                        key={article.id}
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        <ArticleCard article={article} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="bg-white rounded-[2rem] border border-mda-maroon/5 p-12 md:p-24 text-center shadow-sm">
              <div className="w-20 h-20 rounded-3xl bg-mda-cream flex items-center justify-center mx-auto mb-8">
                <Newspaper size={36} className="text-mda-maroon/20" />
              </div>
              <h3 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase mb-4">
                No articles yet
              </h3>
              <p className="font-body text-mda-maroon/50 max-w-md mx-auto mb-8">
                Published articles will appear here once they are posted by the
                MDA team.
              </p>
              <Link
                to="/announcements"
                className="inline-flex items-center gap-2 text-mda-pink font-bold uppercase tracking-widest text-xs hover:text-mda-maroon transition-colors"
              >
                View official announcements
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ArticlesPage;

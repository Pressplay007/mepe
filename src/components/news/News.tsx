import { useEffect, useState } from "react";
import type { Announcement } from "../../data/announcements";
import { listAnnouncements } from "../../services/announcements";

const News = () => {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listAnnouncements()
      .then((data) => {
        const published = data.filter(
          (a) => !a.status || a.status === "Published",
        );
        setItems(published);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-10 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-block px-4 py-1.5 bg-mda-maroon/5 border border-mda-maroon/10 rounded-full mb-4">
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-mda-maroon uppercase">
                Latest Updates
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-mda-maroon leading-none">
              NEWS & ARTICLES
            </h2>
          </div>
          <div className="w-24 h-1 bg-mda-pink hidden md:block" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 gap-12">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-mda-cream/30 rounded-[2.5rem] p-8 md:p-16 border border-mda-maroon/5 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="max-w-4xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-mda-maroon text-mda-cream px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                      {item.date}
                    </span>
                    <div className="h-px w-12 bg-mda-maroon/20" />
                  </div>

                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-display text-mda-maroon mb-8 leading-tight">
                    {item.title}
                  </h3>

                  <div className="space-y-6">
                    <p className="font-body text-mda-dark/80 text-lg md:text-xl leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <div className="mt-12 flex items-center gap-4">
                    <div className="w-12 h-1 bg-mda-pink" />
                    <span className="font-display text-mda-maroon text-xl uppercase tracking-widest">
                      Official Press Release
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-mda-cream/30 rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 text-center border border-mda-maroon/5 shadow-sm">
            <h3 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase mb-4 italic">
              No news available
            </h3>
            <p className="font-body text-mda-dark/40 tracking-widest uppercase text-[10px] md:text-xs font-bold">
              Please check back later for the latest updates from the Mepe
              Development Association.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;

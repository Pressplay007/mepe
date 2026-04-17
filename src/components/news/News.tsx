interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string[];
}

const News = () => {
  const newsItems: NewsItem[] = [
    {
      id: "mda-chairman-election-2026",
      title: "Mr Bismarck Fiifi Tetteh elected as Mepe Development Association’s (MDA) Chairman",
      date: "April 2026",
      content: [
        "At the 2026 Easter Congress, the need came for a new Chairman to be elected after the old leaderships time in office elapsed.",
        "Mamaga Adzo Sreku IV suggested Mr. Bismarck Fiifi Tetteh and she was backed by Torgbe Kwasi Adzima’s advisor, Mr Raymond Amesi Zafor.",
        "Mr. Amadzi also suggested Mr. Prosper Sevor and he was backed by Mr. Gabriel Kwakutse Amegla.",
        "Mr. Prosper Sevor declared his unwillingness to contest in the election but rather threw his support to Mr. Bismarck Fiifi Tetteh.",
        "Mr. Bismarck Fiifi Tetteh then went unopposed and won by more than 3/4 of the entire population present.",
        "He was declared the new Chairman elect by Mepe Traditional Council’s secretary, Mr. James Krakani.",
      ],
    },
  ];

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
        {newsItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-12">
            {newsItems.map((item) => (
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
                    {item.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="font-body text-mda-dark/80 text-lg md:text-xl leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
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
              No news highlights at this time
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


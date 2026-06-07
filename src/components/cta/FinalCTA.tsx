const FinalCTA = () => {
  return (
    <section className="py-16 md:py-24 bg-mda-cream relative overflow-hidden">
      {/* Dynamic background accents */}
      <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-mda-maroon/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl md:blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-mda-pink/10 rounded-full translate-x-1/4 translate-y-1/4 blur-2xl md:blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          <h2 className="text-4xl md:text-7xl lg:text-9xl font-display text-mda-maroon leading-[0.9] lg:leading-[0.85] er">
            JOIN US IN <br />
            <span className="text-mda-pink italic font-serif normal-case text-2xl md:text-5xl lg:text-7xl">
              Building Mepe Together
            </span>
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl font-body text-mda-dark/70  max-w-2xl mx-auto px-4 md:px-0">
            Whether you are a citizen, a visitor, or a partner, your
            contribution shapes the future of our historic community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-6 md:pt-8 px-4 md:px-0">
            <button className="w-full sm:w-auto bg-mda-maroon text-white px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl uppercase tracking-wider hover:opacity-90 transform hover:-translate-y-1 transition-all shadow-xl shadow-mda-maroon/20">
              Donate Now
            </button>
            <button className="w-full sm:w-auto bg-white text-mda-maroon border-2 border-mda-maroon px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl uppercase tracking-wider hover:bg-mda-maroon hover:text-white transition-all">
              Visit Mepe
            </button>
            <button className="w-full sm:w-auto bg-mda-yellow text-mda-maroon px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold text-lg md:text-xl uppercase tracking-wider hover:opacity-90 transform hover:-translate-y-1 transition-all shadow-xl shadow-mda-yellow/20">
              Join MDA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

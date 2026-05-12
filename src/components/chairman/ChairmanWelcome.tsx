import Chairman from "../../assets/team/bismark.jpg";

const ChairmanWelcome = () => {
  return (
    <section className="py-16 md:py-32 bg-mda-cream relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-mda-maroon/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-mda-pink/5 rounded-full blur-[60px] md:blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Chairman Image Layer */}
          <div className="relative group max-w-lg mx-auto lg:max-w-none">
            <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass-card p-3 md:p-4 relative z-10 scale-95 group-hover:scale-100 transition-all duration-700">
              <div className="w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
                <img
                  src="/chairman.jpeg"
                  alt="Chairman of MDA"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Animated Decorative elements - hidden on small mobile to prevent overflow */}
            <div className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 w-full h-full border-[8px] md:border-[12px] border-mda-maroon/5 rounded-[2.5rem] md:rounded-[4rem] -z-0 animate-float hidden sm:block" />
            <div className="absolute -top-8 md:-top-12 -left-8 md:-left-12 w-32 md:w-48 h-32 md:h-48 bg-mda-pink/10 rounded-full blur-2xl md:blur-3xl animate-pulse-glow" />

            {/* Signature Floating Widget */}
            <div className="absolute -bottom-2 md:-bottom-4 right-4 md:right-10 glass-card p-4 md:p-6 px-6 md:px-8 rounded-xl md:rounded-2xl z-20 shadow-2xl animate-float delay-1000">
              <div className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-mda-maroon uppercase mb-1">
                Official Welcome
              </div>
              <div className="w-8 md:w-12 h-0.5 bg-mda-pink" />
            </div>
          </div>

          {/* Message Content */}
          <div className="flex flex-col gap-8 md:gap-10">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-mda-maroon/10">
                <span className="w-2 h-2 bg-mda-pink rounded-full animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-mda-maroon uppercase">
                  Message from the Chairman
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-8xl font-display text-mda-maroon leading-[0.9] lg:leading-[0.8] uppercase tracking-tighter">
                LEADERSHIP & <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Visionary Growth
                </span>
              </h2>
            </div>

            <div className="space-y-4 md:space-y-6 text-mda-dark/70 text-base md:text-lg leading-relaxed font-body border-l-2 border-mda-pink/20 pl-6 md:pl-10 py-2">
              <p className="font-semibold text-mda-maroon text-xl md:text-2xl italic tracking-tight">
                "It is with great honor and pride that I welcome you to our
                active community."
              </p>
              <p>
                As Chairman of the Mepe Development Association, my vision is to
                foster a community driven by innovation, tradition, and
                collective growth. Mepe is not just a geographical location; it
                is a living testament to resilience.
              </p>
              <p>
                We invite you to explore our progress, engage with our rich
                heritage, and join us in this journey towards a prosperous
                future for every citizen.
              </p>
            </div>

            <div className="flex items-center gap-4 md:gap-6 pt-4">
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-full overflow-hidden border-2 border-mda-pink shadow-lg">
                <img
                  src={Chairman}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl md:text-3xl text-mda-maroon tracking-tight">
                  Mr. Bismark Fiifi Tetteh
                </span>
                <span className="text-mda-pink font-bold tracking-[0.2em] uppercase text-[8px] md:text-[10px]">
                  Chairman, Mepe Development Association
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChairmanWelcome;

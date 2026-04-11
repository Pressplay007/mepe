import { ArrowRight, Target } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] bg-mda-maroon overflow-hidden flex items-center">
      {/* Background Layer with Mesh Gradient & Grain */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('/hero.jpeg')] bg-center bg-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-mda-maroon via-mda-maroon/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-mda-maroon to-transparent" />

        {/* Static Glows (High Performance) */}
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-mda-pink/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-mda-pink/5 rounded-full blur-[60px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        {/* Text Content */}
        <div className="space-y-8 md:space-y-12 animate-reveal py-10 lg:py-0">
          <div className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mda-pink opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mda-pink"></span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/80">
                Official Portal
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-display leading-[0.9] lg:leading-[0.8] uppercase text-white tracking-tighter">
              VISIT <br />
              <span className="text-mda-pink italic font-serif normal-case drop-shadow-2xl text-glow">
                Mepe
              </span>
            </h1>

            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed max-w-xl border-l-2 border-mda-pink/30 pl-6 md:pl-8">
              Experience the soul of the Volta. A community of resilient people,
              rich heritage, and boundless future potential.
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            <button className="premium-gradient text-white px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-bold tracking-widest text-[10px] md:text-xs uppercase hover:shadow-2xl transform hover:-translate-y-1 active:scale-95 transition-all border border-white/10 group">
              Explore Heritage
              <ArrowRight
                className="inline ml-2 md:ml-3 group-hover:translate-x-2 transition-transform"
                size={16}
              />
            </button>
          </div>
        </div>

        {/* Interactive Image Area */}
        <div className="relative hidden lg:block h-[500px]">
          {/* Only float the main container for better performance */}
          <div className="absolute inset-0 animate-float">
            <div className="w-full h-full glass-card rounded-[4rem] p-4 rotate-3 transform-gpu">
              <div className="w-full h-full rounded-[3.5rem] overflow-hidden">
                <img
                  src="/hero.jpeg"
                  className="w-full h-full object-cover opacity-90"
                  alt="Mepe"
                />
              </div>
            </div>
          </div>

          {/* Floating Stats Widgets (Static for smoother scrolling) */}
          <div className="absolute -top-10 -right-10 glass-card p-8 rounded-3xl w-48 text-center border-white/20">
            <div className="text-4xl font-display text-mda-pink mb-1">100+</div>
            <div className="text-[8px] font-bold text-mda-maroon uppercase tracking-widest">
              Cultural Sites
            </div>
          </div>

          <div className="absolute top-1/2 -left-20 glass-card p-10 rounded-[2.5rem] w-64 border-white/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-mda-maroon rounded-2xl flex items-center justify-center text-white">
                <Target size={24} />
              </div>
              <div>
                <div className="text-xl font-display text-mda-maroon leading-tight">
                  ACTIVE
                  <br />
                  PROJECTS
                </div>
                <div className="w-10 h-1 bg-mda-pink mt-2" />
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 right-10 glass-card p-8 rounded-3xl border-white/20">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-mda-cream overflow-hidden"
                  >
                    <img
                      src={`/456184220_18061206241720953_5588583274442341449_n.jpg`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-bold text-mda-maroon/60 uppercase tracking-widest">
                +100 Volunteers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

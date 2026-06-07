import {
  Map,
  Umbrella,
  Coffee,
  ArrowRight,
  Landmark,
  Store,
} from "lucide-react";

import SEO from "../../components/common/SEO";

const VisitMepePage = () => {
  return (
    <>
      <SEO
        title="Visit Mepe | Tourism & Travel Guide"
        description="Experience the beauty and hospitality of Mepe. Plan your visit to discover historical landmarks, cultural sites, and the serene landscape of the Mepe Traditional Area."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-40 bg-mda-maroon text-white min-h-[70vh] md:h-[85vh] flex items-center overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-8 md:space-y-12 text-center md:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                <Map size={16} className="text-mda-pink" />
                Traveler's Protocol
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-display leading-[0.9] md:leading-[0.8] mb-6 md:mb-8 uppercase er">
                VISIT <br />{" "}
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Mepe
                </span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl border-l md:border-l border-mda-pink/30 pl-6 md:pl-10 mx-auto md:mx-0">
                Where the tranquility of the Volta meets the vibrant pulse of
                indigenous life. Experience the heart of Ghana.
              </p>
            </div>
          </div>

          {/* Immersive Backdrop */}
          <div className="absolute inset-0 z-0">
            <img
              src="/455991774_18061206271720953_6194218305811081143_n.jpg"
              className="w-full h-full object-cover scale-110 opacity-60 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-mda-maroon via-mda-maroon/90 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-32 md:h-48 bg-gradient-to-t from-mda-maroon to-transparent" />
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 md:py-40 bg-white relative overflow-hidden text-center">
          <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 space-y-8 md:space-y-12">
            <div className="w-16 md:w-20 h-1 bg-mda-maroon mx-auto opacity-20" />
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-display text-mda-maroon uppercase er leading-tight">
              THE GATEWAY TO <br /> THE VOLTA
            </h2>
            <p className="font-body text-xl md:text-2xl text-mda-dark/40 leading-relaxed max-w-2xl mx-auto border-t border-mda-maroon/5 pt-8 md:pt-12">
              Mepe is a sanctuary of heritage. From traditional leadership to
              pristine landscapes, we invite you to witness a community bound by
              unity and progress.
            </p>
          </div>
        </section>

        {/* Cultural Attractions */}
        <section className="py-20 md:py-40 bg-mda-cream overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="space-y-8 md:space-y-12 text-center lg:text-left">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-mda-maroon/5 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-maroon">
                  Authentic Experiences
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-9xl font-display text-mda-maroon leading-[0.9] md:leading-[0.8] er uppercase whitespace-pre-line">
                  CULTURAL <br />
                  <span className="text-mda-pink italic font-serif normal-case text-glow">
                    Attractions
                  </span>
                </h2>
              </div>
              <p className="font-body text-lg md:text-xl text-mda-dark/50 leading-relaxed max-w-md border-l border-mda-pink/30 pl-6 md:pl-8 mx-auto lg:mx-0 text-left">
                Step into a world where every ritual is a story and every
                performance a bridge to the past.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 text-left">
                {[
                  "Royal Durbars",
                  "Sacred Rites",
                  "Indigenous Crafts",
                  "Ancestral Lore",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl border-mda-maroon/5 flex items-center gap-4 group hover:bg-white transition-all duration-700"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-mda-pink group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] md:text-xs font-bold text-mda-maroon uppercase tracking-wider">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group max-w-lg mx-auto lg:max-w-none">
              <div className="aspect-square glass-card p-3 md:p-4 rounded-[2rem] md:rounded-[4rem] group-hover:rotate-3 transition-all duration-1000 overflow-hidden shadow-2xl">
                <img
                  src={
                    new URL(
                      "../../assets/gallery/456130250_18061206187720953_8453159004960842026_n.jpg",
                      import.meta.url,
                    ).href
                  }
                  className="w-full h-full rounded-[1.8rem] md:rounded-[3.5rem] object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  alt="Culture"
                />
              </div>
              {/* Float Element */}
              <div className="absolute -bottom-8 md:-bottom-10 -left-8 md:-left-10 w-24 md:w-40 h-24 md:h-40 bg-mda-pink/10 rounded-full blur-xl md:blur-2xl animate-pulse-glow" />
            </div>
          </div>
        </section>

        {/* Landscape Grid Section */}
        <section className="py-20 md:py-40 bg-mda-maroon text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 md:gap-8 relative">
              <div className="aspect-[4/6] glass-card p-2 md:p-3 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden mt-8 md:mt-16 group">
                <img
                  src={
                    new URL(
                      "../../assets/gallery/456328911_18061206232720953_4587617597907394016_n.jpg",
                      import.meta.url,
                    ).href
                  }
                  className="w-full h-full rounded-[1rem] md:rounded-[2.5rem] object-cover transition-all duration-1000"
                  alt="Mepe Landscape"
                />
              </div>
              <div className="aspect-[4/6] glass-card p-2 md:p-3 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden group">
                <img
                  src={
                    new URL(
                      "../../assets/gallery/456132438_18061206193720953_3368855995947669246_n.jpg",
                      import.meta.url,
                    ).href
                  }
                  className="w-full h-full rounded-[1rem] md:rounded-[2.5rem] object-cover transition-all duration-1000"
                  alt="Traditional Setting"
                />
              </div>
              {/* Background Mesh */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-mda-pink/10 rounded-full blur-[60px] md:blur-[80px]" />
            </div>

            <div className="order-1 lg:order-2 space-y-8 md:space-y-12 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-white/10 text-mda-pink">
                <Landmark size={18} />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em]">
                  Sacred Topography
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-display leading-[0.9] md:leading-[0.8] er uppercase">
                SOUL OF THE <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Volta
                </span>
              </h2>
              <p className="font-body text-lg md:text-xl text-white/40 leading-relaxed border-l border-mda-pink/20 pl-6 md:pl-8 mx-auto lg:mx-0 text-left">
                A landscape woven with history. Experience the tranquil waters
                and the ancestral lands that have nurtured our people for
                centuries.
              </p>
              <button className="premium-gradient text-white px-10 md:px-12 py-5 md:py-6 rounded-xl md:rounded-2xl font-bold tracking-widest text-[10px] md:text-xs uppercase hover:shadow-2xl transition-all border border-white/10 group flex items-center gap-4 mx-auto lg:mx-0">
                Access Guide
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </div>
        </section>

        {/* Markets and Crafts */}
        <section className="py-20 md:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
            <div className="space-y-8 md:space-y-12 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-mda-maroon/5 text-mda-pink">
                <Store size={18} />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em]">
                  Local Commerce
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display text-mda-maroon leading-[0.9] md:leading-[0.8] er uppercase">
                ARTISAN <br />
                <span className="text-mda-pink italic font-serif normal-case">
                  Markets
                </span>
              </h2>
              <p className="font-body text-lg md:text-xl text-mda-dark/40 leading-relaxed max-w-md mx-auto lg:mx-0">
                Discover handmade treasures and indigenous delicacies in the
                bustling artisan centers of Mepe.
              </p>
            </div>
            <div className="aspect-video glass-card p-3 md:p-4 rounded-[2rem] md:rounded-[4rem] overflow-hidden group shadow-2xl max-w-2xl mx-auto lg:max-w-none">
              <div className="w-full h-full rounded-[1.5rem] md:rounded-[3.5rem] overflow-hidden">
                <img
                  src={
                    new URL(
                      "../../assets/gallery/Makola-Market-Accra.jpg",
                      import.meta.url,
                    ).href
                  }
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  alt="Market"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Visitor Essentials */}
        <section className="py-20 md:py-40 bg-mda-cream border-y border-mda-maroon/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-12 md:space-y-24">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-display text-mda-maroon uppercase er leading-tight">
                VISITOR <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Protocol
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: Map,
                  title: "North Tongu",
                  text: "Mepe is strategically located within the North Tongu District of Ghana's Volta Region.",
                },
                {
                  icon: Umbrella,
                  title: "Logistics",
                  text: "Well-connected and accessible via regional transport arteries.",
                },
                {
                  icon: Coffee,
                  title: "Hospitality",
                  text: "Premium visitor protocols and guest services are currently under strategic expansion.",
                },
              ].map((tip, i) => (
                <div
                  key={i}
                  className="p-8 md:p-12 glass-card rounded-[2rem] md:rounded-[3.5rem] border-mda-maroon/5 space-y-8 md:space-y-10 group hover:bg-white transition-all duration-700 hover:shadow-2xl"
                >
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-mda-maroon rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                    <tip.icon className="w-8 md:w-9 h-8 md:h-9 text-mda-pink" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-display text-mda-maroon uppercase er">
                      {tip.title}
                    </h3>
                    <p className="font-body text-base md:text-lg text-mda-dark/40 leading-relaxed group-hover:text-mda-dark/60 transition-colors">
                      {tip.text}
                    </p>
                  </div>
                  <button className="flex items-center justify-center gap-3 w-full py-4 rounded-xl md:rounded-2xl bg-mda-maroon/5 text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-mda-maroon group-hover:bg-mda-pink group-hover:text-white transition-all">
                    Read Data
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VisitMepePage;

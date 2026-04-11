import { Landmark, Compass, History } from "lucide-react";

import SEO from "../../components/common/SEO";

const CulturePage = () => {
  return (
    <>
      <SEO
        title="Culture & Heritage | Mepe Development Association"
        description="Discover the rich cultural heritage, traditions, and festivals of the Mepe people. From the Afenorto festival to our sacred customs."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-center">
          {/* Animated Mesh Glows */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-mda-pink/10 rounded-full blur-[100px] md:blur-[140px] pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-mda-pink/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none animate-pulse-glow" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-6 md:space-y-8 text-center lg:text-left mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                A Legacy Undefeated
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-display leading-[0.9] lg:leading-[0.8] mb-6 md:mb-8 uppercase text-white tracking-tighter">
                SACRED <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Heritage
                </span>
              </h1>
              <p className="font-body text-lg md:text-2xl text-white/50 leading-relaxed max-w-2xl border-l border-mda-pink/30 pl-6 md:pl-8 mx-auto lg:mx-0">
                Mepe is more than a location—it is a living, breathing chronicle
                of indigenous wisdom and traditional excellence.
              </p>
            </div>
          </div>

          {/* Backdrop Image Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1974&auto=format&fit=crop"
              className="w-full h-full bg-center bg-cover scale-110 opacity-20"
            />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-mda-maroon via-mda-maroon/80 to-transparent" />
          </div>
        </section>

        {/* The Five Clans */}
        <section className="relative py-20 md:py-40 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24 items-start">
              <div className="space-y-8 md:space-y-10 lg:sticky lg:top-32 text-center lg:text-left">
                <div className="space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-mda-maroon/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-maroon">
                    Indigenous Core
                  </div>
                  <h2 className="text-5xl md:text-7xl font-display text-mda-maroon leading-[0.9] lg:leading-[0.8] uppercase tracking-tighter">
                    THE FIVE <br />
                    <span className="text-mda-pink italic font-serif normal-case text-glow">
                      Pillars
                    </span>
                  </h2>
                </div>
                <p className="font-body text-lg md:text-xl text-mda-dark/50 leading-relaxed max-w-sm mx-auto lg:mx-0">
                  The foundation of Mepe unity is built upon five sacred
                  lineages, each with its own distinct stool and historical
                  mandate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[
                  {
                    name: "Gbanvie",
                    desc: "A core pillar of the Mepe traditional state.",
                  },
                  {
                    name: "Dzagbaku",
                    desc: "Key traditional authority and landowners.",
                  },
                  {
                    name: "Akorvie",
                    desc: "Founding lineage and historical protectors.",
                  },
                  {
                    name: "Sevie",
                    desc: "Essential clan in the traditional hierarchy.",
                  },
                  {
                    name: "Dzoxornu",
                    desc: "Protectors of cultural rites and ancestral heritage.",
                  },
                ].map((clan, i) => (
                  <div
                    key={i}
                    className="glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border-mda-maroon/5 group hover:border-mda-pink hover:-translate-y-2 transition-all duration-700 h-auto min-h-[220px] md:h-[280px] flex flex-col justify-between"
                  >
                    <div className="text-mda-pink font-display text-3xl md:text-4xl mb-4 group-hover:scale-110 transition-transform origin-left">
                      0{i + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-4xl font-display text-mda-maroon mb-3 md:mb-4 uppercase tracking-tighter">
                        {clan.name}
                      </h3>
                      <p className="text-sm md:text-base font-body text-mda-dark/40 group-hover:text-mda-dark/80 transition-colors">
                        {clan.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Afenorto Festival */}
        <section className="py-20 md:py-40 bg-mda-maroon text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-mda-pink/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
              <div className="relative group order-2 lg:order-1 transition-all duration-1000 max-w-lg mx-auto lg:max-w-none">
                <div className="aspect-square glass-card p-3 md:p-4 rounded-[2.2rem] md:rounded-[4rem] group-hover:-rotate-2 transition-transform duration-700">
                  <div className="w-full h-full rounded-[1.8rem] md:rounded-[3.5rem] overflow-hidden">
                    <img
                      src={new URL("../../assets/gallery/455800117_18061206196720953_4456184814691688723_n.jpg", import.meta.url).href}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                      alt="Traditional Festival"
                    />
                  </div>
                </div>
                {/* Decorative floating widget */}
                <div className="absolute -top-6 md:-top-10 -left-6 md:-left-10 glass-card p-4 md:p-8 rounded-2xl md:rounded-3xl animate-float border-white/20">
                  <div className="text-2xl md:text-3xl font-display text-mda-pink">
                    AUGUST
                  </div>
                  <div className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                    Annual Rite
                  </div>
                </div>
              </div>

              <div className="space-y-8 md:space-y-12 order-1 lg:order-2 text-center lg:text-left">
                <div className="space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                    Homecoming
                  </div>
                  <h2 className="text-5xl md:text-7xl lg:text-9xl font-display leading-[0.9] lg:leading-[0.8] tracking-tighter uppercase">
                    AFENORTO <br />
                    <span className="text-mda-pink italic font-serif normal-case text-glow">
                      Festival
                    </span>
                  </h2>
                </div>
                <p className="font-body text-lg md:text-2xl text-white/50 leading-relaxed border-l border-mda-pink/20 pl-6 md:pl-10 mx-auto lg:mx-0 max-w-2xl lg:max-w-none">
                  A grand celebration of reunion, reconciliation, and the
                  collective advancement of our people.
                </p>
                <div className="grid grid-cols-2 gap-6 md:gap-12 pt-4">
                  <div className="space-y-2 md:space-y-4">
                    <h4 className="text-white font-display text-xl md:text-2xl uppercase tracking-widest border-b border-white/10 pb-2 md:pb-4">
                      Duration
                    </h4>
                    <p className="text-base md:text-lg text-white/40">
                      Two weeks of cultural activities and royal durbars.
                    </p>
                  </div>
                  <div className="space-y-2 md:space-y-4">
                    <h4 className="text-white font-display text-xl md:text-2xl uppercase tracking-widest border-b border-white/10 pb-2 md:pb-4">
                      Significance
                    </h4>
                    <p className="text-base md:text-lg text-white/40">
                      Ancestral veneration and development planning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Traditional Attire & Foods */}
        <section className="py-20 md:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32">
            <div className="space-y-8 md:space-y-12 animate-reveal">
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <h2 className="text-5xl md:text-7xl font-display text-mda-maroon uppercase tracking-tighter">
                  INDIGENOUS <br />
                  <span className="text-mda-pink italic font-serif normal-case">
                    Attire
                  </span>
                </h2>
                <p className="font-body text-lg md:text-xl text-mda-dark/50 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Our hand-woven Kente and specialized ancestral wraps carry
                  patterns that chronicle lineage and status.
                </p>
              </div>
              <div className="aspect-[16/10] glass-card p-2 md:p-3 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden group">
                <div className="w-full h-full rounded-[1.5rem] md:rounded-[3rem] overflow-hidden">
                  <img
                    src={new URL("../../assets/gallery/Kente-Cloth-Ghanas-Cultural-Gold-Mine_010925-1-scaled.jpg", import.meta.url).href}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    alt="Traditional Weaving"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8 md:space-y-12 lg:pt-32 animate-reveal delay-300">
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <h2 className="text-5xl md:text-7xl font-display text-mda-maroon uppercase tracking-tighter">
                  RIVER <br />
                  <span className="text-mda-pink italic font-serif normal-case">
                    Cuisine
                  </span>
                </h2>
                <p className="font-body text-lg md:text-xl text-mda-dark/50 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Celebrating the clams of the Volta and traditional corn-based
                  delicacies.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:gap-6 pb-6 md:pb-12">
                {[
                  {
                    src: new URL("../../assets/gallery/images_Banku_And_Okro_Soup_277506581.jpg", import.meta.url).href,
                    alt: "Banku",
                  },
                  { src: new URL("../../assets/gallery/51030396.jpg", import.meta.url).href, alt: "Traditional Meal" },
                ].map((img, i) => (
                  <div
                    key={i}
                    className="aspect-square glass-card p-1.5 md:p-2 rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden group"
                  >
                    <div className="w-full h-full rounded-[1.5rem] md:rounded-[2.2rem] overflow-hidden">
                      <img
                        src={img.src}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        alt={img.alt}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Heritage Sites */}
        <section className="py-20 md:py-40 bg-mda-cream relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-12 md:space-y-24">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-5xl md:text-7xl lg:text-9xl font-display text-mda-maroon uppercase tracking-tighter">
                SACRED <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Landmarks
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: Landmark,
                  title: "Royal Palace",
                  text: "The institutional seat of authority for the Paramountcy.",
                },
                {
                  icon: Compass,
                  title: "Sacred Groves",
                  text: "Protected areas maintained for spiritual and historical rites.",
                },
                {
                  icon: History,
                  title: "Ancient Shrines",
                  text: "Landmarks that chronicle the spiritual defense of our people.",
                },
              ].map((site, i) => (
                <div
                  key={i}
                  className="p-8 md:p-12 glass-card rounded-[2.5rem] md:rounded-[3.5rem] border-mda-maroon/5 space-y-8 md:space-y-10 group hover:bg-white transition-all duration-700 hover:shadow-2xl"
                >
                  <div className="w-16 md:w-20 h-16 md:h-20 bg-mda-maroon rounded-[1.5rem] md:rounded-3xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                    <site.icon className="w-8 h-8 md:w-9 md:h-9 text-mda-pink" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-2xl md:text-3xl font-display text-mda-maroon uppercase tracking-tighter">
                      {site.title}
                    </h3>
                    <p className="font-body text-lg md:text-xl text-mda-dark/40 leading-relaxed group-hover:text-mda-dark/60 transition-colors">
                      {site.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CulturePage;

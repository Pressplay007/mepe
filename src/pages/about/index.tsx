import { Trophy, Users, Shield, ArrowRight } from "lucide-react";
import SEO from "../../components/common/SEO";
import FinalCTA from "../../components/cta/FinalCTA";
import Team from "../../components/team";

const AboutPage = () => {
  return (
    <>
      <SEO
        title="About Us | Mepe Development Association"
        description="Learn about the history, vision, and leadership of the Mepe Development Association. We are committed to fostering progress and unity in Mepe."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-center">
          {/* Background Mesh Glows */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-mda-maroon to-transparent" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 animate-reveal">
            <div className="max-w-4xl space-y-6 md:space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                Our Identity
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-display leading-[0.9] lg:leading-[0.8] mb-6 md:mb-8 uppercase text-white er">
                BEYOND <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Development
                </span>
              </h1>
              <p className="font-body text-lg md:text-2xl text-white/50 leading-relaxed max-w-2xl border-l border-mda-pink/30 pl-6 md:pl-8">
                The Mepe Development Association (MDA) stands as the visionary
                secular wing of the Mepe Traditional Area, dedicated to
                sustainable growth and cultural preservation.
              </p>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16 md:py-32 relative overflow-hidden text-center lg:text-left">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 md:gap-24 relative z-10">
            <div className="space-y-6 md:space-y-10 group">
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <div className="w-12 md:w-16 h-1 bg-mda-pink group-hover:w-24 transition-all duration-700" />
                <h2 className="text-3xl md:text-5xl font-display text-mda-maroon uppercase er">
                  OUR VISION
                </h2>
              </div>
              <p className="font-body text-lg md:text-xl text-mda-dark/60 leading-relaxed italic">
                "To transform Mepe into a model community in Ghana, where every
                citizen has access to world-class education, quality healthcare,
                and sustainable economic opportunities."
              </p>
            </div>
            <div className="space-y-6 md:space-y-10 group">
              <div className="flex items-center justify-center lg:justify-start gap-6">
                <div className="w-12 md:w-16 h-1 bg-mda-pink group-hover:w-24 transition-all duration-700" />
                <h2 className="text-3xl md:text-5xl font-display text-mda-maroon uppercase er">
                  OUR MISSION
                </h2>
              </div>
              <p className="font-body text-lg md:text-xl text-mda-dark/60 leading-relaxed">
                We mobilize high-level resources and coordinate community-driven
                initiatives to improve the lives of our people through
                transparency, accountability, and inclusive development.
              </p>
            </div>
          </div>
        </section>

        {/* Traditional Leadership Structure */}
        <section className="py-16 md:py-32 premium-gradient text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-mda-pink/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center mb-12 md:mb-24 space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
              Governance
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-display uppercase leading-[0.9] lg:leading-[0.8] er">
              TRADITIONAL <br />
              <span className="text-mda-pink italic font-serif normal-case text-glow">
                Leadership
              </span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {[
              {
                role: "Manfiaga",
                title: "Queen Mother",
                desc: "The custodian of women's affairs and advisor to the Paramount Chief.",
              },
              {
                role: "Togbe Worgbedzi",
                title: "Paramount Chief",
                desc: "The highest traditional authority and custodian of Mepe's heritage.",
              },
              {
                role: "Clan Heads",
                title: "Togbe / Mama",
                desc: "Leaders of the five clans responsible for local governance.",
              },
              {
                role: "The Council",
                title: "Elders",
                desc: "Wise representatives providing counsel on traditional matters.",
              },
            ].map((leader, i) => (
              <div
                key={i}
                className="glass-card p-8 md:p-10 rounded-[8px] md:rounded-[10px] border-white/5 group hover:border-white/20 transition-all duration-700 hover:-translate-y-2"
              >
                <div className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] text-mda-pink mb-6 md:mb-10 uppercase transition-colors">
                  {leader.role}
                </div>
                <h3 className="text-2xl md:text-3xl font-display mb-4 md:mb-6 leading-tight uppercase ">
                  {leader.title}
                </h3>
                <p className="font-body text-xs md:text-sm text-white/40 leading-relaxed group-hover:text-white/80 transition-all">
                  {leader.desc}
                </p>
                <div className="mt-8 w-8 h-[1px] bg-white/20 group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </section>

        {/* Executive Team Section */}
        <section className="bg-white">
          <Team />
        </section>

        {/* Core Pillars */}
        <section className="py-16 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 text-center lg:text-left">
              {[
                {
                  icon: Users,
                  title: "Unity",
                  text: "Bringing together all Mepe citizens, at home and abroad, under one agenda.",
                },
                {
                  icon: Shield,
                  title: "Heritage",
                  text: "Protecting and promoting the sacred traditions and historical values.",
                },
                {
                  icon: Trophy,
                  title: "Excellence",
                  text: "Striving for the highest standards in every project we undertake.",
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="space-y-6 md:space-y-8 group flex flex-col items-center lg:items-start"
                >
                  <div
                    className="w-20 md:w-24 h-20 md:h-24 glass-card rounded-[20px] md:rounded-[10px] flex items-center justify-center transition-all duration-700 group-hover:bg-mda-maroon animate-float"
                    style={{ animationDelay: `${i * 300}ms` }}
                  >
                    <pillar.icon className="w-8 md:w-10 h-8 md:h-10 text-mda-maroon transition-colors group-hover:text-mda-pink" />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase er">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-lg md:text-xl text-mda-dark/40 leading-relaxed max-w-sm">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-20 md:py-40 bg-mda-maroon text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[300px] md:w-96 h-[300px] md:h-96 bg-mda-pink/5 rounded-full blur-[80px] md:blur-[100px]" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 md:gap-32 items-center relative z-10">
            <div className="relative group transition-all duration-1000 max-w-lg mx-auto lg:max-w-none">
              <div className="aspect-[4/5] glass-card p-3 md:p-4 rounded-[2rem] md:rounded-[4rem] group-hover:rotate-2 transition-transform duration-700">
                <div className="w-full h-full rounded-[1.5rem] md:rounded-[3.5rem] overflow-hidden">
                  <img
                    src={
                      new URL(
                        "../../assets/gallery/455721395_18061206301720953_6554931698407349356_n.jpg",
                        import.meta.url,
                      ).href
                    }
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    alt="Community Meeting"
                  />
                </div>
              </div>
              {/* Decorative Float */}
              <div className="absolute -bottom-6 md:-bottom-10 -right-6 md:-right-10 w-32 md:w-48 h-32 md:h-48 bg-mda-pink/10 rounded-full blur-2xl animate-pulse-glow" />
            </div>

            <div className="space-y-8 md:space-y-12">
              <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-display leading-[0.9] lg:leading-[0.8] er uppercase whitespace-pre-line">
                HISTORY OF <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Service
                </span>
              </h2>
              <div className="space-y-6 md:space-y-8 font-body text-base md:text-lg text-white/50 leading-relaxed border-l border-mda-pink/20 pl-6 md:pl-10">
                <p>
                  Founded decades ago, the Mepe Development Association (MDA)
                  has evolved into a sophisticated organization that serves as
                  the secular development wing of the Traditional Area.
                </p>
                <p>
                  We work in close collaboration with the Mepe Traditional
                  Council to ensure development efforts align with cultural
                  values and respect our lineage.
                </p>
              </div>
              <button className="premium-gradient text-white px-8 py-4 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-bold tracking-widest text-[10px] md:text-xs uppercase hover:shadow-2xl transition-all border border-white/10 group flex items-center gap-3 md:gap-4 w-fit">
                Explore Lineage
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>
        <FinalCTA />
      </div>
    </>
  );
};

export default AboutPage;

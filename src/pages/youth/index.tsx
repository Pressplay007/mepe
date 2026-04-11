import {
  Target,
  Rocket,
  Laptop,
  Sparkles,
  Trophy,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

import SEO from "../../components/common/SEO";

const YouthPage = () => {
  return (
    <>
      <SEO
        title="Youth & Education | Mepe Development Association"
        description="Empowering the youth of Mepe through education, grants, and mentorship programs. Explore opportunities for growth and development."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-40 bg-mda-maroon overflow-hidden min-h-[60vh] flex items-center">
          {/* Animated Mesh Glows */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-mda-pink/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-mda-pink/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-12">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[10px] text-mda-pink">
                <Rocket size={16} className="text-mda-pink" />
                Youth Hub Protocol
              </div>
              <h1 className="text-8xl lg:text-[11rem] font-display leading-[0.8] mb-8 uppercase text-white tracking-tighter">
                BEYOND <br />{" "}
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Limits
                </span>
              </h1>
              <p className="font-body text-2xl text-white/50 leading-relaxed max-w-2xl border-l border-mda-pink/30 pl-10">
                Empowering the next generation of Mepe leaders through
                technology, strategic mentorship, and sustainable enterprise.
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-40 bg-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-8 relative z-10 text-center space-y-12">
            <div className="w-20 h-1 bg-mda-maroon mx-auto opacity-20" />
            <h2 className="text-5xl lg:text-7xl font-display text-mda-maroon uppercase tracking-tighter">
              THE FORCE OF <br /> PROGRESS
            </h2>
            <p className="font-body text-2xl text-mda-dark/40 leading-relaxed max-w-2xl mx-auto border-t border-mda-maroon/5 pt-12">
              Youth are the primary catalysts for Mepe's evolution. We are
              committed to equipping the youth with high-intelligence skills and
              visionary leadership capabilities.
            </p>
          </div>
          {/* Subtle Background Pattern */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#5D1A1A 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
        </section>

        {/* Skills Development */}
        <section className="py-40 bg-mda-cream overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-mda-maroon/5 uppercase font-bold tracking-[0.3em] text-[10px] text-mda-maroon">
                  Innovation Pipelines
                </div>
                <h2 className="text-7xl lg:text-9xl font-display text-mda-maroon leading-[0.8] tracking-tighter uppercase">
                  SKILLS <br />
                  <span className="text-mda-pink italic font-serif normal-case text-glow">
                    Forge
                  </span>
                </h2>
                <p className="font-body text-xl text-mda-dark/50 leading-relaxed max-w-md border-l border-mda-pink/30 pl-8">
                  Accelerating human capital through high-end technical training
                  and creative industry competencies.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                {[
                  { icon: Laptop, text: "ICT Systems" },
                  { icon: Sparkles, text: "Visual Design" },
                  { icon: Target, text: "Digital Growth" },
                  { icon: Rocket, text: "Agri-Tech" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="glass-card p-10 rounded-[3rem] border-mda-maroon/5 flex flex-col gap-8 group hover:bg-white transition-all duration-700 hover:shadow-2xl"
                  >
                    <div className="w-14 h-14 bg-mda-maroon rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                      <item.icon size={28} className="text-mda-pink" />
                    </div>
                    <span className="font-display text-2xl text-mda-maroon uppercase italic tracking-tighter">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] glass-card p-4 rounded-[4rem] group-hover:-rotate-2 transition-all duration-1000 overflow-hidden shadow-2xl">
                <img
                  src={new URL("../../assets/gallery/524445973_1341760967957245_7840297303174955587_n.jpg", import.meta.url).href}
                  className="w-full h-full rounded-[3.5rem] object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  alt="Training"
                />
              </div>
              {/* Float Element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-mda-pink/10 rounded-full blur-2xl animate-pulse-glow" />
            </div>
          </div>
        </section>

        {/* Entrepreneurship Programs */}
        <section className="py-40 bg-mda-maroon text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mda-pink/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="aspect-video glass-card p-4 rounded-[4rem] overflow-hidden group shadow-2xl">
              <div className="w-full h-full rounded-[3.5rem] overflow-hidden">
                <img
                  src={new URL("../../assets/gallery/505730882_1301467045319971_4163705806737903282_n.jpg", import.meta.url).href}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                  alt="Mentorship"
                />
              </div>
            </div>

            <div className="space-y-12">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-white/10 text-mda-pink">
                <Sparkles size={18} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                  Enterprise Engine
                </span>
              </div>
              <h2 className="text-7xl lg:text-9xl font-display leading-[0.8] tracking-tighter uppercase whitespace-pre-line">
                MASTERS OF <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Industry
                </span>
              </h2>
              <p className="font-body text-xl text-white/40 leading-relaxed border-l border-mda-pink/20 pl-8">
                Decentralizing entrepreneurship through high-stakes workshops,
                bespoke mentorship, and strategic project funding.
              </p>
              <div className="grid grid-cols-1 gap-6 pt-4">
                {[
                  "Strategic Business Workshops",
                  "Direct Alpha Mentorship",
                  "Capital Access Protocols",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 group cursor-pointer"
                  >
                    <div className="w-12 h-[1px] bg-mda-pink group-hover:w-20 transition-all duration-700" />
                    <span className="text-2xl font-display text-mda-pink/80 uppercase italic transition-all group-hover:text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sports & Leadership + Scholarships */}
        <section className="py-40 bg-mda-cream">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16">
            {/* Sports */}
            <div className="p-16 glass-card bg-white rounded-[4rem] border-mda-maroon/5 space-y-12 group hover:shadow-2xl transition-all duration-700 hover:-translate-y-2">
              <div className="w-20 h-20 bg-mda-maroon rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <Trophy size={32} className="text-mda-pink" />
              </div>
              <div className="space-y-6">
                <h3 className="text-5xl font-display text-mda-maroon uppercase italic tracking-tighter leading-none">
                  Leadership <br /> & Athletics
                </h3>
                <p className="font-body text-xl text-mda-dark/40 leading-relaxed group-hover:text-mda-dark/60 transition-colors">
                  Forging unit and resilience through high-performance community
                  athletal competitions and strategic leadership intensives.
                </p>
              </div>
              <button className="flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] uppercase text-mda-maroon group-hover:text-mda-pink transition-colors">
                Read Registry{" "}
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>

            {/* Scholarships */}
            <div className="p-16 glass-card rounded-[4rem] border-mda-maroon/5 space-y-12 text-mda-maroon group hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />

              <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                <BookOpen size={32} className="text-mda-pink" />
              </div>
              <div className="space-y-6">
                <h3 className="text-5xl font-display uppercase italic tracking-tighter leading-none">
                  Academic <br /> <span className="text-mda-pink">Grants</span>
                </h3>
                <p className="font-body text-xl text-black/50 leading-relaxed group-hover:text-black/70 transition-colors">
                  Unlocking potential through direct academic funding, prize
                  protocols, and specialized educational mentorship.
                </p>
              </div>
              <Link
                to="/youth/apply-grant"
                className="inline-flex items-center gap-6 px-10 py-5 bg-white text-mda-maroon rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-mda-pink hover:text-white transition-all transform hover:scale-105"
              >
                Access Application
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default YouthPage;

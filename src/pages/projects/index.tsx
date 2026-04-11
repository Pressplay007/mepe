import {
  CheckCircle2,
  Compass,
  ArrowRight,
  Droplets,
  Laptop,
  Store,
  Landmark,
  BookOpen,
  Trophy,
  Heart,
  ShieldCheck,
  Zap,
  Hammer,
} from "lucide-react";

import SEO from "../../components/common/SEO";

const ProjectsPage = () => {
  return (
    <>
      <SEO
        title="Development Projects | Mepe Development Association"
        description="Explore the ongoing and completed development projects by the MDA. We are building a better future through infrastructure, health, and social initiatives."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-40 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-center">
          {/* Animated Mesh Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -left-[10%] w-[300px] md:w-[60%] h-[300px] md:h-[60%] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[250px] md:w-[50%] h-[250px] md:h-[50%] bg-mda-pink/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
            <div className="max-w-4xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-mda-pink animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                  Strategic Impact
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-display text-white leading-[0.9] lg:leading-[0.85] mb-6 md:mb-8 uppercase">
                Community <br />
                <span className="text-mda-pink italic font-serif lowercase">
                  Vision
                </span>
              </h1>
              <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mx-auto md:mx-0">
                Building a stronger and more prosperous Mepe for future
                generations through education, economic development, and
                infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* 1. Water Resource & Agriculture Projects */}
        <section className="py-16 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 md:gap-20 items-center">
              <div className="w-full lg:w-1/2 space-y-8 md:space-y-10 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-mda-maroon/5 rounded-full text-mda-maroon">
                    <Droplets className="w-3.5 h-3.5 text-mda-pink" />
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                      Category 01
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display text-mda-maroon leading-tight uppercase">
                    Water & <br /> Agriculture
                  </h2>
                </div>
                <p className="font-body text-base md:text-lg text-mda-dark/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Leveraging the water bodies around Mepe to create sustainable
                  opportunities for resident aquaculture and year-round farming.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 text-left">
                  <div className="space-y-3 md:space-y-4 group">
                    <h3 className="text-xl md:text-2xl font-display text-mda-maroon uppercase flex items-center gap-3">
                      <span className="w-6 md:w-8 h-px bg-mda-pink" />
                      Fish Farming
                    </h3>
                    <p className="text-sm font-body text-mda-dark/50 leading-relaxed">
                      Aquaculture projects training youth and creating
                      employment through production.
                    </p>
                  </div>
                  <div className="space-y-3 md:space-y-4 group">
                    <h3 className="text-xl md:text-2xl font-display text-mda-maroon uppercase flex items-center gap-3">
                      <span className="w-6 md:w-8 h-px bg-mda-pink" />
                      Irrigation
                    </h3>
                    <p className="text-sm font-body text-mda-dark/50 leading-relaxed">
                      Supporting year-round vegetable farming through modern
                      irrigation systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 aspect-square group relative max-w-lg mx-auto lg:max-w-none">
                <div className="absolute -inset-2 md:-inset-4 bg-mda-maroon/5 rounded-[2rem] md:rounded-[4rem] blur-xl md:blur-2xl group-hover:bg-mda-pink/10 transition-colors duration-700" />
                <div className="relative h-full bg-mda-maroon rounded-[2rem] md:rounded-[4rem] overflow-hidden">
                  <img
                    src={new URL("../../assets/gallery/Water_Agriculture.jpg", import.meta.url).href}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 group-hover:opacity-100"
                    alt="Water Projects"
                  />
                  <div className="absolute inset-x-4 md:inset-x-8 bottom-4 md:bottom-8 glass-card p-4 md:p-8 text-white">
                    <h4 className="text-lg md:text-xl font-display uppercase mb-1">
                      Training Farm
                    </h4>
                    <p className="text-[10px] md:text-xs font-body opacity-60">
                      A practical center for modern farming techniques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Youth & Entrepreneurship Development */}
        <section className="py-16 md:py-32 bg-mda-maroon overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Zap, label: "Soap Prod" },
                  { icon: Hammer, label: "Business" },
                  { icon: Droplets, label: "Fishing" },
                  { icon: Trophy, label: "Sports" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="aspect-square glass-card flex flex-col items-center justify-center gap-3 md:gap-4 group hover:bg-mda-pink transition-all duration-700 cursor-default"
                  >
                    <item.icon className="w-6 md:w-8 h-6 md:h-8 text-mda-pink group-hover:text-mda-maroon transition-colors" />
                    <span className="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-white group-hover:text-mda-maroon text-center px-4">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="order-1 lg:order-2 space-y-8 md:space-y-10 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-mda-pink">
                    <Laptop className="w-3.5 h-3.5" />
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                      Category 02
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display text-white leading-[0.9] lg:leading-[0.85] uppercase">
                    Youth & <br />
                    <span className="text-mda-pink italic font-serif">
                      Entrepreneurship
                    </span>
                  </h2>
                </div>
                <p className="font-body text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Reducing unemployment by training youth in practical skills
                  including poultry, fish farming, and soap production.
                </p>
                <div className="p-6 md:p-8 glass-card border-white/5 text-left">
                  <div className="flex gap-4 md:gap-6">
                    <div className="w-10 md:w-12 h-10 md:h-12 rounded-[1rem] md:rounded-2xl bg-mda-pink/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 md:w-6 h-5 md:h-6 text-mda-pink" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg md:text-xl text-white uppercase italic">
                        Leadership & Service
                      </h4>
                      <p className="text-xs md:text-sm text-white/50 mt-2">
                        Mentorship programs for next-gen leaders and volunteers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Education Development Projects */}
        <section className="py-16 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
            <div className="text-center space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-mda-maroon/5 rounded-full text-mda-maroon">
                <BookOpen className="w-3.5 h-3.5 text-mda-pink" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  Category 03
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-display text-mda-maroon uppercase">
                Education <br /> Development
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <div className="p-8 md:p-16 glass-card bg-mda-cream/30 border-mda-maroon/5 space-y-8 md:space-y-10 group hover:bg-white transition-colors duration-700">
                <h3 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase leading-tight italic">
                  Annual Speech & <br /> Prize Giving
                </h3>
                <p className="font-body text-sm md:text-base text-mda-dark/60 leading-relaxed">
                  Rewarding excellence to encourage academic growth and cultural
                  pride across all Mepe schools.
                </p>
                <div className="flex flex-col gap-3 md:gap-4">
                  {[
                    "Academic Awards",
                    "Leadership Awards",
                    "Cultural Pride",
                  ].map((award) => (
                    <div
                      key={award}
                      className="flex items-center gap-4 text-mda-maroon font-bold text-[8px] md:text-[10px] uppercase tracking-widest group-hover:translate-x-2 transition-transform"
                    >
                      <Trophy className="w-4 h-4 text-mda-pink" /> {award}
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 md:p-16 bg-mda-maroon rounded-[2rem] md:rounded-[4rem] space-y-8 md:space-y-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-mda-pink opacity-0 group-hover:opacity-5 transition-opacity" />
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-4xl font-display text-white uppercase leading-tight">
                    Scholarship <br /> Fund
                  </h3>
                  <p className="font-body text-sm md:text-base text-white/60 leading-relaxed max-w-sm mt-6">
                    Financial support for students pursuing SHS, University, and
                    Technical education.
                  </p>
                  <button className="mt-8 md:mt-12 bg-white text-mda-maroon px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[8px] md:text-[10px] hover:bg-mda-pink transition-all transform hover:-translate-y-1">
                    Apply for Fund
                  </button>
                </div>
                <BookOpen className="w-48 md:w-[300px] h-48 md:h-[300px] absolute -right-10 md:-right-20 -bottom-10 md:-bottom-20 opacity-[0.03] text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Trader & Business Development */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-mda-cream/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-8 md:space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-mda-pink/10 rounded-full text-mda-pink">
                  <Store className="w-3.5 h-3.5" />
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                    Category 04
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display text-mda-maroon leading-tight uppercase">
                  Trader & <br /> Business
                </h2>
              </div>
              <p className="font-body text-base md:text-lg text-mda-dark/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Improving profitability of local businesses through financial
                management training and cooperative networking.
              </p>
              <div className="grid gap-4 md:gap-6 text-left">
                {[
                  {
                    title: "Training",
                    text: "Profit calculation, record keeping, and service skills.",
                  },
                  {
                    title: "Networking",
                    text: "Bulk buying systems to reduce costs and grow scale.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 md:gap-6 p-6 md:p-8 glass-card bg-white border-mda-maroon/5 group hover:border-mda-pink/30 transition-colors"
                  >
                    <div className="w-1 h-full rounded-full bg-mda-pink/20 group-hover:bg-mda-pink transition-colors shrink-0" />
                    <div>
                      <h4 className="font-display text-lg md:text-xl text-mda-maroon uppercase">
                        {item.title}
                      </h4>
                      <p className="text-xs md:text-sm font-body text-mda-dark/40 mt-1">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/5] bg-mda-maroon rounded-[2rem] md:rounded-[4rem] overflow-hidden group relative max-w-md mx-auto lg:max-w-none">
              <img
                src={new URL("../../assets/gallery/Trader_Business.webp", import.meta.url).href}
                className="w-full h-full object-cover transition-all duration-1000"
                alt="Market"
              />
              <div className="absolute inset-x-4 md:inset-x-8 bottom-4 md:bottom-8 glass-card p-6 md:p-8">
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Economic Growth
                </span>
                <h4 className="text-lg md:text-xl font-display text-white uppercase mt-2">
                  Local Enterprise Support
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* 5. & 6. Infrastructure & Tourism Hub */}
        <section className="py-16 md:py-32 bg-mda-maroon text-white relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="order-2 lg:order-1 aspect-square glass-card rounded-[2rem] md:rounded-[4rem] p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 group max-w-lg mx-auto lg:max-w-none">
                <div className="w-16 md:w-24 h-16 md:h-24 rounded-full bg-mda-pink/10 flex items-center justify-center group-hover:bg-mda-pink/20 transition-colors">
                  <Landmark className="w-8 md:w-12 h-8 md:h-12 text-mda-pink" />
                </div>
                <h4 className="text-2xl md:text-4xl font-display uppercase italic text-mda-pink">
                  MDA Office <br /> Complex
                </h4>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {["ICT Hub", "Library", "Conf Hall", "Admin"].map((f) => (
                    <span
                      key={f}
                      className="px-3 md:px-4 py-1.5 md:py-2 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-8 md:space-y-10 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-mda-pink">
                    <Compass className="w-3.5 h-3.5" />
                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                      Cat 05 & 06
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-display leading-[0.9] lg:leading-[0.85] uppercase">
                    Community <br />
                    <span className="text-mda-pink italic font-serif">
                      Infrastructure
                    </span>
                  </h2>
                </div>
                <p className="font-body text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Developing modern durbar grounds and the Mepe Community Museum
                  to preserve our heritage and cultural artifacts.
                </p>
                <div className="p-6 md:p-10 glass-card bg-mda-pink text-mda-maroon border-none text-left">
                  <h3 className="text-xl md:text-2xl font-display uppercase mb-4 italic">
                    Heritage Park
                  </h3>
                  <p className="text-sm font-body opacity-80 leading-relaxed">
                    A multi-phase project combining the museum, cultural
                    village, and craft markets into a premier destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. & 8. Family & Peace Initiatives */}
        <section className="py-16 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            <div className="glass-card p-8 md:p-16 border-mda-maroon/5 space-y-6 md:space-y-8 relative overflow-hidden group hover:border-mda-pink/30 transition-colors">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-mda-pink/10 rounded-full text-mda-pink">
                <Heart className="w-3.5 h-3.5" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  Category 07
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-mda-maroon uppercase leading-[0.9]">
                Family & <br /> Parenting
              </h2>
              <p className="font-body text-sm md:text-base text-mda-dark/60 leading-relaxed max-w-xs">
                Education programs for parents covering child development to
                strengthen family structures.
              </p>
              <Heart className="w-32 md:w-[200px] h-32 md:h-[200px] absolute -right-6 md:-right-10 -bottom-6 md:-bottom-10 opacity-[0.03] text-mda-maroon group-hover:scale-110 transition-transform duration-1000" />
            </div>

            <div className="glass-card p-8 md:p-16 border-mda-maroon/5 bg-mda-cream/30 space-y-6 md:space-y-8 relative overflow-hidden group hover:border-mda-maroon/20 transition-colors">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-mda-maroon/10 rounded-full text-mda-maroon">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                  Category 08
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display text-mda-maroon uppercase leading-[0.9]">
                Peace & <br /> Leadership
              </h2>
              <p className="font-body text-sm md:text-base text-mda-dark/40 leading-relaxed max-w-xs">
                Ensuring unity among leaders and residents through effective
                mentorship and dialogue.
              </p>
              <ShieldCheck className="w-32 md:w-[200px] h-32 md:h-[200px] absolute -right-6 md:-right-10 -bottom-6 md:-bottom-10 opacity-[0.03] text-mda-maroon group-hover:rotate-12 transition-transform duration-1000" />
            </div>
          </div>
        </section>

        {/* Final Support CTA */}
        <section className="py-16 md:py-24 px-4 md:px-8 mb-8 md:mb-24">
          <div className="max-w-7xl mx-auto rounded-[2rem] md:rounded-[4rem] p-1.5 md:p-2 bg-mda-maroon overflow-hidden">
            <div className="bg-mda-maroon rounded-[1.8rem] md:rounded-[3.8rem] p-8 md:p-16 lg:p-32 text-center text-white space-y-10 md:space-y-12 relative overflow-hidden">
              {/* Mesh background for CTA */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=2030&auto=format&fit=crop')] bg-center bg-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-mda-maroon via-transparent to-transparent" />

              <div className="relative z-10 space-y-8 md:space-y-10">
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-4xl md:text-6xl lg:text-8xl font-display uppercase leading-[0.9] md:leading-[0.85]">
                    Support Our <br />
                    <span className="text-mda-pink italic font-serif">
                      Mission
                    </span>
                  </h2>
                  <p className="max-w-2xl mx-auto font-body text-base md:text-lg text-white/60 leading-relaxed">
                    The success of these projects depends on collaboration
                    between community members, diaspora supporters, and
                    development partners.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 justify-center pt-4">
                  <button className="bg-mda-pink text-mda-maroon px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[8px] md:text-[10px] hover:bg-white transition-all transform hover:-translate-y-1 inline-flex items-center gap-3 md:gap-4">
                    Donate Now{" "}
                    <ArrowRight className="w-4 md:w-[18px] h-4 md:h-[18px]" />
                  </button>
                  <button className="glass-card hover:bg-white/10 px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[8px] md:text-[10px] transition-all border-white/20">
                    Partner With Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;

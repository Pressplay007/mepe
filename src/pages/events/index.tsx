import {
  MapPin,
  ArrowRight,
  Calendar,
  Music,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react";

import SEO from "../../components/common/SEO";

const EventsPage = () => {
  return (
    <>
      <SEO
        title="Upcoming Events | Mepe Development Association"
        description="Stay updated with the latest events, festivals, and community gatherings in Mepe. Join us in celebrating and developing our community."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-40 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-center">
          {/* Animated Mesh Glow */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -right-[10%] w-[300px] md:w-[60%] h-[300px] md:h-[60%] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[20%] -left-[10%] w-[250px] md:w-[50%] h-[250px] md:h-[50%] bg-mda-pink/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
            <div className="max-w-4xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-mda-pink animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                  Cultural Pulse
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-display text-white leading-[0.9] lg:leading-[0.85] mb-6 md:mb-8 uppercase">
                Community <br />
                <span className="text-mda-pink italic font-serif lowercase">
                  Calendar
                </span>
              </h1>
              <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mx-auto md:mx-0">
                Celebrating unity, culture, and development through vibrant
                gatherings and shared experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-white/50 backdrop-blur-sm border-b border-mda-maroon/5">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10">
            <h2 className="text-3xl md:text-5xl font-display text-mda-maroon uppercase italic">
              Celebrating Our <span className="text-mda-pink">Unity</span>
            </h2>
            <p className="font-body text-lg md:text-xl text-mda-dark/70 leading-relaxed">
              Events and festivals play a central role in bringing the community
              together. They celebrate our rich heritage, promote unity, and
              create opportunities for youth and community engagement.
            </p>
          </div>
        </section>

        {/* Cultural Festivals */}
        <section className="py-16 md:py-32 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-8 md:space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-mda-pink/10 rounded-full text-mda-pink">
                  <Music className="w-3.5 h-3.5" />
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                    Heritage Celebrations
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display text-mda-maroon leading-tight uppercase">
                  Cultural <br /> Festivals
                </h2>
              </div>
              <p className="font-body text-base md:text-lg text-mda-dark/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Our annual festivals attract visitors and help promote Mepe’s
                cultural heritage through vibrant durbars and performances.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-left">
                {[
                  "Traditional Durbars",
                  "Dance Competitions",
                  "Food Festivals",
                  "Boat Regatta",
                ].map((fest, i) => (
                  <div
                    key={i}
                    className="p-4 md:p-6 glass-card border-mda-maroon/5 font-display text-mda-maroon text-lg md:text-xl uppercase italic group hover:bg-white transition-all duration-500"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-mda-pink opacity-0 group-hover:opacity-100 transition-opacity" />
                      {fest}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-[4/3] bg-mda-maroon rounded-[2rem] md:rounded-[4rem] overflow-hidden group relative">
              <img
                src={new URL("../../assets/gallery/456132438_18061206193720953_3368855995947669246_n.jpg", import.meta.url).href}
                className="w-full h-full object-cover transition-all duration-1000"
                alt="Festival"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mda-maroon/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Educational Events */}
        <section className="py-16 md:py-32 bg-mda-maroon relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 lg:order-1 aspect-video glass-card rounded-[2rem] md:rounded-[3rem] overflow-hidden relative group">
              <img
                src={new URL("../../assets/gallery/456184220_18061206241720953_5588583274442341449_n.jpg", import.meta.url).href}
                className="w-full h-full object-cover transition-all duration-1000"
                alt="Education"
              />
              <div className="absolute inset-0 border border-white/10 rounded-[2rem] md:rounded-[3rem] pointer-events-none" />
            </div>
            <div className="order-1 lg:order-2 space-y-8 md:space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-mda-pink">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
                    Academic Excellence
                  </span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display text-white leading-tight uppercase">
                  Educational <br />
                  <span className="text-mda-pink italic font-serif">
                    Events
                  </span>
                </h2>
              </div>
              <p className="font-body text-base md:text-lg text-white/60 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We organize inter-school competitions, cultural quizzes, and
                excellence awards to inspire the next generation.
              </p>
              <button className="flex items-center gap-3 md:gap-4 text-mda-pink font-bold uppercase tracking-widest text-[8px] md:text-[10px] border-b border-mda-pink/30 pb-3 hover:border-mda-pink transition-colors group mx-auto lg:mx-0">
                View School Programs
                <ArrowRight className="w-4 md:w-[18px] h-4 md:h-[18px] group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Community Meetings & Youth Activities */}
        <section className="py-16 md:py-32 px-4 md:px-8 bg-mda-cream/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {/* Meetings */}
            <div className="p-8 md:p-16 glass-card bg-white border-mda-maroon/5 space-y-8 md:space-y-10 group hover:border-mda-pink/30 transition-all">
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-[1rem] md:rounded-2xl bg-mda-maroon flex items-center justify-center text-white mb-6 md:mb-8 group-hover:bg-mda-pink group-hover:text-mda-maroon transition-colors duration-500">
                <Users className="w-6 md:w-8 h-6 md:h-8" />
              </div>
              <h3 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase">
                Community <br /> Forums
              </h3>
              <p className="font-body text-sm md:text-base text-mda-dark/60 leading-relaxed">
                Regular forums for residents and leaders to discuss development,
                promoting collaboration and transparency.
              </p>
              <div className="flex items-center gap-4 text-mda-maroon font-bold text-[8px] md:text-[10px] uppercase tracking-widest pt-4">
                <div className="w-8 h-px bg-mda-pink" />
                <Calendar className="w-3.5 h-3.5" />
                Next: Town Hall Q3
              </div>
            </div>
            {/* Youth Activities */}
            <div className="p-8 md:p-16 glass-card bg-mda-maroon text-white border-none space-y-8 md:space-y-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-mda-pink opacity-0 group-hover:opacity-5 transition-opacity" />
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-[1rem] md:rounded-2xl bg-white/10 flex items-center justify-center text-mda-pink mb-6 md:mb-8 group-hover:bg-mda-pink group-hover:text-mda-maroon transition-colors duration-500">
                <Trophy className="w-6 md:w-8 h-6 md:h-8" />
              </div>
              <h3 className="text-2xl md:text-4xl font-display uppercase italic">
                Youth <br /> Initiatives
              </h3>
              <p className="font-body text-sm md:text-base text-white/60 leading-relaxed">
                Sports competitions and leadership workshops designed to prepare
                the next generation of Mepe leaders.
              </p>
              <div className="flex items-center gap-4 text-white font-bold text-[8px] md:text-[10px] uppercase tracking-widest pt-4 relative z-10">
                <div className="w-8 h-px bg-mda-pink" />
                <MapPin className="w-3.5 h-3.5 text-mda-pink" />
                Community Centre
              </div>
              <Trophy className="w-48 md:w-[300px] h-48 md:h-[300px] absolute -right-10 md:-right-20 -bottom-10 md:-bottom-20 opacity-[0.03] text-white pointer-events-none" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EventsPage;

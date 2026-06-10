import {
 
  Music,

} from "lucide-react";

import SEO from "../../components/common/SEO";
import EventsList from "../../components/events/EventsList";

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

        {/* Events listing */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-[#f6f4f1]">
          <div className="max-w-7xl mx-auto">
            <EventsList showHeading={false} />
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

        
        
      </div>
    </>
  );
};

export default EventsPage;

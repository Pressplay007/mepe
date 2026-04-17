import { useState } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  category: "upcoming" | "past";
}

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("past");

  const events: Event[] = [
    {
      id: "easter-congress-2026",
      title: "Mepe Hosts Easter Congress 2026",
      date: "April 2026",
      description:
        "Easter Congress is held every Easter by the Chiefs, Queen Mothers, elders and concern natives of Mepe to dialogue about the community’s future. In this year’s Congress, a lot of issues were addressed and one of the most issues addressed was the election of New Mepe Development Association’s (MDA) Chairman. The old MDA leadership held the position for eight years and in this year’s congress, a new leader was elected to Chair the affairs of the MDA.",
      category: "past",
      image: "/past-event1.jpeg", 
    },
  ];

  const filteredEvents = events.filter((event) => event.category === activeTab);

  return (
    <section className="py-16 md:py-24 bg-mda-cream/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block px-4 py-1.5 bg-mda-maroon/5 border border-mda-maroon/10 rounded-full mb-4">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-mda-maroon uppercase">
              Community Calendar
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display text-mda-maroon mb-8 leading-none">
            MEPE EVENTS
          </h2>

          {/* Tabs */}
          <div className="flex justify-center gap-4 md:gap-8 mb-12">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2 rounded-full font-display text-xl transition-all duration-300 ${
                activeTab === "upcoming"
                  ? "bg-mda-maroon text-mda-cream shadow-lg"
                  : "bg-white text-mda-maroon/40 hover:text-mda-maroon border border-mda-maroon/10"
              }`}
            >
              UPCOMING
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2 rounded-full font-display text-xl transition-all duration-300 ${
                activeTab === "past"
                  ? "bg-mda-maroon text-mda-cream shadow-lg"
                  : "bg-white text-mda-maroon/40 hover:text-mda-maroon border border-mda-maroon/10"
              }`}
            >
              PAST EVENTS
            </button>
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-12">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-mda-maroon/5 shadow-xl flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500"
              >
                <div className="md:w-2/5 aspect-[4/3] md:aspect-auto bg-mda-maroon/5 relative overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-mda-maroon/10 font-display text-4xl italic">
                      Event Image
                    </div>
                  )}
                </div>

                <div className="p-8 md:p-12 md:w-3/5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-mda-pink/20 text-mda-maroon px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-display text-mda-maroon mb-6 leading-tight">
                    {event.title}
                  </h3>
                  <p className="font-body text-mda-dark/70 text-base md:text-lg leading-relaxed mb-8">
                    {event.description}
                  </p>
                  <div className="w-12 h-1 bg-mda-pink" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-12 md:p-24 text-center border border-mda-maroon/5 shadow-2xl">
            <h3 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase mb-4 italic">
              There are no {activeTab} events scheduled
            </h3>
            <p className="font-body text-mda-dark/40 tracking-widest uppercase text-[10px] md:text-xs font-bold">
              Please check back later for updates on community durbars and
              festivals.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;


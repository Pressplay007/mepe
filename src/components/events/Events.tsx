import { useEffect, useState } from "react";
import { events as fallbackEvents, type Event } from "../../data/events";
import { listEvents } from "../../services/events";

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [events, setEvents] = useState<Event[]>(fallbackEvents);

  useEffect(() => {
    listEvents()
      .then((data) => {
        if (data.length > 0) setEvents(data);
      })
      .catch(() => {
        // Keep the static fallback if the backend is unavailable.
      });
  }, []);

  const filteredEvents = events.filter((event) =>
    activeTab === "past" ? event.status === "Past" : event.status !== "Past",
  );

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
                className="bg-white rounded-[2.5rem] overflow-hidden border border-mda-maroon/5 shadow-xl flex flex-col group hover:shadow-2xl transition-all duration-500"
              >
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="bg-mda-pink/20 text-mda-maroon px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {event.date}
                    </span>
                    {event.location && (
                      <span className="bg-mda-maroon/5 text-mda-maroon px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {event.location}
                      </span>
                    )}
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


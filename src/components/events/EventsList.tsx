import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import type { Event } from "../../data/events";
import { listEvents } from "../../services/events";

const CATEGORIES = ["All", "Cultural", "Educational", "Community", "Youth"] as const;
const PAGE_SIZE = 8;

type StatusTab = Event["status"];
type ViewMode = "grid" | "list";

interface EventsListProps {
  showHeading?: boolean;
}

const statusDot = (status: Event["status"]) => {
  switch (status) {
    case "Ongoing":
      return "bg-emerald-500";
    case "Past":
      return "bg-mda-maroon/40";
    default:
      return "bg-mda-pink";
  }
};

const EventCard = ({
  event,
  view,
}: {
  event: Event;
  view: ViewMode;
}) => {
  const imageBlock = (
    <div
      className={`relative overflow-hidden bg-mda-cream shrink-0 ${
        view === "grid"
          ? "aspect-[4/3] w-full"
          : "w-full sm:w-56 md:w-64 aspect-[4/3] sm:aspect-auto sm:min-h-[180px]"
      }`}
    >
      {event.image ? (
        <img
          src={event.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-mda-maroon/5">
          <Calendar className="w-10 h-10 text-mda-maroon/15" />
        </div>
      )}
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/45 backdrop-blur-sm text-white text-[11px] font-medium">
        {event.category}
      </span>
      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-mda-maroon text-[11px] font-semibold shadow-sm">
        <span className={`w-1.5 h-1.5 rounded-full ${statusDot(event.status)}`} />
        {event.status}
      </span>
    </div>
  );

  const body = (
    <div className={`flex flex-col justify-center ${view === "grid" ? "p-4 md:p-5" : "p-5 md:p-6 flex-1 min-w-0"}`}>
      <p className="text-xs text-mda-maroon/45 font-medium mb-2">{event.date}</p>
      <h3
        className={`font-bold text-mda-maroon leading-snug group-hover:text-mda-pink transition-colors ${
          view === "grid" ? "text-base md:text-lg line-clamp-2" : "text-xl md:text-2xl"
        }`}
      >
        {event.title}
      </h3>
      {event.location && (
        <p className="mt-2 text-xs text-mda-maroon/45 flex items-start gap-1.5">
          <MapPin size={13} className="shrink-0 mt-0.5 text-mda-maroon/30" />
          <span className="line-clamp-2">{event.location}</span>
        </p>
      )}
      {view === "list" && event.description && (
        <p className="mt-3 text-sm text-mda-maroon/55 leading-relaxed line-clamp-2">
          {event.description}
        </p>
      )}
    </div>
  );

  if (view === "list") {
    return (
      <article className="group flex flex-col sm:flex-row bg-white rounded-2xl border border-mda-maroon/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        {imageBlock}
        {body}
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl border border-mda-maroon/5 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {imageBlock}
      {body}
    </article>
  );
};

const EventsList = ({ showHeading = true }: EventsListProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<StatusTab>("Upcoming");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    listEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(
    () => ({
      Upcoming: events.filter((e) => e.status === "Upcoming").length,
      Ongoing: events.filter((e) => e.status === "Ongoing").length,
      Past: events.filter((e) => e.status === "Past").length,
    }),
    [events],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return events.filter((event) => {
      if (event.status !== activeTab) return false;
      if (category !== "All" && event.category !== category) return false;
      if (!q) return true;
      return (
        event.title.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q)
      );
    });
  }, [events, activeTab, category, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab, category, search]);

  const tabs: StatusTab[] = ["Upcoming", "Ongoing", "Past"];

  return (
    <div>
      {showHeading && (
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block px-4 py-1.5 bg-mda-maroon/5 border border-mda-maroon/10 rounded-full mb-4">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-mda-maroon uppercase">
              Community Calendar
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-mda-maroon leading-none">
            MEPE EVENTS
          </h2>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-mda-maroon/5 shadow-sm p-3 md:p-4 mb-8 flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Status tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-mda-maroon text-white shadow-md shadow-mda-maroon/20"
                    : "bg-mda-cream/80 text-mda-maroon/55 hover:text-mda-maroon hover:bg-mda-cream"
                }`}
              >
                {tab}{" "}
                <span
                  className={
                    activeTab === tab ? "text-white/70" : "text-mda-maroon/35"
                  }
                >
                  ({counts[tab]})
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-mda-maroon/30"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-mda-cream/50 border border-mda-maroon/5 text-sm text-mda-maroon placeholder:text-mda-maroon/30 focus:outline-none focus:border-mda-pink/40 transition-colors"
            />
          </div>

          {/* Category + view */}
          <div className="flex items-center gap-2 shrink-0">
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as (typeof CATEGORIES)[number])
              }
              className="px-3 py-2.5 rounded-xl bg-mda-cream/50 border border-mda-maroon/5 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink/40 cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
            <div className="flex rounded-xl border border-mda-maroon/5 overflow-hidden">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`p-2.5 transition-colors ${
                  view === "grid"
                    ? "bg-mda-maroon text-white"
                    : "bg-white text-mda-maroon/40 hover:text-mda-maroon"
                }`}
                title="Grid view"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`p-2.5 transition-colors ${
                  view === "list"
                    ? "bg-mda-maroon text-white"
                    : "bg-white text-mda-maroon/40 hover:text-mda-maroon"
                }`}
                title="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
        </div>
      ) : paginated.length > 0 ? (
        <>
          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
                : "flex flex-col gap-4"
            }
          >
            {paginated.map((event) => (
              <EventCard key={event.id} event={event} view={view} />
            ))}
          </div>

          {/* Pagination */}
          {filtered.length > PAGE_SIZE && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-mda-maroon/5">
              <p className="text-sm text-mda-maroon/50">
                Showing{" "}
                <span className="font-semibold text-mda-maroon">
                  {paginated.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-mda-maroon">
                  {filtered.length}
                </span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="p-2 rounded-full border border-mda-maroon/10 text-mda-maroon/50 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - safePage) <= 1,
                  )
                  .reduce<(number | "…")[]>((acc, p, i, arr) => {
                    if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("…");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "…" ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-mda-maroon/30"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPage(p as number)}
                        className={`w-9 h-9 rounded-full text-sm font-semibold transition-colors ${
                          safePage === p
                            ? "bg-mda-maroon text-white shadow-md"
                            : "text-mda-maroon/50 hover:bg-white border border-transparent hover:border-mda-maroon/10"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="p-2 rounded-full border border-mda-maroon/10 text-mda-maroon/50 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-mda-maroon/5 p-12 md:p-20 text-center">
          <Calendar className="w-12 h-12 text-mda-maroon/15 mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-display text-mda-maroon uppercase mb-2">
            {events.length === 0
              ? "No events yet"
              : `No ${activeTab.toLowerCase()} events found`}
          </h3>
          <p className="text-sm text-mda-maroon/40 max-w-md mx-auto">
            {search || category !== "All"
              ? "Try adjusting your search or filters."
              : "Check back soon for community gatherings and festivals."}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventsList;

import { useState, useEffect, useMemo, useCallback } from "react";
import { Camera, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import SEO from "../../components/common/SEO";
import { listMedia, type MediaItem } from "../../services/media";
import { cn } from "@/lib/utils";

type Filter = "all" | "photos" | "videos";

type GalleryItem = {
  id: string;
  src: string;
  title: string;
  kind: "photo" | "video";
};

const VIDEO_TYPES = new Set(["MP4", "MOV", "WEBM", "AVI", "MKV", "M4V"]);

const GRID_SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:row-span-2",
  "",
  "md:col-span-2",
  "",
  "md:row-span-2",
  "",
  "md:col-span-2",
];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "View All" },
  { id: "photos", label: "Photos" },
  { id: "videos", label: "Videos" },
];

const toGalleryItem = (item: MediaItem): GalleryItem | null => {
  const title = item.name.replace(/\.[^./\\]+$/, "");
  if (item.type === "Image") {
    return { id: item.id, src: item.url, title, kind: "photo" };
  }
  if (VIDEO_TYPES.has(item.type)) {
    return { id: item.id, src: item.url, title, kind: "video" };
  }
  return null;
};

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    listMedia()
      .then((media) => {
        setItems(
          media.map(toGalleryItem).filter((item): item is GalleryItem => !!item),
        );
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const hasVideos = items.some((item) => item.kind === "video");
  const activeFilters = hasVideos
    ? FILTERS
    : FILTERS.filter((f) => f.id !== "videos");

  const visibleItems = useMemo(() => {
    if (filter === "photos") return items.filter((item) => item.kind === "photo");
    if (filter === "videos") return items.filter((item) => item.kind === "video");
    return items;
  }, [items, filter]);

  const activeLightboxIndex =
    lightboxIndex !== null && lightboxIndex < visibleItems.length
      ? lightboxIndex
      : null;

  const lightboxItem =
    activeLightboxIndex !== null ? visibleItems[activeLightboxIndex] ?? null : null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextItem = useCallback(() => {
    if (lightboxIndex === null || visibleItems.length === 0) return;
    setLightboxIndex((lightboxIndex + 1) % visibleItems.length);
  }, [lightboxIndex, visibleItems.length]);

  const prevItem = useCallback(() => {
    if (lightboxIndex === null || visibleItems.length === 0) return;
    setLightboxIndex(
      (lightboxIndex - 1 + visibleItems.length) % visibleItems.length,
    );
  }, [lightboxIndex, visibleItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextItem();
      if (e.key === "ArrowLeft") prevItem();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextItem, prevItem]);

  return (
    <>
      <SEO
        title="Gallery | Mepe Development Association"
        description="Explore moments of tradition, progress, and community life in Mepe through our curated photo and video gallery."
      />

      <div className="bg-mda-cream min-h-screen pb-28">
        {/* Hero */}
        <section className="relative py-20 lg:py-40 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-center">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-mda-pink/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-8 md:space-y-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 text-mda-pink" />
                Visual Protocol
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-display leading-[0.9] lg:leading-[0.8] mb-6 md:mb-8 uppercase text-white er">
                MEPE <br />
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Gallery
                </span>
              </h1>
              <p className="font-body text-lg md:text-2xl text-white/50 leading-relaxed max-w-2xl border-l border-mda-pink/30 pl-6 md:pl-10">
                A comprehensive intelligence archive of moments, culture, and
                strategic progress within the Mepe community.
              </p>
            </div>
          </div>
        </section>

        {/* Masonry grid */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-[#f6f4f1]">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
            </div>
          ) : visibleItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] sm:auto-rows-[180px] md:auto-rows-[210px] gap-2 md:gap-3">
              {visibleItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className={cn(
                    "group relative overflow-hidden bg-mda-maroon/5 text-left",
                    GRID_SPANS[index % GRID_SPANS.length],
                  )}
                >
                  {item.kind === "photo" ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <>
                      <video
                        src={item.src}
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-mda-maroon/20 group-hover:bg-mda-maroon/10 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                          <Play
                            size={16}
                            className="text-mda-maroon ml-0.5 fill-mda-maroon"
                          />
                        </span>
                      </div>
                    </>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-mda-maroon/70 via-mda-maroon/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white line-clamp-1">
                      {item.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <h2 className="text-2xl md:text-3xl font-display text-mda-maroon uppercase mb-3">
                {filter === "all" ? "No gallery media yet" : `No ${filter} yet`}
              </h2>
              <p className="text-sm text-mda-maroon/45 max-w-md mx-auto">
                Photos and videos uploaded through the admin gallery will appear
                here.
              </p>
            </div>
          )}
        </div>
        </section>

        {activeFilters.length > 1 && (
          <nav
            aria-label="Gallery filters"
            className="fixed bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 z-40"
          >
            <div className="flex items-center gap-1 rounded-full bg-white px-2 py-2 shadow-[0_8px_40px_rgba(93,26,26,0.12)] border border-mda-maroon/5">
              {activeFilters.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setFilter(option.id);
                    setLightboxIndex(null);
                  }}
                  className={cn(
                    "px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap",
                    filter === option.id
                      ? "bg-mda-maroon text-white shadow-sm"
                      : "text-mda-maroon/65 hover:text-mda-maroon hover:bg-mda-cream/80",
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </nav>
        )}

        {lightboxItem && activeLightboxIndex !== null && (
          <div
            className="fixed inset-0 z-[100] bg-mda-maroon/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            <button
              type="button"
              className="absolute top-5 right-5 md:top-8 md:right-8 text-white/60 hover:text-white transition-colors z-[110]"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {visibleItems.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevItem();
                  }}
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                </button>
                <button
                  type="button"
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextItem();
                  }}
                  aria-label="Next"
                >
                  <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                </button>
              </>
            )}

            <div
              className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center gap-5"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxItem.kind === "photo" ? (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.title}
                  className="max-w-full max-h-[72vh] object-contain"
                />
              ) : (
                <video
                  src={lightboxItem.src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[72vh] object-contain bg-black"
                />
              )}

              <div className="text-center px-4">
                <p className="text-lg md:text-2xl font-display text-white uppercase">
                  {lightboxItem.title}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/45 mt-2">
                  {activeLightboxIndex + 1} / {visibleItems.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;

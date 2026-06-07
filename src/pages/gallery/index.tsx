import {
  Camera,
  Layers,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Film,
} from "lucide-react";
import { useState, useEffect } from "react";
import SEO from "../../components/common/SEO";

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const images = [
    {
      src: new URL(
        "../../assets/gallery/456251856_18061206280720953_4691208955845474968_n.jpg",
        import.meta.url,
      ).href,
      title: "Mepe Tradition",
    },
    {
      src: new URL(
        "../../assets/gallery/455800117_18061206196720953_4456184814691688723_n.jpg",
        import.meta.url,
      ).href,
      title: "Festival Spirit",
    },
    {
      src: new URL(
        "../../assets/gallery/Kente-Cloth-Ghanas-Cultural-Gold-Mine_010925-1-scaled.jpg",
        import.meta.url,
      ).href,
      title: "Cultural Artistry",
    },
    {
      src: new URL(
        "../../assets/gallery/images_Banku_And_Okro_Soup_277506581.jpg",
        import.meta.url,
      ).href,
      title: "Local Tastes",
    },
    {
      src: new URL(
        "../../assets/gallery/Makola-Market-Accra.jpg",
        import.meta.url,
      ).href,
      title: "Market Life",
    },
    {
      src: new URL(
        "../../assets/gallery/455991774_18061206271720953_6194218305811081143_n.jpg",
        import.meta.url,
      ).href,
      title: "River Volta",
    },
    {
      src: new URL(
        "../../assets/gallery/456130250_18061206187720953_8453159004960842026_n.jpg",
        import.meta.url,
      ).href,
      title: "Rhythm of Mepe",
    },
    {
      src: new URL(
        "../../assets/gallery/456328911_18061206232720953_4587617597907394016_n.jpg",
        import.meta.url,
      ).href,
      title: "Mepe Landscape",
    },
    {
      src: new URL(
        "../../assets/gallery/456132438_18061206193720953_3368855995947669246_n.jpg",
        import.meta.url,
      ).href,
      title: "Development Site",
    },
    {
      src: new URL(
        "../../assets/gallery/456184220_18061206241720953_5588583274442341449_n.jpg",
        import.meta.url,
      ).href,
      title: "Future Leaders",
    },
    {
      src: new URL(
        "../../assets/gallery/524445973_1341760967957245_7840297303174955587_n.jpg",
        import.meta.url,
      ).href,
      title: "Skills Training",
    },
    {
      src: new URL(
        "../../assets/gallery/455721395_18061206301720953_6554931698407349356_n.jpg",
        import.meta.url,
      ).href,
      title: "Community Unity",
    },
    {
      src: new URL(
        "../../assets/gallery/456217266_18061206190720953_9190619641682968041_n.jpg",
        import.meta.url,
      ).href,
      title: "Heritage",
    },
    {
      src: new URL(
        "../../assets/gallery/456314736_18061206244720953_3574851341763144433_n.jpg",
        import.meta.url,
      ).href,
      title: "Project Progress",
    },
    {
      src: new URL(
        "../../assets/gallery/505730882_1301467045319971_4163705806737903282_n.jpg",
        import.meta.url,
      ).href,
      title: "Youth Mentorship",
    },
    {
      src: new URL("../../assets/gallery/51030396.jpg", import.meta.url).href,
      title: "Community Life",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (1).jpeg",
        import.meta.url,
      ).href,
      title: "Community Moment",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (2).jpeg",
        import.meta.url,
      ).href,
      title: "Local Interaction",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (3).jpeg",
        import.meta.url,
      ).href,
      title: "Project Site",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (4).jpeg",
        import.meta.url,
      ).href,
      title: "Village Scene",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (5).jpeg",
        import.meta.url,
      ).href,
      title: "Traditional Event",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (6).jpeg",
        import.meta.url,
      ).href,
      title: "Market Scene",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (7).jpeg",
        import.meta.url,
      ).href,
      title: "Nature & Life",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (8).jpeg",
        import.meta.url,
      ).href,
      title: "Landscape View",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (9).jpeg",
        import.meta.url,
      ).href,
      title: "Community Members",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (10).jpeg",
        import.meta.url,
      ).href,
      title: "Education Project",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (11).jpeg",
        import.meta.url,
      ).href,
      title: "Skills Hub",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (12).jpeg",
        import.meta.url,
      ).href,
      title: "Future Prospects",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (13).jpeg",
        import.meta.url,
      ).href,
      title: "Local Heritage",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (14).jpeg",
        import.meta.url,
      ).href,
      title: "Tradition Alive",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (15).jpeg",
        import.meta.url,
      ).href,
      title: "Community Growth",
    },
    {
      src: new URL(
        "../../assets/gallery/WhatsApp Image 2026-03-12 at 06.48.02 (16).jpeg",
        import.meta.url,
      ).href,
      title: "Mepe Forward",
    },
  ];

  const videos = [
    {
      // title: "The Heart of Mepe",
      category: "Documentary",
      url: new URL("../../assets/gallery/vid1.mp4", import.meta.url).href,
      isLocal: true,
    },
    {
      // title: "Afenorto Festival 2025",
      category: "Documentary",
      url: new URL("../../assets/gallery/vid2.mp4", import.meta.url).href,
      isLocal: true,
    },
  ];

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null && selectedVideo === null) return;
      if (e.key === "ArrowRight" && selectedIndex !== null) nextImage();
      if (e.key === "ArrowLeft" && selectedIndex !== null) prevImage();
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setSelectedVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, selectedVideo]);

  return (
    <>
      <SEO
        title="Image Gallery | Mepe Development Association"
        description="Explore the visual history and cultural vibrancy of Mepe through our curated image gallery. View moments of tradition, progress, and community life."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Header */}
        <section className="relative py-20 lg:py-40 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-center">
          {/* Animated Mesh Glows */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-mda-pink/5 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-8 md:space-y-12">
              <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                <Camera className="w-3.5 h-3.5 md:w-4 md:h-4 text-mda-pink" />
                Visual Protocol
              </div>
              <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-display leading-[0.9] lg:leading-[0.8] mb-6 md:mb-8 uppercase text-white er">
                MEPE <br />{" "}
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

        {/* Masonry Grid */}
        <section className="py-16 md:py-24 px-4 md:px-8 relative bg-white">
          {/* Bespoke Grid Background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#5D1A1A 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 md:gap-12 space-y-6 md:space-y-12 relative z-10">
            {images.map((image, i) => (
              <div
                key={i}
                onClick={() => setSelectedIndex(i)}
                className="break-inside-avoid group relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(93,26,26,0.15)] transition-all duration-700 cursor-pointer border border-mda-maroon/5 p-2 md:p-3"
              >
                <div className="aspect-auto rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Minimalist Overlay */}
                <div className="absolute inset-x-4 md:inset-x-8 bottom-4 md:bottom-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-[10px] md:text-sm font-bold text-white uppercase tracking-widest bg-mda-maroon/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl border border-white/10">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Archive Section */}
        <section className="py-24 md:py-40 px-4 md:px-8 bg-mda-maroon text-white relative overflow-hidden">
          {/* Kinetic Mesh Background */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-mda-pink/5 rounded-full blur-[120px] animate-pulse-glow" />
            <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] bg-mda-pink/10 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div className="max-w-3xl space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[10px] text-mda-pink bg-white/5">
                  <Film className="w-4 h-4" />
                  Motion Archives
                </div>
                <h2 className="text-5xl md:text-8xl font-display uppercase leading-[0.9] er">
                  Kinetic <br />
                  <span className="text-mda-pink italic font-serif normal-case">
                    Intelligence
                  </span>
                </h2>
                <p className="font-body text-white/40 text-xl md:text-2xl border-l border-mda-pink/30 pl-8">
                  A dynamic record of Mepe's evolution through cinematic
                  documentation and archival footage.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {videos.map((video, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedVideo(i)}
                  className="group cursor-pointer relative"
                >
                  <div className="relative aspect-video rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 group-hover:scale-[1.02] group-hover:shadow-mda-pink/10">
                    <video
                      src={video.url}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-mda-pink">
                        <Play className="w-4 h-4 md:w-6 md:h-6 text-white fill-current" />
                      </div>
                    </div>
                    {/* Category Tag */}
                    <div className="absolute top-6 left-6 md:top-8 md:left-8">
                      <span className="px-5 py-2 md:px-6 md:py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-mda-pink">
                        {video.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8 md:mt-12 space-y-3 md:space-y-4 px-4">
                    <h3 className="text-2xl md:text-4xl font-display uppercase  text-white group-hover:text-mda-pink transition-colors">
                      {/* {video.title} */}
                    </h3>
                    <div className="w-12 h-1 bg-mda-pink/30 group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-[100] bg-mda-dark/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Lightbox Mesh */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-mda-pink/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />

            <button
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/40 hover:text-mda-pink transition-all hover:rotate-90 z-[110]"
              onClick={() => setSelectedIndex(null)}
            >
              <X className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <div className="absolute left-4 md:left-12 flex flex-col gap-4 z-[110]">
              <button
                className="text-white/30 hover:text-mda-pink transition-all hover:-translate-x-2 bg-white/5 p-3 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft className="w-6 h-6 md:w-12 md:h-12" />
              </button>
            </div>

            <div className="absolute right-4 md:right-12 flex flex-col gap-4 z-[110]">
              <button
                className="text-white/30 hover:text-mda-pink transition-all hover:translate-x-2 bg-white/5 p-3 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight className="w-6 h-6 md:w-12 md:h-12" />
              </button>
            </div>

            <div
              className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center gap-8 md:gap-12"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full relative rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 bg-black/50 p-2 md:p-4 animate-in zoom-in-95 duration-700">
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].title}
                  className="w-full h-auto max-h-[60vh] md:max-h-[70vh] object-contain rounded-[1.5rem] md:rounded-[3rem]"
                />
              </div>

              <div className="text-center space-y-4 md:space-y-6 animate-in slide-in-from-bottom-12 duration-1000 px-4">
                <h3 className="text-3xl md:text-6xl lg:text-8xl font-display text-white uppercase italic er">
                  {images[selectedIndex].title}
                </h3>
                <div className="h-0.5 w-24 md:w-32 bg-mda-pink mx-auto" />
                <p className="text-mda-pink font-bold text-[8px] md:text-xs tracking-[0.4em] uppercase">
                  Protocol Entry {selectedIndex + 1} // {images.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo !== null && (
          <div
            className="fixed inset-0 z-[100] bg-mda-dark/98 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-500"
            onClick={() => setSelectedVideo(null)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] aspect-video animate-in zoom-in-95 duration-700 px-4 md:px-0">
              <div className="relative w-full h-full rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/5 bg-black shadow-2xl">
                {videos[selectedVideo].isLocal ? (
                  <video
                    src={videos[selectedVideo].url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={`${videos[selectedVideo].url}?autoplay=1`}
                    // title={videos[selectedVideo].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                )}
              </div>
              <div className="mt-8 md:mt-12 text-center">
                <h3 className="text-3xl md:text-7xl font-display text-white uppercase italic">
                  {/* {videos[selectedVideo].title} */}
                </h3>
                <p className="text-mda-pink font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase mt-4">
                  Now Streaming // {videos[selectedVideo].category}
                </p>
              </div>
            </div>

            <button
              className="absolute top-6 right-6 md:top-12 md:right-12 text-white/40 hover:text-mda-pink transition-all hover:rotate-90 z-[110]"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-8 h-8 md:w-12 md:h-12" />
            </button>
          </div>
        )}

        {/* Call to Action */}
        <section className="py-20 md:py-40 bg-mda-cream relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-8 md:space-y-12">
            <div className="w-16 md:w-20 h-16 md:h-20 bg-mda-maroon rounded-[1.5rem] md:rounded-3xl flex items-center justify-center mx-auto mb-8 md:mb-12 shadow-2xl">
              <Layers className="w-8 h-8 md:w-10 md:h-10 text-mda-pink" />
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-9xl font-display text-mda-maroon uppercase leading-[0.9] lg:leading-none er">
              CITIZEN <br />
              <span className="text-mda-pink italic font-serif normal-case text-glow">
                Archives
              </span>
            </h2>
            <p className="font-body text-mda-dark/40 text-lg md:text-2xl max-w-2xl mx-auto leading-relaxed border-t border-mda-maroon/5 pt-8 md:pt-12 px-4">
              Do you possess archival footage or high-intelligence documentation
              of Mepe's evolution? Contribute to the collective memory.
            </p>
            <button className="premium-gradient text-white px-8 md:px-16 py-4 md:py-7 rounded-2xl md:rounded-3xl font-bold uppercase text-[10px] md:text-sm tracking-[0.3em] hover:shadow-[0_40px_80px_-20px_rgba(93,26,26,0.3)] hover:-translate-y-2 transition-all">
              Initiate Submission
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Gallery;

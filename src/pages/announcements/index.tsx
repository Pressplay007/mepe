import { useState } from "react";
import SEO from "../../components/common/SEO";
import { announcements, type Announcement } from "../../data/announcements";
import { X, FileText, Calendar, Tag } from "lucide-react";

const AnnouncementsPage = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);

  return (
    <div className="bg-mda-cream min-h-screen pt-32 pb-24">
      <SEO
        title="Announcements | Mepe Development Association"
        description="Stay updated with the latest news, events, and official announcements from the Mepe Development Association."
      />

      <div className="container mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-7xl md:text-9xl font-display text-mda-maroon leading-none animate-reveal">
            OFFICIAL <span className="text-mda-pink">UPDATES</span>
          </h1>
          <div
            className="h-2 w-32 bg-mda-pink mt-6 animate-reveal"
            style={{ animationDelay: "200ms" }}
          ></div>
        </header>

        <div className="grid gap-8">
          {announcements.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white border border-mda-maroon/10 p-8 md:p-12 transition-all duration-500 hover:shadow-2xl hover:shadow-mda-maroon/5 flex flex-col md:flex-row gap-8 items-start animate-reveal cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => setSelectedAnnouncement(item)}
            >
              <div className="flex-shrink-0 w-full md:w-48">
                <div className="text-mda-pink font-display text-2xl uppercase tracking-widest mb-2">
                  {item.date}
                </div>
                <div
                  className={`inline-block px-3 py-1 text-[10px] font-bold uppercase er ${
                    item.isOfficial
                      ? "bg-mda-maroon text-white"
                      : "bg-mda-maroon/5 text-mda-maroon"
                  }`}
                >
                  {item.category}
                </div>
              </div>

              <div className="flex-grow">
                <h2 className="text-4xl md:text-5xl font-display text-mda-maroon mb-4 group-hover:text-mda-pink transition-colors">
                  {item.title}
                </h2>
                <p className="font-body text-mda-maroon/70 text-lg leading-relaxed max-w-3xl">
                  {item.summary}
                </p>
                <button className="mt-8 flex items-center gap-2 text-mda-maroon font-bold uppercase tracking-widest text-xs group/btn">
                  Read Full Announcement
                  <span className="w-8 h-[1px] bg-mda-maroon group-hover/btn:w-12 transition-all duration-300"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-mda-maroon/90 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedAnnouncement(null)}
          ></div>

          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-reveal-up border-t-8 border-mda-pink">
            <button
              className="absolute top-6 right-6 text-mda-maroon hover:text-mda-pink transition-colors z-10"
              onClick={() => setSelectedAnnouncement(null)}
            >
              <X size={32} />
            </button>

            <div className="p-8 md:p-16">
              <div className="flex flex-wrap gap-6 mb-8 text-[10px] font-bold uppercase tracking-widest text-mda-maroon/50">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-mda-pink" />
                  {selectedAnnouncement.date}
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-mda-pink" />
                  {selectedAnnouncement.category}
                </div>
              </div>

              <h2 className="text-5xl md:text-7xl font-display text-mda-maroon mb-12 leading-tight">
                {selectedAnnouncement.title}
              </h2>

              <div className="prose prose-lg max-w-none">
                <div className="font-body text-mda-maroon/80 whitespace-pre-wrap leading-relaxed bg-mda-maroon/5 p-8 md:p-12 border-l-4 border-mda-pink">
                  {selectedAnnouncement.content}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-mda-maroon/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-mda-maroon flex items-center justify-center text-white">
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase er text-mda-maroon/40">
                      Issued by
                    </p>
                    <p className="text-xs font-bold text-mda-maroon">
                      Mepe Development Association
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAnnouncement(null)}
                  className="bg-mda-maroon text-white px-8 py-3 font-bold uppercase tracking-widest text-[10px] hover:bg-mda-pink transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal-up {
          animation: reveal-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default AnnouncementsPage;

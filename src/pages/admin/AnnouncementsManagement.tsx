import { useEffect, useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type Announcement } from "../../data/announcements";
import {
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../services/announcements";
import AddAnnouncementSheet from "../../components/admin/AddAnnouncementSheet";
import EditAnnouncementSheet from "../../components/admin/EditAnnouncementSheet";

const AnnouncementsManagement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    listAnnouncements()
      .then(setAnnouncements)
      .catch((e) => setError(e.message ?? "Failed to load announcements."))
      .finally(() => setLoading(false));
  }, []);

  const filteredAnnouncements = announcements.filter(
    (ann) =>
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddAnnouncement = async (announcement: Announcement) => {
    const created = await createAnnouncement(announcement);
    setAnnouncements((prev) => [created, ...prev]);
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setIsEditSheetOpen(true);
  };

  const handleSaveAnnouncement = async (updated: Announcement) => {
    const saved = await updateAnnouncement(updated.id, updated);
    setAnnouncements((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm("Delete this announcement? This cannot be undone."))
      return;
    await deleteAnnouncement(id);
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8 animate-reveal">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            COMMUNITY <span className="text-mda-pink">ANNOUNCEMENTS</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
            Publish and manage official communications.
          </p>
        </div>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="bg-mda-maroon text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus size={16} />
          New Announcement
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[15px] px-6 py-4">
          <p className="text-xs font-medium text-red-600">{error}</p>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/20"
            size={18}
          />
          <input
            type="text"
            placeholder="Search announcements by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-4 pl-12 pr-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm hover:shadow-xl hover:shadow-mda-maroon/5 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-start gap-6 flex-1">
                <div
                  className={`w-14 h-14 rounded-[10px] flex items-center justify-center shrink-0 ${ann.isOfficial ? "bg-mda-maroon text-white" : "bg-mda-pink/10 text-mda-pink"}`}
                >
                  <Megaphone size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-mda-pink">
                      {ann.category}
                    </span>
                    {ann.isOfficial && (
                      <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest bg-mda-maroon/5 text-mda-maroon px-2 py-0.5 rounded-full border border-mda-maroon/5">
                        <CheckCircle2 size={10} />
                        Official
                      </span>
                    )}
                  </div>
                  <h3 className="text-[25px] font-bold text-mda-maroon">
                    {ann.title}
                  </h3>
                  <p className="text-xs text-mda-maroon/40 mt-1 line-clamp-1">
                    {ann.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-4 lg:pt-0 border-mda-maroon/5">
                <div className="flex items-center gap-2 text-mda-maroon/40">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {ann.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="p-3 hover:bg-mda-cream rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                    title="Preview"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className="p-3 hover:bg-mda-cream rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                    title="Edit"
                    onClick={() => handleEditAnnouncement(ann)}
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="p-3 hover:bg-red-50 rounded-xl text-mda-maroon/40 hover:text-red-500 transition-all"
                    title="Delete"
                    onClick={() => handleDeleteAnnouncement(ann.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && filteredAnnouncements.length === 0 && (
        <div className="bg-white p-20 rounded-3xl border border-mda-maroon/5 shadow-sm text-center">
          <div className="w-20 h-20 bg-mda-cream rounded-3xl flex items-center justify-center mx-auto mb-6 text-mda-maroon/20">
            <Search size={40} />
          </div>
          <h3 className="text-xl font-display text-mda-maroon uppercase ">
            No announcements found
          </h3>
          <p className="text-mda-maroon/40 mt-2 text-sm font-medium">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
          Showing{" "}
          <span className="text-mda-maroon">
            {filteredAnnouncements.length}
          </span>{" "}
          announcements
        </p>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white border border-mda-maroon/5 rounded-xl text-mda-maroon/20 cursor-not-allowed shadow-sm">
            <ChevronLeft size={18} />
          </button>
          <button className="p-3 bg-white border border-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:bg-mda-cream transition-colors shadow-sm">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Add Announcement Sheet Component */}
      <AddAnnouncementSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAdd={handleAddAnnouncement}
        nextId={String(announcements.length + 1)}
      />

      {/* Edit Announcement Sheet Component */}
      <EditAnnouncementSheet
        isOpen={isEditSheetOpen}
        onClose={() => { setIsEditSheetOpen(false); setEditingAnnouncement(null); }}
        onSave={handleSaveAnnouncement}
        announcement={editingAnnouncement}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default AnnouncementsManagement;

import { useEffect, useState } from "react";
import {
  Upload,
  Search,
  Trash2,
  Download,
  Eye,
  Grid,
  List,
} from "lucide-react";
import MediaUploadSheet from "../../components/admin/MediaUploadSheet";
import {
  listMedia,
  uploadMedia,
  deleteMedia,
  type MediaItem,
} from "../../services/media";

const MediaManagement = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    listMedia()
      .then(setMedia)
      .catch((e) => setError(e.message ?? "Failed to load media."))
      .finally(() => setLoading(false));
  }, []);

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = async (file: File) => {
    const created = await uploadMedia(file);
    setMedia((prev) => [created, ...prev]);
  };

  const handleDelete = async (item: MediaItem) => {
    if (!window.confirm("Delete this file? This cannot be undone.")) return;
    await deleteMedia(item);
    setMedia((prev) => prev.filter((m) => m.id !== item.id));
  };

  return (
    <div className="space-y-8 animate-reveal">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            MEDIA <span className="text-mda-pink">LIBRARY</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
            Manage site assets and gallery images.
          </p>
        </div>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="bg-mda-maroon text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Upload size={16} />
          Upload Media
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[15px] px-6 py-4">
          <p className="text-xs font-medium text-red-600">{error}</p>
        </div>
      )}

      {/* Toolbar */}
      <div className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 items-center w-full lg:w-auto flex-1">
          <div className="relative flex-1 w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/20"
              size={18}
            />
            <input
              type="text"
              placeholder="Search media..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-4 pl-12 pr-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 bg-mda-cream/30 p-1.5 rounded-[10px] border border-mda-maroon/5">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-3 rounded-xl transition-all ${viewMode === "grid" ? "bg-white text-mda-maroon shadow-sm" : "text-mda-maroon/40 hover:text-mda-maroon"}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-3 rounded-xl transition-all ${viewMode === "list" ? "bg-white text-mda-maroon shadow-sm" : "text-mda-maroon/40 hover:text-mda-maroon"}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Media Grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredMedia.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-mda-maroon/30 font-bold uppercase tracking-widest text-xs">
                {loading ? "Loading media..." : "No media in this folder"}
              </p>
            </div>
          ) : filteredMedia.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-[15px] border border-mda-maroon/5 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-mda-maroon/10 transition-all"
            >
              <div className="aspect-square bg-mda-cream overflow-hidden">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <p className="text-[10px] font-bold text-mda-maroon uppercase  truncate">
                  {item.name}
                </p>
                <p className="text-[9px] text-mda-maroon/40 font-medium mt-1">
                  {item.size} • {item.type}
                </p>
              </div>

              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-mda-maroon/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all hover:scale-110"
                >
                  <Eye size={18} />
                </a>
                <a
                  href={item.url}
                  download={item.name}
                  className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all hover:scale-110"
                >
                  <Download size={18} />
                </a>
                <button
                  onClick={() => handleDelete(item)}
                  className="p-3 bg-red-500/20 hover:bg-red-500/40 text-white rounded-xl transition-all hover:scale-110"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-mda-maroon/5 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-mda-cream/30 border-b border-mda-maroon/5">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  File
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Type
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Size
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Date Added
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mda-maroon/5">
              {filteredMedia.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-mda-cream/10 transition-colors group"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-mda-cream border border-mda-maroon/5">
                        <img
                          src={item.url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-mda-maroon uppercase ">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
                    {item.type}
                  </td>
                  <td className="px-8 py-4 text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
                    {item.size}
                  </td>
                  <td className="px-8 py-4 text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
                    {item.date}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 hover:bg-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                      >
                        <Eye size={16} />
                      </a>
                      <a
                        href={item.url}
                        download={item.name}
                        className="p-2 hover:bg-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                      >
                        <Download size={16} />
                      </a>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 hover:bg-red-50 rounded-xl text-mda-maroon/40 hover:text-red-500 transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Media Upload Sheet Component */}
      <MediaUploadSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onUpload={handleUpload}
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

export default MediaManagement;

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserPlus,
} from "lucide-react";
import { type TeamMember } from "../../data/team";
import {
  listTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../services/team";
import AddMemberSheet from "../../components/admin/AddMemberSheet";
import EditMemberSheet from "../../components/admin/EditMemberSheet";

const ITEMS_PER_PAGE = 10;

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    listTeam()
      .then(setMembers)
      .catch((e) => setError(e.message ?? "Failed to load team members."))
      .finally(() => setLoading(false));
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleAddMember = async (member: TeamMember) => {
    const created = await createTeamMember(member);
    setMembers((prev) => [...prev, created]);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsEditSheetOpen(true);
  };

  const handleSaveMember = async (updated: TeamMember) => {
    const saved = await updateTeamMember(updated.id, updated);
    setMembers((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this team member? This cannot be undone."))
      return;
    await deleteTeamMember(id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="space-y-8 animate-reveal">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            TEAM <span className="text-mda-pink">DIRECTORY</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
            Manage and update the Mepe MDA executive team.
          </p>
        </div>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="bg-mda-maroon text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <UserPlus size={16} />
          Add New Member
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
            placeholder="Search members by name or role..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-mda-cream/30 border border-mda-maroon/5 text-mda-maroon px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-mda-cream transition-colors">
            <Filter size={14} />
            Filter
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-mda-maroon/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-mda-cream/30 border-b border-mda-maroon/5">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Member
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Role
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  ID
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mda-maroon/5">
              {loading && (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
                    Loading team members...
                  </td>
                </tr>
              )}
              {!loading && paginatedMembers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-8 py-16 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
                    No team members yet.
                  </td>
                </tr>
              )}
              {paginatedMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-mda-cream/10 transition-colors group"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-mda-cream border border-mda-maroon/5">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-mda-maroon/5 text-mda-maroon/20">
                            <Users size={20} />
                          </div>
                        )}
                      </div>
                      <span className="text-sm font-bold text-mda-maroon uppercase ">
                        {member.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="px-4 py-1.5 rounded-full bg-mda-maroon/5 text-[10px] font-bold text-mda-maroon/60 uppercase tracking-widest border border-mda-maroon/5">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-xs font-mono text-mda-maroon/30">
                    #{member.id.padStart(3, "0")}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => handleEditMember(member)}
                        className="p-2 hover:bg-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
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

        {/* Pagination */}
        <div className="p-8 border-t border-mda-maroon/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
            Showing{" "}
            <span className="text-mda-maroon">{startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredMembers.length)}</span> of{" "}
            <span className="text-mda-maroon">{filteredMembers.length}</span> members
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-3 bg-mda-cream/30 border border-mda-maroon/5 rounded-xl transition-colors ${
                currentPage === 1
                  ? "text-mda-maroon/20 cursor-not-allowed"
                  : "text-mda-maroon/40 hover:bg-mda-cream"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                    page === currentPage
                      ? "bg-mda-maroon text-white shadow-lg shadow-mda-maroon/10"
                      : "bg-mda-cream/30 border border-mda-maroon/5 text-mda-maroon/40 hover:bg-mda-cream"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-3 bg-mda-cream/30 border border-mda-maroon/5 rounded-xl transition-colors ${
                currentPage === totalPages
                  ? "text-mda-maroon/20 cursor-not-allowed"
                  : "text-mda-maroon/40 hover:bg-mda-cream"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Member Sheet Component */}
      <AddMemberSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAdd={handleAddMember}
        nextId={String(members.length + 1)}
      />

      {/* Edit Member Sheet Component */}
      <EditMemberSheet
        isOpen={isEditSheetOpen}
        onClose={() => { setIsEditSheetOpen(false); setEditingMember(null); }}
        onSave={handleSaveMember}
        member={editingMember}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `,
        }}
      />
    </div>
  );
};

export default TeamManagement;

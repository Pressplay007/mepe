import { useEffect, useState } from "react";
import {
  UserCog,
  Search,
  Filter,
  Edit2,
  Trash2,
  UserPlus,
  Shield,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";
import { type AdminData } from "../../components/admin/AddAdminSheet";
import EditAdminSheet from "../../components/admin/EditAdminSheet";
import { listAdmins, updateAdmin, deleteAdmin } from "../../services/admins";

const roleIcon = (role: AdminData["role"]) => {
  switch (role) {
    case "Super Admin":
      return <ShieldAlert size={14} />;
    case "Admin":
      return <ShieldCheck size={14} />;
    case "Moderator":
      return <Shield size={14} />;
  }
};

const roleBadgeStyle = (role: AdminData["role"]) => {
  switch (role) {
    case "Super Admin":
      return "bg-mda-pink/10 text-mda-pink border-mda-pink/20";
    case "Admin":
      return "bg-mda-maroon/10 text-mda-maroon border-mda-maroon/20";
    case "Moderator":
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
};

const AdminManagement = () => {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddInfo, setShowAddInfo] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminData | null>(null);

  const loadAdmins = () =>
    listAdmins()
      .then(setAdmins)
      .catch((e) => setError(e.message ?? "Failed to load administrators."))
      .finally(() => setLoading(false));

  useEffect(() => {
    loadAdmins();
  }, []);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEdit = (admin: AdminData) => {
    setEditingAdmin(admin);
    setIsEditSheetOpen(true);
  };

  const handleSave = async (updated: AdminData) => {
    const saved = await updateAdmin(updated.id, {
      name: updated.name,
      role: updated.role,
      status: updated.status,
    });
    setAdmins((prev) => prev.map((a) => (a.id === saved.id ? saved : a)));
    toast.success(`${saved.name} updated.`);
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Revoke this administrator's access? This cannot be undone.",
      )
    )
      return;
    try {
      await deleteAdmin(id);
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      toast.success("Administrator access revoked.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    }
  };

  return (
    <div className="space-y-8 animate-reveal">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            ADMIN <span className="text-mda-pink">MANAGEMENT</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
            Manage administrator accounts and permissions.
          </p>
        </div>
        <button
          onClick={() => setShowAddInfo((v) => !v)}
          className="bg-mda-maroon text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <UserPlus size={16} />
          Add Administrator
        </button>
      </div>

      {showAddInfo && (
        <div className="bg-mda-cream/40 border border-mda-maroon/10 rounded-[15px] px-6 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-mda-maroon mb-2">
            How to add an administrator
          </p>
          <p className="text-xs text-mda-maroon/60 leading-relaxed">
            New login accounts are created from your Supabase dashboard for
            security. Go to <span className="font-semibold">Authentication → Users → Add user</span>,
            enter their email and password (tick "Auto Confirm User"). They will
            appear here automatically. To change someone's role or deactivate
            them, use the edit and delete actions in the table below.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[15px] px-6 py-4">
          <p className="text-xs font-medium text-red-600">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Admins", value: admins.length, icon: UserCog },
          {
            label: "Active",
            value: admins.filter((a) => a.status === "Active").length,
            icon: ShieldCheck,
          },
          {
            label: "Super Admins",
            value: admins.filter((a) => a.role === "Super Admin").length,
            icon: ShieldAlert,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40">
                  {stat.label}
                </p>
                <p className="text-3xl font-display text-mda-maroon mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-mda-cream/50 border border-mda-maroon/5 flex items-center justify-center text-mda-maroon/30">
                <stat.icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/20"
            size={18}
          />
          <input
            type="text"
            placeholder="Search administrators by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Table */}
      <div className="bg-white rounded-3xl border border-mda-maroon/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-mda-cream/30 border-b border-mda-maroon/5">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Administrator
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Email
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Role
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Last Login
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mda-maroon/5">
              {loading && (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
                    Loading administrators...
                  </td>
                </tr>
              )}
              {!loading && filteredAdmins.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-16 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
                    No administrators found.
                  </td>
                </tr>
              )}
              {filteredAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className="hover:bg-mda-cream/10 transition-colors group"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-mda-maroon/5 border border-mda-maroon/5 flex items-center justify-center text-mda-maroon/30 font-display text-sm">
                        {admin.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-mda-maroon uppercase">
                        {admin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-xs text-mda-maroon/60">
                    {admin.email}
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${roleBadgeStyle(admin.role)}`}
                    >
                      {roleIcon(admin.role)}
                      {admin.role}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                        admin.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-gray-50 text-gray-400 border-gray-200"
                      }`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-xs font-mono text-mda-maroon/30">
                    {admin.lastLogin}
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="p-2 hover:bg-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
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
      </div>

      {/* Edit Admin Sheet */}
      <EditAdminSheet
        isOpen={isEditSheetOpen}
        onClose={() => {
          setIsEditSheetOpen(false);
          setEditingAdmin(null);
        }}
        onSave={handleSave}
        admin={editingAdmin}
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

export default AdminManagement;

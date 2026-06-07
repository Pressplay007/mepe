import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  User,
  Wallet,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import { type Project } from "../../data/projects";
import {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projects";
import AddProjectSheet from "../../components/admin/AddProjectSheet";
import EditProjectSheet from "../../components/admin/EditProjectSheet";
import { useConfirm } from "../../components/common/ConfirmDialog";

const ProjectsManagement = () => {
  const confirm = useConfirm();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch((e) => setError(e.message ?? "Failed to load projects."))
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddProject = async (project: Project) => {
    const created = await createProject(project);
    setProjects((prev) => [created, ...prev]);
    toast.success(`"${created.title}" added.`);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditSheetOpen(true);
  };

  const handleSaveProject = async (updated: Project) => {
    const saved = await updateProject(updated.id, updated);
    setProjects((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
    toast.success(`"${saved.title}" updated.`);
  };

  const handleDeleteProject = async (id: string) => {
    const ok = await confirm({
      title: "Delete project",
      description: "This will permanently remove the project. This cannot be undone.",
      confirmText: "Delete",
    });
    if (!ok) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      toast.success("Project deleted.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "In Progress":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "Completed":
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "Planned":
        return "text-mda-maroon/40 bg-mda-maroon/5 border-mda-maroon/5";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="space-y-8 animate-reveal">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            PROJECT <span className="text-mda-pink">TRACKING</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
            Monitor development progress and budgets.
          </p>
        </div>
        <button
          onClick={() => setIsSheetOpen(true)}
          className="bg-mda-maroon text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus size={16} />
          New Project
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
            placeholder="Search projects by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-4 pl-12 pr-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-mda-cream/30 border border-mda-maroon/5 text-mda-maroon px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-mda-cream transition-colors">
            <Filter size={14} />
            Filter
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-[15px] border border-mda-maroon/5 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-mda-cream/30 border-b border-mda-maroon/5">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Project Details
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Progress
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Lead
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40">
                  Budget
                </th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mda-maroon/5">
              {loading && (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
                    Loading projects...
                  </td>
                </tr>
              )}
              {!loading && filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-16 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
                    No projects yet.
                  </td>
                </tr>
              )}
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-mda-cream/10 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="min-w-[240px]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-mda-pink">
                          {project.category}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border ${getStatusStyle(project.status)}`}
                        >
                          {project.status}
                        </span>
                      </div>
              <h3 className="text-2xl font-display text-mda-maroon uppercase leading-tight mb-2 ">
                        {project.title}
                      </h3>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="min-w-[140px]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-mda-cream rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-1000 ${project.progress === 100 ? "bg-emerald-500" : "bg-mda-pink"}`}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-mda-maroon/60">
                      <User size={14} className="text-mda-maroon/20" />
                      <span className="text-xs font-medium">
                        {project.lead}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-mda-maroon/60">
                      <Wallet size={14} className="text-mda-maroon/20" />
                      <span className="text-xs font-bold uppercase  text-mda-maroon">
                        {project.budget || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="p-2 hover:bg-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
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

      {/* Add Project Sheet Component */}
      <AddProjectSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAdd={handleAddProject}
        nextId={String(projects.length + 1)}
      />

      {/* Edit Project Sheet Component */}
      <EditProjectSheet
        isOpen={isEditSheetOpen}
        onClose={() => { setIsEditSheetOpen(false); setEditingProject(null); }}
        onSave={handleSaveProject}
        project={editingProject}
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

export default ProjectsManagement;

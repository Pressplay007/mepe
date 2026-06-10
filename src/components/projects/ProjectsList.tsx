import { useEffect, useMemo, useState } from "react";
import {
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  User,
  Wallet,
  FolderKanban,
} from "lucide-react";
import type { Project } from "../../data/projects";
import { listProjects } from "../../services/projects";

const STATUSES: Project["status"][] = ["In Progress", "Planned", "Completed"];
const PAGE_SIZE = 8;

type ViewMode = "grid" | "list";

interface ProjectsListProps {
  showHeading?: boolean;
}

const statusDot = (status: Project["status"]) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-500";
    case "Planned":
      return "bg-amber-400";
    default:
      return "bg-mda-pink";
  }
};

const ProgressBar = ({ value }: { value: number }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40">
      <span>Progress</span>
      <span className="text-mda-maroon">{value}%</span>
    </div>
    <div className="w-full h-1.5 bg-mda-cream rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-mda-pink to-mda-maroon rounded-full transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

const ProjectCard = ({
  project,
  view,
}: {
  project: Project;
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
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-mda-maroon/5">
          <FolderKanban className="w-10 h-10 text-mda-maroon/15" />
        </div>
      )}
      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/45 backdrop-blur-sm text-white text-[11px] font-medium">
        {project.category}
      </span>
      <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-mda-maroon text-[11px] font-semibold shadow-sm">
        <span
          className={`w-1.5 h-1.5 rounded-full ${statusDot(project.status)}`}
        />
        {project.status}
      </span>
    </div>
  );

  const body = (
    <div
      className={`flex flex-col ${view === "grid" ? "p-4 md:p-5 gap-3" : "p-5 md:p-6 flex-1 min-w-0 gap-4"}`}
    >
      <h3
        className={`font-bold text-mda-maroon leading-snug group-hover:text-mda-pink transition-colors ${
          view === "grid" ? "text-base md:text-lg line-clamp-2" : "text-xl md:text-2xl"
        }`}
      >
        {project.title}
      </h3>

      {project.description && view === "list" && (
        <p className="text-sm text-mda-maroon/55 leading-relaxed line-clamp-2">
          {project.description}
        </p>
      )}

      <ProgressBar value={project.progress} />

      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-mda-maroon/45">
        {project.lead && (
          <span className="inline-flex items-center gap-1.5">
            <User size={12} className="text-mda-maroon/30" />
            {project.lead}
          </span>
        )}
        {project.budget && (
          <span className="inline-flex items-center gap-1.5">
            <Wallet size={12} className="text-mda-maroon/30" />
            {project.budget}
          </span>
        )}
      </div>
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

const ProjectsList = ({ showHeading = true }: ProjectsListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Project["status"]>("In Progress");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const fromData = [...new Set(projects.map((p) => p.category))].filter(Boolean);
    return ["All", ...fromData.sort()];
  }, [projects]);

  const counts = useMemo(
    () =>
      STATUSES.reduce(
        (acc, s) => {
          acc[s] = projects.filter((p) => p.status === s).length;
          return acc;
        },
        {} as Record<Project["status"], number>,
      ),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((project) => {
      if (project.status !== activeTab) return false;
      if (category !== "All" && project.category !== category) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.lead.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q)
      );
    });
  }, [projects, activeTab, category, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  useEffect(() => {
    setPage(1);
  }, [activeTab, category, search]);

  return (
    <div>
      {showHeading && (
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-block px-4 py-1.5 bg-mda-maroon/5 border border-mda-maroon/10 rounded-full mb-4">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-mda-maroon uppercase">
              Visionary Growth
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display text-mda-maroon leading-none">
            OUR PROJECTS
          </h2>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-mda-maroon/5 shadow-sm p-3 md:p-4 mb-8 flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex flex-wrap gap-2 shrink-0">
            {STATUSES.map((tab) => (
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

          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-mda-maroon/30"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-mda-cream/50 border border-mda-maroon/5 text-sm text-mda-maroon placeholder:text-mda-maroon/30 focus:outline-none focus:border-mda-pink/40 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-mda-cream/50 border border-mda-maroon/5 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink/40 cursor-pointer"
            >
              {categories.map((cat) => (
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
            {paginated.map((project) => (
              <ProjectCard key={project.id} project={project} view={view} />
            ))}
          </div>

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
          <FolderKanban className="w-12 h-12 text-mda-maroon/15 mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-display text-mda-maroon uppercase mb-2">
            {projects.length === 0
              ? "No projects yet"
              : `No ${activeTab.toLowerCase()} projects found`}
          </h3>
          <p className="text-sm text-mda-maroon/40 max-w-md mx-auto">
            {search || category !== "All"
              ? "Try adjusting your search or filters."
              : "Development projects will appear here once they are added."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsList;

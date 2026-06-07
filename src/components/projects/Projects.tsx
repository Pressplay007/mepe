import { useEffect, useState } from "react";
import {
  Droplets,
  Laptop,
  BookOpen,
  Landmark,
  Store,
  Compass,
} from "lucide-react";
import type { Project } from "../../data/projects";
import { listProjects } from "../../services/projects";

const iconForCategory = (category: string) => {
  const c = category.toLowerCase();
  if (c.includes("water") || c.includes("agri")) return Droplets;
  if (c.includes("edu")) return BookOpen;
  if (c.includes("infra")) return Landmark;
  if (c.includes("econ") || c.includes("business") || c.includes("trade"))
    return Store;
  if (c.includes("youth") || c.includes("skill") || c.includes("tech"))
    return Laptop;
  return Compass;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.slice(0, 6);

  return (
    <section className="py-16 md:py-32 premium-gradient text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-mda-pink/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-mda-pink/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12 md:mb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12 relative z-10">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
            Visionary Growth
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-display leading-[0.9] lg:leading-[0.8] er uppercase whitespace-pre-line">
            FEATURED <br />
            <span className="text-mda-pink italic font-serif normal-case text-glow">
              Projects
            </span>
          </h2>
          <p className="font-body text-lg md:text-xl text-white/40 leading-relaxed max-w-lg">
            Strategically investing in sustainable development to secure the
            prosperity of the Mepe Traditional Area.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 relative z-10">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      ) : featured.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {featured.map((project) => {
            const Icon = iconForCategory(project.category);
            return (
              <div key={project.id} className="group relative">
                <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 h-full border-white/5 hover:border-white/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
                  <div className="aspect-[14/9] rounded-[1.5rem] md:rounded-[2.2rem] overflow-hidden relative mb-6 md:mb-8 bg-mda-maroon/40 flex items-center justify-center">
                    <Icon className="w-12 h-12 text-white/20" />
                    <div className="absolute top-4 md:top-6 left-4 md:left-6 flex flex-wrap gap-2">
                      <span className="glass-card text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-bold tracking-widest uppercase backdrop-blur-md border-white/20">
                        {project.category}
                      </span>
                      <div className="bg-mda-pink text-white px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5 md:gap-2 shadow-lg shadow-mda-pink/30">
                        <Icon className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {project.status}
                      </div>
                    </div>
                  </div>

                  <div className="px-2 md:px-4 pb-4 space-y-4 md:space-y-6">
                    <h3 className="text-3xl md:text-4xl font-display leading-tight uppercase group-hover:text-mda-pink transition-colors">
                      {project.title}
                    </h3>

                    <div className="space-y-3 md:space-y-4">
                      <div className="flex justify-between items-center text-[8px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
                        <span>Maturity</span>
                        <span className="text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[2px]">
                        <div
                          className="h-full bg-gradient-to-r from-mda-pink to-white rounded-full transition-all duration-[1.5s] relative"
                          style={{ width: `${project.progress}%` }}
                        >
                          <div className="absolute inset-x-0 inset-y-0 shadow-[0_0_15px_rgba(244,114,182,0.8)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="glass-card rounded-[2rem] p-12 md:p-24 text-center border-white/10">
            <h3 className="text-2xl md:text-4xl font-display uppercase mb-4 italic">
              No projects available
            </h3>
            <p className="font-body text-white/40 tracking-widest uppercase text-[10px] md:text-xs font-bold">
              Development projects will appear here once they are published.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;

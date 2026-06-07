import { useEffect, useState } from "react";
import {
  ArrowRight,
  Droplets,
  Laptop,
  BookOpen,
  Landmark,
  Store,
  Compass,
} from "lucide-react";
import { projects as fallbackProjects, type Project } from "../../data/projects";
import { listProjects } from "../../services/projects";

const cardImages = [
  new URL(
    "../../assets/gallery/455991774_18061206271720953_6194218305811081143_n.jpg",
    import.meta.url,
  ).href,
  new URL(
    "../../assets/gallery/524445973_1341760967957245_7840297303174955587_n.jpg",
    import.meta.url,
  ).href,
  new URL(
    "../../assets/gallery/456184220_18061206241720953_5588583274442341449_n.jpg",
    import.meta.url,
  ).href,
  new URL(
    "../../assets/gallery/456132438_18061206193720953_3368855995947669246_n.jpg",
    import.meta.url,
  ).href,
  new URL(
    "../../assets/gallery/456314736_18061206244720953_3574851341763144433_n.jpg",
    import.meta.url,
  ).href,
  new URL(
    "../../assets/gallery/505730882_1301467045319971_4163705806737903282_n.jpg",
    import.meta.url,
  ).href,
];

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
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    listProjects()
      .then((data) => {
        if (data.length > 0) setProjects(data);
      })
      .catch(() => {
        // Keep the static fallback if the backend is unavailable.
      });
  }, []);

  const featured = projects.slice(0, 6);

  return (
    <section className="py-16 md:py-32 premium-gradient text-white relative overflow-hidden">
      {/* Mesh Glows */}
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
          <p className="font-body text-lg md:text-xl text-white/40  leading-relaxed max-w-lg">
            Strategically investing in sustainable development to secure the
            prosperity of the Mepe Traditional Area.
          </p>
        </div>

        <button className="glass-card text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs hover:bg-white hover:text-mda-maroon transition-all shrink-0 flex items-center gap-3 border-white/10 group active:scale-95 w-fit">
          View Portfolio
          <ArrowRight className="w-4 h-4 md:w-[18px] md:h-[18px] transition-transform group-hover:translate-x-2" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
        {featured.map((project, index) => {
          const Icon = iconForCategory(project.category);
          return (
          <div key={project.id} className="group relative">
            {/* Project Card */}
            <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-3 md:p-4 h-full border-white/5 hover:border-white/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)]">
              <div className="aspect-[14/9] rounded-[1.5rem] md:rounded-[2.2rem] overflow-hidden relative mb-6 md:mb-8">
                <img
                  src={cardImages[index % cardImages.length]}
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
                  alt={project.title}
                />

                {/* Status Tags */}
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
                <h3 className="text-3xl md:text-4xl font-display leading-tight uppercase  group-hover:text-mda-pink transition-colors">
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

                <div className="pt-2 md:pt-4 flex items-center justify-between">
                  <span className="text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">
                    Alpha V.1
                  </span>
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-lg md:rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:text-mda-pink transition-colors cursor-pointer group-hover:border-white/10 border border-transparent">
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;

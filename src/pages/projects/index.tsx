import SEO from "../../components/common/SEO";
import ProjectsList from "../../components/projects/ProjectsList";

const ProjectsPage = () => {
  return (
    <>
      <SEO
        title="Development Projects | Mepe Development Association"
        description="Explore ongoing and completed development projects by the MDA — infrastructure, education, agriculture, and community initiatives in Mepe."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero */}
        <section className="relative py-20 md:py-40 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[60vh] flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -left-[10%] w-[300px] md:w-[60%] h-[300px] md:h-[60%] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[250px] md:w-[50%] h-[250px] md:h-[50%] bg-mda-pink/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse delay-700" />
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
            <div className="max-w-4xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-mda-pink animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                  Strategic Impact
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-display text-white leading-[0.9] lg:leading-[0.85] mb-6 md:mb-8 uppercase">
                Community <br />
                <span className="text-mda-pink italic font-serif lowercase">
                  Vision
                </span>
              </h1>
              <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mx-auto md:mx-0">
                Building a stronger and more prosperous Mepe through education,
                economic development, and infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Projects from admin */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-[#f6f4f1]">
          <div className="max-w-7xl mx-auto">
            <ProjectsList showHeading={false} />
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;

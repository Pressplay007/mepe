import ProjectsList from "./ProjectsList";

const Projects = () => {
  return (
    <section className="py-16 md:py-24 bg-white min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <ProjectsList showHeading />
      </div>
    </section>
  );
};

export default Projects;

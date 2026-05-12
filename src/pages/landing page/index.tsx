import Hero from "../../components/hero/Hero";
import SEO from "../../components/common/SEO";
import ChairmanWelcome from "../../components/chairman/ChairmanWelcome";
import History from "../../components/history/History";
import Events from "../../components/events/Events";
import Projects from "../../components/projects/Projects";
import News from "../../components/news/News";
import Team from "../../components/team";
import FinalCTA from "../../components/cta/FinalCTA";

const LandingPage = () => {
  return (
    <>
      <SEO
        title="Mepe Development Association | Official Website"
        description="Welcome to the official website of the Mepe Development Association. Discover our rich culture, development projects, and community initiatives in the Mepe Traditional Area."
      />
      <div className="bg-mda-cream min-h-screen">
        <Hero />
        <ChairmanWelcome />
        <History />
        <Events />
        <Projects />
        <News />
        <Team />
        <FinalCTA />
      </div>
    </>
  );
};

export default LandingPage;

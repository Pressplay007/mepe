import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing page";
import AboutPage from "../pages/about";
import CulturePage from "../pages/culture";
import ProjectsPage from "../pages/projects";
import EventsPage from "../pages/events";
import ContactPage from "../pages/contact";
import YouthPage from "../pages/youth";
import ApplyGrantPage from "../pages/youth/ApplyGrantPage";
import VisitMepePage from "../pages/visit mepe";
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";
import GalleryPage from "../pages/gallery";
import AnnouncementsPage from "../pages/announcements";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/culture" element={<CulturePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/youth" element={<YouthPage />} />
      <Route path="/youth/apply-grant" element={<ApplyGrantPage />} />
      <Route path="/visit-mepe" element={<VisitMepePage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
    </Routes>
  );
};

export default MainRoutes;

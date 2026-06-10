import { Routes, Route, Navigate } from "react-router-dom";
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
import ArticlesPage from "../pages/articles";
import ArticleDetailPage from "../pages/articles/ArticleDetailPage";

// Admin Imports
import AdminLayout from "../layouts/admin/AdminLayout";
import LoginPage from "../pages/admin/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import TeamManagement from "../pages/admin/TeamManagement";
import AnnouncementsManagement from "../pages/admin/AnnouncementsManagement";
import ArticlesManagement from "../pages/admin/ArticlesManagement";
import AddArticlePage from "../pages/admin/AddArticlePage";
import EditArticlePage from "../pages/admin/EditArticlePage";
import EventsManagement from "../pages/admin/EventsManagement";
import ProjectsManagement from "../pages/admin/ProjectsManagement";
import MediaManagement from "../pages/admin/MediaManagement";
import AdminManagement from "../pages/admin/AdminManagement";
import SettingsPage from "../pages/admin/SettingsPage";
import AuthGuard from "../components/admin/AuthGuard";
import SuperAdminGuard from "../components/admin/SuperAdminGuard";

const MainRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
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
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articles/:slug" element={<ArticleDetailPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<LoginPage />} />
      <Route element={<AuthGuard />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/team" element={<TeamManagement />} />
          <Route path="/admin/announcements" element={<AnnouncementsManagement />} />
          <Route path="/admin/articles" element={<ArticlesManagement />} />
          <Route path="/admin/articles/new" element={<AddArticlePage />} />
          <Route path="/admin/articles/:id/edit" element={<EditArticlePage />} />
          <Route path="/admin/events" element={<EventsManagement />} />
          <Route path="/admin/projects" element={<ProjectsManagement />} />
          <Route path="/admin/media" element={<MediaManagement />} />
          <Route element={<SuperAdminGuard />}>
            <Route
              path="/admin/administrators"
              element={<AdminManagement />}
            />
          </Route>
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      {/* Catch-all - Redirect admin root to dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default MainRoutes;

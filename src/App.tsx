import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer";
import MainRoutes from "./routes/main-routes";
import ScrollToTop from "./components/common/ScrollToTop";
import AnnouncementPopup from "./components/announcements/AnnouncementPopup";
import { ConfirmProvider } from "./components/common/ConfirmDialog";

const AppContent = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPath && <Navbar />}
      <main className="flex-grow">
        <MainRoutes />
      </main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <AnnouncementPopup />}
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <ConfirmProvider>
          <AppContent />
        </ConfirmProvider>
        <Toaster richColors position="top-right" closeButton />
      </Router>
    </HelmetProvider>
  );
}

export default App;

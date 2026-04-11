import { useState } from "react";
import {
  Heart,
  Menu,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "About", path: "/about" },
    { name: "Culture", path: "/culture" },
    { name: "Projects", path: "/projects" },
    { name: "Gallery", path: "/gallery" },
    { name: "Visit Mepe", path: "/visit-mepe" },
    { name: "Events", path: "/events" },
    { name: "Youth", path: "/youth" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`w-full py-6 sticky top-0 transition-all duration-500 ${isMenuOpen ? "bg-mda-maroon z-[120]" : "glass-nav z-50"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 font-bold text-2xl text-mda-maroon hover:opacity-80 transition-all relative z-[60] hover:scale-105 active:scale-95"
            onClick={() => setIsMenuOpen(false)}
          >
              <img
                src="/logo-n.png"
                alt="Mepe MDA Logo" 
                className="w-28 h-28 object-contain drop-shadow-md transition-all"
              />
          </Link>
 
          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-10 items-center">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name} className="group relative">
                  <Link
                    to={link.path}
                    className={`text-[0.65rem] font-bold uppercase flex items-center gap-1 transition-all duration-300 tracking-[0.2em] ${
                      isActive
                        ? "text-mda-maroon scale-110"
                        : "text-mda-dark/40 group-hover:text-mda-maroon group-hover:translate-y-[-2px]"
                    }`}
                  >
                    {link.name}
                  </Link>
                  <div
                    className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 bg-mda-pink rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(244,114,182,0.5)] ${
                      isActive
                        ? "w-4 opacity-100"
                        : "w-0 opacity-0 group-hover:w-2 group-hover:opacity-100"
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="premium-gradient text-white px-10 py-4 rounded-2xl font-bold tracking-[0.2em] text-[10px] uppercase hover:shadow-[0_20px_40px_-10px_rgba(93,26,26,0.3)] transform hover:-translate-y-1 active:scale-95 transition-all flex items-center gap-3 border border-white/10">
              <Heart
                size={14}
                fill="currentColor"
                className="text-mda-pink animate-pulse"
              />
              Donate
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-[110] w-12 h-12 flex items-center justify-center bg-mda-maroon text-white rounded-2xl shadow-lg shadow-mda-maroon/20 transition-transform active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Moved outside of nav to avoid containing block issues */}
      <div
        className={`fixed inset-0 bg-mda-maroon z-[100] transition-all duration-700 ease-in-out lg:hidden h-screen w-screen overflow-hidden ${
          isMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="h-full flex flex-col justify-center items-center p-8 space-y-12">
          {/* Logo at center top of menu */}
          <div
            className={`transition-all duration-1000 delay-300 ${isMenuOpen ? "opacity-20 scale-100" : "opacity-0 scale-90"}`}
          >
            <img
              src="/logo-n.png"
              alt=""
              className="w-32 brightness-0 opacity-50"
              loading="lazy"
            />
          </div>

          <ul className="space-y-4 text-center">
            {links.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <li
                  key={link.name}
                  className={`transform transition-all duration-700 ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-12 opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 70 + 200}ms` }}
                >
                  <Link
                    to={link.path}
                    className={`text-4xl xs:text-5xl font-display uppercase transition-all tracking-tight block py-1 ${
                      isActive
                        ? "text-mda-pink scale-110"
                        : "text-white/40 hover:text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={`w-full max-w-xs space-y-6 transform transition-all duration-700 delay-700 ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <button className="w-full bg-mda-pink text-mda-maroon py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-4 text-sm shadow-xl shadow-mda-pink/10">
              <Heart size={20} fill="currentColor" />
              Support Mepe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

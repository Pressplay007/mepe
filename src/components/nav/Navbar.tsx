import { useState, useEffect } from "react";
import {
  Heart,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navGroups = [
    {
      name: "The MDA",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Culture", path: "/culture" },
      ]
    },
    {
      name: "Community",
      links: [
        { name: "Projects", path: "/projects" },
        { name: "Youth", path: "/youth" },
        { name: "Events", path: "/events" },
      ]
    },
    {
      name: "News & Media",
      links: [
        { name: "Announcements", path: "/announcements" },
        { name: "Articles", path: "/articles" },
        { name: "Gallery", path: "/gallery" },
      ]
    },
    { name: "Visit Mepe", path: "/visit-mepe" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav
        className={`w-full py-4 sticky top-0 transition-all duration-500 bg-mda-cream/90 backdrop-blur-md border-b border-mda-maroon/5 ${isMenuOpen ? "z-[120]" : "z-[100]"}`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 font-bold text-2xl text-mda-maroon hover:opacity-80 transition-all relative z-[110] hover:scale-105 active:scale-95"
          >
              <img
                src="/logo-n.png"
                alt="Mepe MDA Logo" 
                className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-sm transition-all"
              />
          </Link>
 
          {/* Desktop Links */}
          <ul className="hidden lg:flex gap-8 items-center">
            {navGroups.map((group) => {
              if (group.links) {
                const isGroupActive = group.links.some(l => location.pathname === l.path);
                return (
                  <li 
                    key={group.name} 
                    className="relative group py-4"
                    onMouseEnter={() => setActiveDropdown(group.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={`text-[0.65rem] font-bold uppercase flex items-center gap-1 transition-all duration-300 tracking-[0.2em] ${
                        isGroupActive ? "text-mda-maroon" : "text-mda-dark/50 group-hover:text-mda-maroon"
                      }`}
                    >
                      {group.name}
                      <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === group.name ? "rotate-180" : ""}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                      activeDropdown === group.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                    }`}>
                      <div className="bg-white shadow-2xl shadow-mda-maroon/10 border border-mda-maroon/5 min-w-[200px] p-2 rounded-xl">
                        {group.links.map(link => (
                          <Link
                            key={link.name}
                            to={link.path}
                            className={`block px-4 py-3 text-[0.6rem] font-bold uppercase tracking-widest rounded-lg transition-colors ${
                              location.pathname === link.path ? "bg-mda-maroon text-white" : "text-mda-maroon/70 hover:bg-mda-maroon/5 hover:text-mda-maroon"
                            }`}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }

              const isActive = location.pathname === group.path;
              return (
                <li key={group.name} className="group relative">
                  <Link
                    to={group.path!}
                    className={`text-[0.65rem] font-bold uppercase transition-all duration-300 tracking-[0.2em] ${
                      isActive ? "text-mda-maroon" : "text-mda-dark/50 group-hover:text-mda-maroon"
                    }`}
                  >
                    {group.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="premium-gradient text-white px-8 py-3 rounded-xl font-bold tracking-[0.2em] text-[9px] uppercase hover:shadow-xl hover:shadow-mda-maroon/20 transform hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-3 border border-white/10">
              <Heart size={14} fill="currentColor" className="text-mda-pink" />
              Donate
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-[130] w-12 h-12 flex items-center justify-center text-mda-maroon  shadow-lg transition-transform active:scale-95"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-mda-maroon z-[100] transition-all duration-700 ease-in-out lg:hidden h-screen w-screen overflow-y-auto ${
          isMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="min-h-full flex flex-col items-center p-8 pt-32 pb-12 space-y-12">
          <ul className="w-full max-w-sm space-y-6">
            {navGroups.map((group, i) => {
              if (group.links) {
                return (
                  <li 
                    key={group.name} 
                    className={`space-y-4 transform transition-all duration-700 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                    style={{ transitionDelay: `${i * 100 + 400}ms` }}
                  >
                    <div className="text-mda-pink/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 pl-1 border-l border-mda-pink/20">{group.name}</div>
                    <div className="grid grid-cols-1 gap-3">
                      {group.links.map(link => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`text-4xl font-display block transition-all hover:pl-2 ${
                            location.pathname === link.path ? "text-mda-pink" : "text-white/80 hover:text-white"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              }
              return (
                <li 
                  key={group.name}
                  className={`transform transition-all duration-700 ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                  style={{ transitionDelay: `${i * 100 + 400}ms` }}
                >
                  <Link
                    to={group.path!}
                    className={`text-5xl font-display block transition-all ${
                      location.pathname === group.path ? "text-mda-pink" : "text-white/90 hover:text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {group.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button className="w-full max-w-sm bg-mda-pink text-mda-maroon py-5 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-4 text-sm shadow-2xl shadow-mda-pink/20">
            <Heart size={20} fill="currentColor" />
            Support Mepe
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

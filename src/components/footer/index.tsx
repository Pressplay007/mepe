import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative premium-gradient text-mda-cream pt-32 pb-12 overflow-hidden">
      {/* Background Mesh Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mda-pink/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-mda-pink/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 relative z-10">
        {/* Brand Column */}
        <div className="space-y-10">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:scale-105 transition-transform duration-500">
              <img
                src="/logo-new.png"
                alt="Mepe MDA Logo"
                className="w-14 h-14 object-contain "
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-tighter">
                MEPE
              </span>
              <span className="text-mda-pink text-[10px] font-bold tracking-[0.3em] uppercase">
                Development Assoc.
              </span>
            </div>
          </Link>
          <p className="text-white/40 leading-relaxed font-body text-base max-w-sm">
            Dedicated to the visionary development and cultural preservation of
            the Mepe Traditional Area. Building a resilient future together.
          </p>
          <div className="flex items-center gap-4">
            {[
              { Icon: Facebook, link: "#" },
              { Icon: Twitter, link: "#" },
              { Icon: Instagram, link: "#" },
              { Icon: Linkedin, link: "#" },
            ].map(({ Icon, link }, index) => (
              <a
                key={index}
                href={link}
                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-mda-pink hover:text-mda-maroon transition-all group animate-float"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Icon
                  size={20}
                  className="transition-transform group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:pl-10">
          <h4 className="text-sm font-bold mb-10 tracking-[0.3em] text-mda-pink uppercase border-b border-mda-pink/20 pb-4 inline-block">
            NAVIGATION
          </h4>
          <ul className="space-y-5 font-body text-sm text-white/50">
            {[
              { label: "About Mepe", path: "/about" },
              { label: "Development Projects", path: "/projects" },
              { label: "Culture & Heritage", path: "/culture" },
              { label: "Upcoming Events", path: "/events" },
              { label: "Community Gallery", path: "/gallery" },
              { label: "Visit Mepe", path: "/visit-mepe" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="hover:text-mda-pink hover:translate-x-2 transition-all flex items-center gap-2 group"
                >
                  <span className="w-0 h-[1px] bg-mda-pink group-hover:w-4 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-sm font-bold mb-10 tracking-[0.3em] text-mda-pink uppercase border-b border-mda-pink/20 pb-4 inline-block">
            CONNECT
          </h4>
          <ul className="space-y-8 font-body text-sm text-white/50">
            <li className="flex gap-5">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-mda-pink" />
              </div>
              <span className="leading-relaxed">
                Main Road, Mepe Traditional Area,
                <br />
                North Tongu District, VR, Ghana
              </span>
            </li>
            <li className="flex gap-5 items-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-mda-pink" />
              </div>
              <a
                href="mailto:info@mdagh.org"
                className="hover:text-mda-pink transition-colors"
              >
                info@mdagh.org
              </a>
            </li>
            <li className="flex gap-5 items-center">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-mda-pink" />
              </div>
              <span className="text-white/80">+233 (0) 123 456 789</span>
            </li>
          </ul>
        </div>

        {/* Newsletter CTA */}
        <div className="p-10 rounded-[3rem] h-fit relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-mda-pink/10 rounded-full blur-2xl -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700" />

          <h4 className="text-lg font-display mb-4 tracking-widest text-white uppercase">
            Stay Informed
          </h4>
          <p className="text-xs text-white/40 mb-8 font-body leading-relaxed">
            Join 500+ citizens receiving the latest developmental updates and
            cultural news.
          </p>
          <form className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm focus:outline-none focus:border-mda-pink transition-all pr-14 placeholder:text-white/20"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-mda-pink text-mda-maroon px-4 rounded-xl hover:shadow-[0_0_15px_rgba(244,114,182,0.4)] transition-all active:scale-95">
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 pt-12 border-t border-white/50 flex flex-col lg:flex-row justify-between items-center gap-8 relative z-10">
        <div className="text-[12px] font-bold text-white/100 uppercase font-body text-center lg:text-left">
          &copy; {currentYear} MEPE DEVELOPMENT ASSOCIATION.{" "}
        </div>

        <div className="flex flex-wrap justify-center gap-10 text-[12px] text-white/100 font-body">
          <Link
            to="/privacy-policy"
            className="hover:text-mda-pink transition-colors"
          >
            Legal Protocol
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:text-mda-pink transition-colors"
          >
            User Terms
          </Link>
          <a
            href="https://cybasegh.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            Designed & Developed by{" "}
            <span className="text-white/400 group-hover:text-mda-pink transition-colors font-bold">
              CYBASE GHANA
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

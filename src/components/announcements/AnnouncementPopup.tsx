import { useState, useEffect } from 'react';
import { X, ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Announcement } from '../../data/announcements';
import {
  getLatestPublishedAnnouncement,
  listAnnouncements,
} from "../../services/announcements";

const AnnouncementPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [latest, setLatest] = useState<Announcement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    listAnnouncements()
      .then((data) => {
        const announcement = getLatestPublishedAnnouncement(data);
        if (announcement) {
          setLatest(announcement);
          timer = setTimeout(() => setIsVisible(true), 2000);
        }
      })
      .catch(() => setLatest(null))
      .finally(() => setLoaded(true));

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => setIsDismissed(true), 500);
  };

  if (!loaded || !latest || isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:bottom-8 md:right-8 md:left-auto md:w-[480px] z-[200] transition-all duration-700 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row border border-mda-maroon/5 relative rounded-sm">
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md md:bg-transparent rounded-full text-mda-maroon/60 hover:text-mda-maroon z-20 transition-colors shadow-sm md:shadow-none"
        >
          <X size={18} />
        </button>

        <div className="w-full h-32 md:h-auto md:w-2/5 bg-mda-maroon p-6 md:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-white m-2"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-white rounded-full"></div>
          </div>
          
          <div className="relative z-10">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-mda-pink/20 flex items-center justify-center mb-3">
                <Bell size={16} className="text-mda-pink animate-pulse" />
             </div>
             <p className="text-[8px] md:text-[10px] font-bold text-mda-pink uppercase tracking-[0.3em] mb-1 md:mb-2">Notice</p>
             <h3 className="text-xl md:text-2xl font-display text-white leading-tight uppercase">
               {latest.category}
             </h3>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
          <div className="inline-block px-2 py-0.5 bg-mda-maroon/5 text-mda-maroon text-[8px] font-bold uppercase tracking-widest mb-3">
            {latest.date}
          </div>
          <h4 className="text-lg md:text-xl font-display text-mda-maroon mb-2 leading-tight uppercase line-clamp-2">
            {latest.title}
          </h4>
          <p className="text-[10px] md:text-xs font-body text-mda-maroon/60 mb-5 leading-relaxed line-clamp-3">
            {latest.summary}
          </p>

          <Link 
            to="/announcements" 
            onClick={handleDismiss}
            className="group flex items-center justify-between bg-mda-maroon text-white px-5 py-3 text-[9px] font-bold uppercase tracking-widest hover:bg-mda-pink transition-all"
          >
            Read Full Details
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementPopup;

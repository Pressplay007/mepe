

import bismarkImg from '../../assets/team/bismark.jpg';
import michaelImg from '../../assets/team/michael.jpg';
import haygoodImg from '../../assets/team/haygood.jpg';
import eyraImg from '../../assets/team/eyra.jpg';
import christianaImg from '../../assets/team/christiana.jpg';
import annaImg from '../../assets/team/anna-enyonam.jpg';
import dzidonuImg from '../../assets/team/dzidonu.jpg';
import barnabasImg from '../../assets/team/barnabas.jpg';
import comfortImg from '../../assets/team/comfort.jpg';
import elizabethImg from '../../assets/team/elizabeth.jpg';
import francisImg from '../../assets/team/francis.jpg';
import sammyImg from '../../assets/team/sammy.jpg';
import evelynImg from '../../assets/team/evelyn.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: "Bismark Fiifi Tetteh",
      role: "Chairman",
      image: bismarkImg,
    },
    {
      name: "Michael Fosu",
      role: "Vice Chairman (F&A)",
      image: michaelImg,
    },
    {
      name: "Haygood Newman Gbedzeker",
      role: "General Secretary",
      image: haygoodImg,
    },
    {
      name: "Eyra Arnong",
      role: "Deputy General Secretary",
      image: eyraImg,
    },
    {
      name: "Christiana Dziedzorm Kwadzoti",
      role: "Treasurer",
      image: christianaImg,
    },
    {
      name: "Anna Enyonam Awuku",
      role: "Financial Secretary",
      image: annaImg,
    },
    {
      name: "Dzidonu Afako",
      role: "Organizer",
      image: dzidonuImg,
    },
    {
      name: "Barnabas Ladzaglah",
      role: "Deputy Organizer",
      image: barnabasImg,
    },
    {
      name: "Comfort Akorfa Akpese",
      role: "Women Organizer",
      image: comfortImg,
    },
    {
      name: "Elizabeth Dziedzorm Bokor",
      role: "Women Organizer",
      image: elizabethImg,
    },
    {
      name: "Francis Ladzaglah",
      role: "Publicity, Information and Education",
      image: francisImg,
    },
    {
      name: "Sammy Atani",
      role: "Chief of Staff",
      image: sammyImg,
    },
    {
        name: "Evelyn Awusi Fosu",
        role: "Marketing/Protocols Manager",
        image: evelynImg,
    },
  ];

  return (
    <section id="team" className="py-24 bg-mda-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-display text-mda-maroon leading-none animate-reveal">
              OUR <span className="text-mda-pink">TEAM</span>
            </h2>
            <p className="mt-6 font-body text-mda-maroon/70 text-lg md:text-xl border-l-4 border-mda-pink pl-6">
              The dedicated individuals leading the Mepe Development Association. 
              Together, we work towards sustainable progress and community excellence.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 border-2 border-mda-maroon/20 rounded-full flex items-center justify-center animate-spin-slow">
               <div className="w-2 h-2 bg-mda-pink rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group relative bg-white border border-mda-maroon/10 p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-mda-maroon/10 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-mda-maroon/5">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="mt-4 p-4 text-center">
                <h3 className="text-2xl font-display text-mda-maroon uppercase leading-tight">
                  {member.name}
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="w-6 h-[1px] bg-mda-pink"></div>
                  <p className="font-body text-[10px] font-bold text-mda-maroon/60 uppercase tracking-widest">
                    {member.role}
                  </p>
                  <div className="w-6 h-[1px] bg-mda-pink"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}} />
    </section>
  );
};

export default Team;

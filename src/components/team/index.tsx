import { useEffect, useState } from 'react';
import type { TeamMember } from '../../data/team';
import { listTeam } from '../../services/team';

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listTeam()
      .then(setMembers)
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

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

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-mda-maroon/20 border-t-mda-maroon rounded-full animate-spin" />
          </div>
        ) : members.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {members.map((member) => (
              <div 
                key={member.id} 
                className="group relative bg-white border border-mda-maroon/10 p-2 transition-all duration-500 hover:shadow-2xl hover:shadow-mda-maroon/10 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-mda-maroon/5">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-mda-maroon/20 font-display text-4xl">
                      {member.name.charAt(0)}
                    </div>
                  )}
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
        ) : (
          <div className="bg-white border border-mda-maroon/10 rounded-[2rem] p-12 md:p-24 text-center">
            <h3 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase mb-4 italic">
              No team members yet
            </h3>
            <p className="font-body text-mda-maroon/40 tracking-widest uppercase text-[10px] md:text-xs font-bold">
              Check back soon for updates to the MDA executive directory.
            </p>
          </div>
        )}
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

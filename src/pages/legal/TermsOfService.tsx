import { AlertCircle } from "lucide-react";
import SEO from "../../components/common/SEO";

const TermsOfService = () => {
  const terms = [
    {
      title: "SYSTEM USAGE",
      content:
        "By accessing this interface, you agree to comply with all applicable statutes of the Republic of Ghana. The content regarding Mepe evolution and cultural archives is for informational and community empowerment purposes.",
    },
    {
      title: "FUNDING PROTOCOLS",
      content:
        "All contributions made through the Mepe MDA system are allocated for community development intensives. The association ensures absolute transparency in the disbursement of alpha assets for the specific projects documented.",
    },
    {
      title: "INTELLECTUAL ASSETS",
      content:
        "The Mepe MDA insignia, cultural databanks, and system architecture are the sole property of the Mepe Development Association. Unauthorized cloning or extraction is prohibited.",
    },
    {
      title: "LIABILITY SHIELD",
      content:
        "The MDA optimizes for data accuracy across all updates. However, we are not liable for discrepancies or temporary infrastructure downtime during maintenance cycles.",
    },
  ];

  return (
    <>
      <SEO
        title="Terms of Service | Mepe Development Association"
        description="Review the Terms of Service for using the Mepe Development Association platform and participating in our community development initiatives."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-40 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[50vh] flex items-center">
          {/* Animated Mesh Glows */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none animate-pulse-glow" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-8 md:space-y-12 text-center md:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                User Agreement
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-display leading-[0.9] md:leading-[0.8] mb-6 md:mb-8 uppercase text-white tracking-tighter">
                TERMS OF <br />{" "}
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Service
                </span>
              </h1>
              <p className="font-body text-sm md:text-xl opacity-40 uppercase tracking-[0.3em] md:tracking-[0.5em] text-white">
                Last Sync: March 12, 2026
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-40 px-4 md:px-8 relative z-20">
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
            <div className="grid gap-8 md:gap-12">
              {terms.map((term, i) => (
                <div
                  key={i}
                  className="glass-card bg-white p-8 md:p-12 lg:p-20 rounded-[2.5rem] md:rounded-[4rem] border-white shadow-[0_40px_100px_-20px_rgba(93,26,26,0.05)] space-y-6 md:space-y-8 group hover:-translate-y-2 transition-all duration-700"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-display text-mda-maroon uppercase tracking-tighter flex items-center gap-4 md:gap-6 leading-none">
                      <span className="text-mda-pink italic font-serif opacity-30 group-hover:opacity-100 transition-opacity">
                        0{i + 1}.
                      </span>
                      {term.title}
                    </h2>
                  </div>
                  <p className="font-body text-mda-dark/50 leading-relaxed text-lg md:text-xl border-t border-mda-maroon/5 pt-6 md:pt-8">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 md:mt-24 p-8 md:p-12 lg:p-20 glass-card bg-mda-maroon rounded-[2.5rem] md:rounded-[4rem] border-white/5 flex flex-col md:flex-row gap-8 md:gap-12 items-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />
              <div className="w-20 md:w-24 h-20 md:h-24 glass-card bg-mda-pink rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 shadow-2xl animate-float">
                <AlertCircle className="text-mda-maroon w-10 md:w-12 h-10 md:h-12" />
              </div>
              <p className="font-display text-xl md:text-2xl lg:text-4xl text-white/80 uppercase italic leading-tight tracking-tighter text-center md:text-left">
                The usage of this system implies full acceptance of these
                protocols. The MDA reserves the right to re-initialize these
                terms at any sync point.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfService;

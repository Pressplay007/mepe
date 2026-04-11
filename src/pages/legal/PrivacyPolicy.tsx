import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";
import SEO from "../../components/common/SEO";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Data Integrity",
      icon: ShieldCheck,
      content:
        "The Mepe Development Association (MDA) operates with high-stakes security. We encrypt civilian data to ensure absolute integrity of donations, project intelligence, and community interactions.",
    },
    {
      title: "Intelligence Feed",
      icon: Eye,
      content:
        "We harvest only specific data points provided during transmissions (e.g., identity links, email markers). Automated metadata is utilized solely to optimize the system infrastructure.",
    },
    {
      title: "Objective Utility",
      icon: FileText,
      content:
        "Data is processed exclusively for administrative protocols: membership management, contribution transparency, and disseminating strategic development updates.",
    },
    {
      title: "Shielding",
      icon: Lock,
      content:
        "Our firewalls meet global standards. We do not leak or trade civilian intelligence with unauthorized third-party entities under any protocol.",
    },
  ];

  return (
    <>
      <SEO
        title="Privacy Policy | Mepe Development Association"
        description="Read our Privacy Policy to understand how the Mepe Development Association handles and protects your data with maximum integrity and security."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-40 bg-mda-maroon overflow-hidden min-h-[40vh] md:min-h-[50vh] flex items-center">
          {/* Animated Mesh Glows */}
          <div className="absolute top-0 right-0 w-[400px] md:w-[500px] h-[400px] md:h-[500px] bg-mda-pink/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none animate-pulse-glow" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-8 md:space-y-12 text-center md:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[10px] text-mda-pink">
                Encrypted Protocol
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[10rem] font-display leading-[0.9] md:leading-[0.8] mb-6 md:mb-8 uppercase text-white tracking-tighter">
                PRIVACY <br />{" "}
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Shield
                </span>
              </h1>
              <p className="font-body text-sm md:text-xl opacity-40 uppercase tracking-[0.3em] md:tracking-[0.5em] text-white">
                Effective Cycle: March 2026 / Version 2.1
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-40 px-4 md:px-8 relative z-20">
          <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
            {sections.map((section, i) => (
              <div
                key={i}
                className="glass-card bg-white p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] border-white shadow-[0_40px_100px_-20px_rgba(93,26,26,0.05)] flex flex-col md:flex-row gap-8 md:gap-12 items-start group hover:-translate-y-2 transition-all duration-700"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-mda-maroon flex items-center justify-center shrink-0 shadow-xl transition-transform group-hover:scale-110">
                  <section.icon className="text-mda-pink w-7 md:w-9 h-7 md:h-9" />
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-2xl md:text-4xl font-display text-mda-maroon uppercase tracking-tighter">
                    {section.title}
                  </h2>
                  <p className="font-body text-mda-dark/50 leading-relaxed text-lg md:text-xl border-l border-mda-pink/10 pl-6 md:pl-8 italic">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-16 md:pt-24 text-center">
              <div className="inline-block p-8 md:p-12 glass-card rounded-[2rem] md:rounded-[3rem] border-mda-maroon/5 space-y-4">
                <p className="font-body text-[10px] md:text-sm text-mda-dark/40 uppercase tracking-[0.2em]">
                  For systematic clarifications regarding this shield:
                </p>
                <a
                  href="mailto:info@mdagh.org"
                  className="text-xl md:text-2xl font-display text-mda-maroon uppercase italic hover:text-mda-pink transition-colors"
                >
                  security@mdagh.org
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;

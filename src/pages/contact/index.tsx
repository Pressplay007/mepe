import {
  Mail,
  Phone,
  MapPin,
  Send,
  Handshake,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

import SEO from "../../components/common/SEO";

const ContactPage = () => {
  return (
    <>
      <SEO
        title="Contact Us | Mepe Development Association"
        description="Get in touch with the Mepe Development Association. Whether you have questions, feedback, or want to support our initiatives, we'd love to hear from you."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative py-12 lg:py-20 bg-mda-maroon overflow-hidden min-h-[30vh] lg:min-h-[40vh] flex items-center">
          {/* Animated Mesh Glows */}
          <div className="absolute top-0 right-0 w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] bg-mda-pink/10 rounded-full blur-[50px] lg:blur-[80px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <div className="max-w-4xl space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-3 px-3 py-1.5 glass-card rounded-full border-white/10 uppercase font-bold tracking-[0.3em] text-[8px] md:text-[9px] text-mda-pink">
                Transmission
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-display leading-[0.9] lg:leading-[0.85] mb-4 md:mb-6 uppercase text-white er">
                CONTACT THE <br className="hidden md:block" />{" "}
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  MDA
                </span>
              </h1>
              <p className="font-body text-base md:text-xl text-white/50 leading-relaxed max-w-xl border-l border-mda-pink/30 pl-5 md:pl-8">
                We welcome visionary partnerships and community inquiries. Let's
                build the future together.
              </p>
            </div>
          </div>
        </section>

        {/* Office & Contact Info Grid */}
        <section className="py-8 md:py-16 px-4 md:px-8 relative z-20 mt-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.6fr_1fr] gap-6 md:gap-8">
            {/* Main Contact Area */}
            <div className="glass-card bg-white p-6 md:p-10 lg:p-16 rounded-[8px] md:rounded-[10px] border-white shadow-[0_40px_100px_-20px_rgba(93,26,26,0.1)]">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-3xl md:text-5xl font-display text-mda-maroon uppercase er leading-none">
                    SEND A <br />
                    <span className="text-mda-pink italic font-serif normal-case">
                      Message
                    </span>
                  </h2>
                  <div className="w-10 md:w-14 h-1 bg-mda-pink/30" />
                </div>

                <form className="space-y-6 md:space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-mda-maroon/50 ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-[8px] py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:ring-2 focus:ring-mda-pink/20 focus:border-mda-pink transition-all font-body text-mda-maroon placeholder:text-mda-maroon/20 text-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-mda-maroon/50 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-[8px] py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:ring-2 focus:ring-mda-pink/20 focus:border-mda-pink transition-all font-body text-mda-maroon placeholder:text-mda-maroon/20 text-sm"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-mda-maroon/50 ml-1">
                      Subject Matter
                    </label>
                    <select className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-[8px] py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:ring-2 focus:ring-mda-pink/20 focus:border-mda-pink transition-all font-body text-mda-maroon appearance-none text-sm">
                      <option>General Inquiry</option>
                      <option>Project Partnership</option>
                      <option>Donation Information</option>
                      <option>Youth Programs</option>
                      <option>Media & PR</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-mda-maroon/50 ml-1">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-[8px] py-3 md:py-4 px-5 md:px-6 focus:outline-none focus:ring-2 focus:ring-mda-pink/20 focus:border-mda-pink transition-all font-body text-mda-maroon placeholder:text-mda-maroon/20 resize-none text-sm"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button className="premium-gradient text-white w-full lg:w-fit px-8 md:px-12 py-3 md:py-4 rounded-[8px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-4 md:gap-6 hover:shadow-xl transition-all group">
                    Submit
                    <Send
                      size={16}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Area */}
            <div className="space-y-6 lg:pt-10">
              {/* Partnerships Card */}
              <div className="premium-gradient rounded-[8px] md:rounded-[10px] p-8 md:p-10 text-white space-y-6 md:space-y-8 relative overflow-hidden group">
                <div className="w-10 md:w-14 h-10 md:h-14 glass-card rounded-lg md:rounded-xl flex items-center justify-center">
                  <Handshake size={24} className="text-mda-pink" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl md:text-3xl font-display uppercase leading-tight er">
                    PARTNERSHIP <br />
                    <span className="text-mda-pink">PROTOCOLS</span>
                  </h3>
                  <p className="font-body text-white/60 text-xs md:text-sm leading-relaxed">
                    We are open to strategic collaborations with NGOs and
                    private investors.
                  </p>
                </div>
                <ul className="space-y-2 md:space-y-3 font-display text-lg md:text-xl uppercase italic text-mda-pink/80">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-mda-pink" />{" "}
                    Agriculture
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-mda-pink" />{" "}
                    Edu-Tech
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-mda-pink" />{" "}
                    Sustainable Dev
                  </li>
                </ul>
              </div>

              {/* Contact Details Card */}
              <div className="glass-card p-8 md:p-10 rounded-[8px] md:rounded-[10px] border-mda-maroon/5 space-y-8 bg-white">
                <div className="space-y-6 font-body text-mda-dark">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-mda-cream rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-mda-pink" />
                    </div>
                    <div>
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 mb-1">
                        LOCATION
                      </h4>
                      <p className="font-bold text-sm leading-snug">
                        Mepe Community Hub, North Tongu, VR
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center group">
                    <div className="w-10 h-10 bg-mda-cream rounded-lg flex items-center justify-center shrink-0 group-hover:bg-mda-maroon transition-colors">
                      <Mail className="w-4 h-4 text-mda-pink" />
                    </div>
                    <div>
                      <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 mb-1">
                        EMAIL
                      </h5>
                      <p className="font-bold text-sm">info@mdagh.org</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center group">
                    <div className="w-10 h-10 bg-mda-cream rounded-lg flex items-center justify-center shrink-0 group-hover:bg-mda-maroon transition-colors">
                      <Phone className="w-4 h-4 text-mda-pink" />
                    </div>
                    <div>
                      <h5 className="text-[9px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 mb-1">
                        PHONE
                      </h5>
                      <p className="font-bold text-sm">+233 24 457 9498</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-mda-maroon/5">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 rounded-lg bg-mda-cream flex items-center justify-center hover:bg-mda-pink hover:text-mda-maroon transition-all group"
                    >
                      <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;

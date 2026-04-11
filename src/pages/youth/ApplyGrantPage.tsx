import {
  ArrowLeft,
  Send,
  User,
  Mail,
  Phone,
  Calendar,
  Upload,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../../components/common/SEO";
import { useState, useRef } from "react";

const ApplyGrantPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);

  const idInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFile(e.target.files[0]);
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocFile(e.target.files[0]);
    }
  };

  if (submitted) {
    return (
      <>
        <SEO
          title="Grant Application | Mepe Development Association"
          description="Apply for educational or business grants through the Mepe Development Association. We support the aspirations of Mepe's youth and entrepreneurs."
        />
        <div className="bg-mda-cream min-h-screen flex items-center justify-center px-4 py-12">
          <div className="max-w-xl w-full glass-card bg-white p-8 md:p-12 rounded-[2rem] text-center shadow-xl border-white space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="w-16 h-16 bg-mda-maroon rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-float">
              <Send className="w-8 h-8 text-mda-pink" />
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl md:text-5xl font-display text-mda-maroon uppercase tracking-tighter leading-tight">
                SUBMITTED <br />{" "}
                <span className="text-mda-pink italic font-serif normal-case">
                  Successfully
                </span>
              </h2>
              <p className="font-body text-mda-dark/40 text-base md:text-lg leading-relaxed">
                We have received your application. Our committee will review
                your details and get back to you via email within 14 working
                days.
              </p>
            </div>
            <Link
              to="/youth"
              className="inline-flex glass-card bg-mda-maroon text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-mda-pink transition-all shadow-md"
            >
              Back to Youth Hub
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Grant Application | Mepe Development Association"
        description="Apply for educational or business grants through the Mepe Development Association. We support the aspirations of Mepe's youth and entrepreneurs."
      />
      <div className="bg-mda-cream min-h-screen">
        {/* Header */}
        <section className="relative py-16 md:py-24 bg-mda-maroon overflow-hidden flex items-center">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-mda-pink/10 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" />

          <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20 animate-reveal">
            <Link
              to="/youth"
              className="inline-flex items-center gap-2 text-white/40 hover:text-mda-pink transition-all mb-8 font-bold uppercase tracking-[0.2em] text-[10px] group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Return to Hub
            </Link>

            <div className="max-w-3xl space-y-6 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[1] mb-4 uppercase text-white tracking-tighter">
                GRANT <br />{" "}
                <span className="text-mda-pink italic font-serif normal-case text-glow">
                  Application
                </span>
              </h1>
              <p className="font-body text-base md:text-lg text-white/50 leading-relaxed max-w-xl border-l-2 border-mda-pink/30 pl-5">
                Supporting academic excellence and local business growth. Please
                provide accurate information to help us process your request.
              </p>
            </div>
          </div>
        </section>

        {/* How to Apply Section */}
        <section className="py-12 md:py-16 px-4 md:px-8 relative z-20">
          <div className="max-w-3xl mx-auto glass-card bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] border-white shadow-xl space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-mda-maroon rounded-xl flex items-center justify-center text-white shadow-md">
                <Info size={20} className="text-mda-pink" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-display text-mda-maroon uppercase tracking-tight">
                  HOW TO{" "}
                  <span className="text-mda-pink italic font-serif normal-case ml-1">
                    Apply
                  </span>
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  step: "01",
                  title: "Information",
                  desc: "Fill in your full name, date of birth, and contact details.",
                },
                {
                  step: "02",
                  title: "Category",
                  desc: "Select if you are applying for Academic or Business support.",
                },
                {
                  step: "03",
                  title: "Purpose",
                  desc: "Briefly explain how this grant will help you achieve your goals.",
                },
                {
                  step: "04",
                  title: "Documents",
                  desc: "Upload a copy of your ID and any relevant certificates.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="font-display text-2xl text-mda-pink/30 italic">
                    {item.step}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-display text-mda-maroon uppercase text-sm tracking-wider">
                      {item.title}
                    </h4>
                    <p className="font-body text-mda-dark/50 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-12 md:pb-20 px-4 md:px-8 relative z-20">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
              {/* Application Form */}
              <div className="glass-card bg-white p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] border-white shadow-xl space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-mda-maroon rounded-xl flex items-center justify-center text-white shadow-md">
                    <User size={20} className="text-mda-pink" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-display text-mda-maroon uppercase tracking-tight">
                      APPLICATION{" "}
                      <span className="text-mda-pink italic font-serif normal-case ml-1">
                        Information
                      </span>
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                      Your Full Name
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-xl py-3 px-5 focus:outline-none focus:border-mda-pink transition-all font-body text-mda-maroon text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="date"
                        className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-xl py-3 px-5 focus:outline-none focus:border-mda-pink transition-all font-body text-mda-maroon text-sm"
                      />
                      <Calendar
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-mda-pink/40"
                        size={16}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="email"
                        className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-xl py-3 px-5 focus:outline-none focus:border-mda-pink transition-all font-body text-mda-maroon text-sm"
                        placeholder="email@example.com"
                      />
                      <Mail
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-mda-pink/40"
                        size={16}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        required
                        type="tel"
                        className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-xl py-3 px-5 focus:outline-none focus:border-mda-pink transition-all font-body text-mda-maroon text-sm"
                        placeholder="+233 XX XXX XXXX"
                      />
                      <Phone
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-mda-pink/40"
                        size={16}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                      Grant Category
                    </label>
                    <select
                      required
                      className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-xl py-3 px-5 focus:outline-none focus:border-mda-pink transition-all font-body text-mda-maroon text-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled selected>
                        Select a category
                      </option>
                      <option value="academic">Academic (Education)</option>
                      <option value="business">Business (Enterprise)</option>
                      <option value="vocational">
                        Vocational (Skills Training)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-mda-maroon/5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                      Purpose of Grant
                    </label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-mda-cream/30 border border-mda-maroon/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-mda-pink transition-all font-body text-mda-maroon text-sm resize-none"
                      placeholder="Tell us about your goals and how this grant will help you..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-mda-maroon/5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                        Upload ID (Ghana Card / Passport)
                      </label>
                      <input
                        type="file"
                        ref={idInputRef}
                        className="hidden"
                        onChange={handleIdUpload}
                        accept="image/*,.pdf"
                      />
                      <div
                        onClick={() => idInputRef.current?.click()}
                        className="border-2 border-dashed border-mda-maroon/10 rounded-2xl p-6 text-center space-y-3 hover:border-mda-pink/30 transition-all cursor-pointer group bg-mda-cream/10"
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto shadow-md">
                          <Upload className="text-mda-pink" size={18} />
                        </div>
                        <div>
                          <p className="font-display text-base text-mda-maroon uppercase italic tracking-tight">
                            {idFile ? idFile.name : "Click to Upload ID"}
                          </p>
                          <p className="font-body text-mda-dark/30 text-[10px]">
                            {idFile
                              ? `${(idFile.size / 1024 / 1024).toFixed(2)}MB`
                              : "Max file size: 10MB"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-mda-maroon/40 ml-1">
                        Upload Certificates / Business Docs
                      </label>
                      <input
                        type="file"
                        ref={docInputRef}
                        className="hidden"
                        onChange={handleDocUpload}
                        accept="image/*,.pdf,.doc,.docx"
                      />
                      <div
                        onClick={() => docInputRef.current?.click()}
                        className="border-2 border-dashed border-mda-maroon/10 rounded-2xl p-6 text-center space-y-3 hover:border-mda-pink/30 transition-all cursor-pointer group bg-mda-cream/10"
                      >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mx-auto shadow-md">
                          <Upload className="text-mda-pink" size={18} />
                        </div>
                        <div>
                          <p className="font-display text-base text-mda-maroon uppercase italic tracking-tight">
                            {docFile ? docFile.name : "Upload Documents"}
                          </p>
                          <p className="font-body text-mda-dark/30 text-[10px]">
                            {docFile
                              ? `${(docFile.size / 1024 / 1024).toFixed(2)}MB`
                              : "Relevant proof or certificates"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full premium-gradient text-white py-5 rounded-2xl font-display text-xl uppercase tracking-[0.2em] shadow-lg hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                Submit Application
                <Send
                  className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </form>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-16 md:py-20 bg-mda-cream border-t border-mda-maroon/5">
          <div className="max-w-2xl mx-auto px-4 md:px-8 text-center space-y-6">
            <h4 className="text-2xl md:text-3xl text-mda-maroon font-display uppercase italic tracking-tighter">
              Need Help?
            </h4>
            <p className="font-body text-mda-dark/50 text-base leading-relaxed">
              If you have any questions about the application or face any
              issues, please contact us.
            </p>
            <a
              href="mailto:youth@mdagh.org"
              className="inline-block glass-card bg-mda-maroon text-mda-pink px-8 py-3 rounded-xl font-bold text-[10px] hover:bg-mda-pink hover:text-white transition-all"
            >
              youth@mdagh.org
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplyGrantPage;

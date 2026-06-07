import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { login } from "../../services/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid email or password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mda-cream flex items-center justify-center p-6 font-body">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-12 animate-reveal">
          <img
            src="/logo-n.png"
            alt="MDA Logo"
            className="h-24 w-auto object-contain mb-6 mx-auto"
          />
          <h1 className="text-4xl font-display text-mda-maroon  uppercase">
            MDA Website <span className="text-mda-pink">Management System</span>
          </h1>
          <p className="text-mda-maroon/60 mt-2 text-sm font-medium tracking-wide">
            Secure Access Portal
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-mda-maroon/5 border border-mda-maroon/5">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-2xl py-4 pl-12 pr-4 text-mda-maroon focus:outline-none focus:ring-2 focus:ring-mda-pink/20 focus:border-mda-pink transition-all"
                  placeholder="you@mepemda.org"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-mda-maroon/40 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-2xl py-4 pl-12 pr-4 text-mda-maroon focus:outline-none focus:ring-2 focus:ring-mda-pink/20 focus:border-mda-pink transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
                <p className="text-xs font-medium text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-mda-maroon hover:bg-mda-maroon/90 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-mda-maroon/20 transition-all active:scale-[0.98] disabled:opacity-70 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-mda-maroon/5 text-center">
            <p className="text-xs text-mda-maroon/40 leading-relaxed">
              Protected by MDA Security protocols.
              <br />
              Authorized personnel only.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 hover:text-mda-maroon transition-colors"
          >
            ← Back to Public Website
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `,
        }}
      />
    </div>
  );
};

export default LoginPage;

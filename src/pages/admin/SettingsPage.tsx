import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import {
  getCurrentAdmin,
  updateProfile,
  changePassword,
} from "../../services/auth";

const SettingsPage = () => {
  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Administrator");

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Feedback state
  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    getCurrentAdmin().then((admin) => {
      if (admin) {
        setName(admin.name);
        setEmail(admin.email);
        setRole(admin.role);
      }
    });
  }, []);

  const handleProfileSave = async () => {
    setProfileSaving(true);
    try {
      await updateProfile(name);
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update profile.",
      );
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSave = async () => {
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) return;

    setPasswordSaving(true);
    try {
      await changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not update password.",
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const passwordsMatch =
    confirmPassword.length === 0 || newPassword === confirmPassword;
  const passwordStrength = (pw: string) => {
    if (pw.length === 0) return null;
    if (pw.length < 6) return { label: "Weak", color: "text-red-500", bar: "bg-red-500 w-1/4" };
    if (pw.length < 10) return { label: "Fair", color: "text-amber-500", bar: "bg-amber-500 w-2/4" };
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw))
      return { label: "Strong", color: "text-emerald-500", bar: "bg-emerald-500 w-full" };
    return { label: "Good", color: "text-blue-500", bar: "bg-blue-500 w-3/4" };
  };

  const strength = passwordStrength(newPassword);

  return (
    <div className="space-y-8 animate-reveal">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
          ACCOUNT <span className="text-mda-pink">SETTINGS</span>
        </h1>
        <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
          Update your personal details and change your password.
        </p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white rounded-3xl border border-mda-maroon/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-mda-maroon/5 bg-mda-cream/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User size={18} className="text-mda-maroon/40" />
            <h2 className="text-mda-maroon/60 mt-1 font-medium tracking-wide">
              Profile Information
            </h2>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div>
              <p className="text-sm font-bold text-mda-maroon uppercase">{name}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-[10px] font-bold text-mda-pink uppercase tracking-widest">
                  {role}
                </p>
              </div>
            </div>
          </div>

          <div className="h-px bg-mda-maroon/5" />

          {/* Name */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-mda-maroon/15" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="Your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-mda-maroon/15" size={16} />
              <input
                type="email"
                value={email}
                readOnly
                disabled
                className="w-full bg-mda-cream/20 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon/50 cursor-not-allowed focus:outline-none transition-all"
                placeholder="your.email@mepemda.org"
              />
              <p className="text-[10px] text-mda-maroon/30 font-medium ml-1 mt-1">
                Email is your login and cannot be changed here.
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-mda-maroon/5 flex items-center justify-end gap-4">
          <button
            onClick={handleProfileSave}
            disabled={profileSaving}
            className="bg-mda-maroon text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60"
          >
            {profileSaving ? "Saving..." : "Update"}
          </button>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white rounded-3xl border border-mda-maroon/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-mda-maroon/5 bg-mda-cream/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-mda-maroon/40" />
            <h2 className="text-mda-maroon/50 mt-1 font-medium tracking-wide">
              Change Password
            </h2>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Current Password */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-mda-maroon/15" size={16} />
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-14 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-mda-maroon/20 hover:text-mda-maroon/50 transition-colors"
              >
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="h-px bg-mda-maroon/5" />

          {/* New Password */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-mda-maroon/15" size={16} />
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-14 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="Enter a new password"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-mda-maroon/20 hover:text-mda-maroon/50 transition-colors"
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {/* Password Strength Meter */}
            {strength && (
              <div className="space-y-2 mt-1">
                <div className="h-1.5 bg-mda-maroon/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${strength.bar}`}
                  />
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${strength.color}`}>
                  {strength.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-mda-maroon/15" size={16} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full bg-mda-cream/30 border rounded-[10px] py-5 pl-14 pr-14 text-sm text-mda-maroon focus:outline-none transition-all ${
                  !passwordsMatch
                    ? "border-red-300 focus:border-red-400"
                    : "border-mda-maroon/5 focus:border-mda-pink"
                }`}
                placeholder="Re-enter the new password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-mda-maroon/20 hover:text-mda-maroon/50 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {!passwordsMatch && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <div className="p-8 border-t border-mda-maroon/5 flex items-center justify-end gap-4">
          <button
            onClick={handlePasswordSave}
            disabled={
              !currentPassword ||
              !newPassword ||
              !passwordsMatch ||
              passwordSaving
            }
            className={`px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all ${
              !currentPassword || !newPassword || !passwordsMatch || passwordSaving
                ? "bg-mda-maroon/20 text-white cursor-not-allowed"
                : "bg-mda-maroon text-white shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95"
            }`}
          >
            {passwordSaving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(8px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `,
        }}
      />
    </div>
  );
};

export default SettingsPage;

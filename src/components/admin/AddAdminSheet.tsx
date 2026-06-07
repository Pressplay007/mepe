import { useState, type FormEvent } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface AdminData {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
  status: "Active" | "Inactive";
  lastLogin: string;
}

interface AddAdminSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (input: {
    name: string;
    email: string;
    password: string;
    role: AdminData["role"];
  }) => Promise<void> | void;
}

const AddAdminSheet = ({ isOpen, onClose, onAdd }: AddAdminSheetProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AdminData["role"]>("Moderator");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("Moderator");
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!name || !email || !password) return;
    if (password !== confirmPassword) return;

    setError("");
    setSubmitting(true);
    try {
      await onAdd({ name, email, password, role });
      resetForm();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not create administrator.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="p-0 border-l border-mda-maroon/5 bg-white flex flex-col gap-0 overflow-hidden w-full sm:max-w-[540px]"
      >
        <SheetHeader className="p-10 bg-mda-maroon text-white text-left space-y-0">
          <SheetTitle className="text-3xl font-display uppercase text-white leading-none">
            Add New <span className="text-mda-pink">Administrator</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            Admin Management
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-8 flex-1 overflow-y-auto"
        >
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
              placeholder="e.g. John Mensah"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
              placeholder="e.g. john@mepemda.org"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Role
            </label>
            <Select value={role} onValueChange={(v) => setRole(v as AdminData["role"])}>
              <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all h-auto">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-mda-maroon/10 rounded-[10px]">
                <SelectItem value="Super Admin">Super Admin</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
              placeholder="Enter a strong password"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
              placeholder="Re-enter the password"
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">
                Passwords do not match
              </p>
            )}
          </div>

          {error && (
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest ml-1">
              {error}
            </p>
          )}
        </form>

        <SheetFooter className="p-10 border-t border-mda-maroon/5 bg-white flex flex-row gap-4 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 py-7 border-mda-maroon/5 rounded-[10px] text-[10px] font-bold uppercase tracking-widest text-mda-maroon hover:bg-mda-cream/30"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleSubmit()}
            disabled={submitting}
            className="flex-1 py-7 bg-mda-maroon hover:bg-mda-maroon/90 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Admin"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddAdminSheet;

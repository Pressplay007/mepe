import { useState, useEffect, type FormEvent } from "react";
import { Save } from "lucide-react";
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
import type { AdminData } from "./AddAdminSheet";

interface EditAdminSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (admin: AdminData) => Promise<void> | void;
  admin: AdminData | null;
}

const EditAdminSheet = ({
  isOpen,
  onClose,
  onSave,
  admin,
}: EditAdminSheetProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<AdminData["role"]>("Moderator");
  const [status, setStatus] = useState<AdminData["status"]>("Active");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
      setRole(admin.role);
      setStatus(admin.status);
      setError("");
    }
  }, [admin]);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!name || !admin) return;

    setError("");
    setSubmitting(true);
    try {
      await onSave({ ...admin, name, email, role, status });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save changes.");
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
            Edit <span className="text-mda-pink">Administrator</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            Admin Management · #{admin?.id?.padStart(3, "0")}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-8 flex-1 overflow-y-auto"
        >
          {/* Account Details */}
          <div className="space-y-1 mb-2">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-mda-pink">
              Account Details
            </h3>
            <div className="h-px bg-mda-maroon/5" />
          </div>

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
              readOnly
              disabled
              value={email}
              className="w-full bg-mda-cream/20 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon/50 cursor-not-allowed focus:outline-none transition-all"
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
              Status
            </label>
            <Select value={status} onValueChange={(v) => setStatus(v as AdminData["status"])}>
              <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all h-auto">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-mda-maroon/10 rounded-[10px]">
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-[10px] bg-mda-cream/30 border border-mda-maroon/5 p-5">
            <p className="text-[10px] text-mda-maroon/50 leading-relaxed">
              Each administrator changes their own password and email from the
              Settings page after signing in. Use the toggle above to deactivate
              an account instead.
            </p>
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
            <Save size={14} />
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditAdminSheet;

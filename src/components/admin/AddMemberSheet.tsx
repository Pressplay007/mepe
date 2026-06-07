import { useState, type FormEvent } from "react";
import { Upload } from "lucide-react";
import type { TeamMember } from "../../data/team";
import { uploadTeamPhoto } from "../../services/team";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface AddMemberSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: TeamMember) => Promise<void> | void;
  nextId: string;
}

const AddMemberSheet = ({ isOpen, onClose, onAdd }: AddMemberSheetProps) => {
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({
    name: "",
    role: "",
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;

    setError("");
    setSubmitting(true);
    try {
      let image: string | undefined;
      if (photoFile) image = await uploadTeamPhoto(photoFile);
      await onAdd({
        name: newMember.name,
        role: newMember.role,
        image: image ?? "",
      } as TeamMember);
      setNewMember({ name: "", role: "" });
      setPhotoFile(null);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add member.");
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
          <SheetTitle className="text-3xl font-display uppercase  text-white leading-none">
            Add New <span className="text-mda-pink">Member</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            Executive Directory
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
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
              placeholder="e.g. John Doe"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Official Role
            </label>
            <input
              type="text"
              required
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
              placeholder="e.g. Communications Director"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Profile Photo
            </label>
            <div
              className={`border-2 border-dashed rounded-[10px] p-12 text-center transition-colors cursor-pointer group bg-mda-cream/10 ${photoFile ? "border-mda-pink bg-mda-pink/5" : "border-mda-maroon/10 hover:border-mda-pink/40"}`}
              onClick={() => document.getElementById("member-photo")?.click()}
            >
              <input
                id="member-photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
              />
              <Upload
                className="mx-auto text-mda-maroon/20 group-hover:text-mda-pink transition-colors mb-4"
                size={40}
              />
              <p className="text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
                {photoFile ? photoFile.name : "Click to upload image"}
              </p>
            </div>
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
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-7 bg-mda-maroon hover:bg-mda-maroon/90 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Add Member"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddMemberSheet;

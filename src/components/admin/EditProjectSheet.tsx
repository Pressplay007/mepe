import { useState, useEffect, type FormEvent } from "react";
import { User, Wallet } from "lucide-react";
import { toast } from "sonner";
import type { Project } from "../../data/projects";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
  SheetDescription, SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface EditProjectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => Promise<void> | void;
  project: Project | null;
}

const EditProjectSheet = ({ isOpen, onClose, onSave, project }: EditProjectSheetProps) => {
  const [edited, setEdited] = useState<Partial<Project>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setEdited({ ...project });
    }
  }, [project]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!edited.title || !edited.lead || !project) return;

    setSubmitting(true);
    try {
      await onSave({ ...project, ...edited } as Project);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 border-l border-mda-maroon/5 bg-white flex flex-col gap-0 overflow-hidden w-full sm:max-w-[540px]">
        <SheetHeader className="p-10 bg-mda-maroon text-white text-left space-y-0">
          <SheetTitle className="text-3xl font-display uppercase text-white leading-none">
            Edit <span className="text-mda-pink">Project</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            Development & Infrastructure · #{project?.id}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 flex-1 overflow-y-auto">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Project Title</label>
            <input type="text" required value={edited.title || ""}
              onChange={(e) => setEdited({ ...edited, title: e.target.value })}
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
              placeholder="e.g. Bridge Construction Phase 1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Category</label>
              <Select value={edited.category} onValueChange={(value) => setEdited({ ...edited, category: value })}>
                <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] h-[60px] px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink focus:ring-0 transition-all shadow-none">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-mda-maroon/5 rounded-[10px] shadow-xl">
                  <SelectItem value="Infrastructure" className="focus:bg-mda-cream/50 cursor-pointer">Infrastructure</SelectItem>
                  <SelectItem value="Education" className="focus:bg-mda-cream/50 cursor-pointer">Education</SelectItem>
                  <SelectItem value="Health" className="focus:bg-mda-cream/50 cursor-pointer">Health</SelectItem>
                  <SelectItem value="Culture" className="focus:bg-mda-cream/50 cursor-pointer">Culture</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Status</label>
              <Select value={edited.status} onValueChange={(value: any) => setEdited({ ...edited, status: value })}>
                <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] h-[60px] px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink focus:ring-0 transition-all shadow-none">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-mda-maroon/5 rounded-[10px] shadow-xl">
                  <SelectItem value="Planned" className="focus:bg-mda-cream/50 cursor-pointer">Planned</SelectItem>
                  <SelectItem value="In Progress" className="focus:bg-mda-cream/50 cursor-pointer">In Progress</SelectItem>
                  <SelectItem value="Completed" className="focus:bg-mda-cream/50 cursor-pointer">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Project Lead</label>
            <div className="relative group">
              <User className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors" size={18} />
              <input type="text" required value={edited.lead || ""}
                onChange={(e) => setEdited({ ...edited, lead: e.target.value })}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Ing. Mensah" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Budget Allocation</label>
            <div className="relative group">
              <Wallet className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors" size={18} />
              <input type="text" value={edited.budget || ""}
                onChange={(e) => setEdited({ ...edited, budget: e.target.value })}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. GHS 500,000" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40">Progress</label>
              <span className="text-[10px] font-bold text-mda-maroon">{edited.progress}%</span>
            </div>
            <input type="range" min="0" max="100" value={edited.progress ?? 0}
              onChange={(e) => setEdited({ ...edited, progress: parseInt(e.target.value) })}
              className="w-full h-2 bg-mda-cream rounded-full appearance-none cursor-pointer accent-mda-maroon" />
          </div>
        </form>

        <SheetFooter className="p-10 border-t border-mda-maroon/5 bg-white flex flex-row gap-4 sm:space-x-0">
          <Button type="button" variant="outline" onClick={onClose}
            className="flex-1 py-7 border-mda-maroon/5 rounded-[10px] text-[10px] font-bold tracking-widest text-mda-maroon hover:bg-mda-cream/30">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}
            className="flex-1 py-7 bg-mda-maroon hover:bg-mda-maroon/90 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60">
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditProjectSheet;

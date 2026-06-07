import { useState, type FormEvent } from "react";
import { User, Wallet } from "lucide-react";
import { toast } from "sonner";
import type { Project } from "../../data/projects";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


interface AddProjectSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (project: Project) => Promise<void> | void;
  nextId: string;
}

const emptyProject: Partial<Project> = {
  title: "",
  category: "Infrastructure",
  status: "Planned",
  progress: 0,
  description: "",
  lead: "",
  budget: "",
};

const AddProjectSheet = ({ isOpen, onClose, onAdd }: AddProjectSheetProps) => {
  const [newProject, setNewProject] = useState<Partial<Project>>(emptyProject);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.lead) return;

    setSubmitting(true);
    try {
      await onAdd(newProject as Project);
      setNewProject(emptyProject);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not add project.");
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
            New <span className="text-mda-pink">Project</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            Development & Infrastructure
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-6 flex-1 overflow-y-auto"
        >
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Project Title
            </label>
            <div className="relative group">
              <input
                type="text"
                required
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Bridge Construction Phase 1"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
                Category
              </label>
              <Select
                value={newProject.category}
                onValueChange={(value) =>
                  setNewProject({ ...newProject, category: value })
                }
              >
                <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] h-[60px] px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink focus:ring-0 transition-all shadow-none">
                  <SelectValue placeholder="Select category" />
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
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
                Initial Status
              </label>
              <Select
                value={newProject.status}
                onValueChange={(value: any) =>
                  setNewProject({
                    ...newProject,
                    status: value,
                  })
                }
              >
                <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] h-[60px] px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink focus:ring-0 transition-all shadow-none">
                  <SelectValue placeholder="Select status" />
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
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Project Lead
            </label>
            <div className="relative group">
              <User
                className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                size={18}
              />
              <input
                type="text"
                required
                value={newProject.lead}
                onChange={(e) =>
                  setNewProject({ ...newProject, lead: e.target.value })
                }
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Ing. Mensah"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Budget Allocation
            </label>
            <div className="relative group">
              <Wallet
                className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                size={18}
              />
              <input
                type="text"
                value={newProject.budget}
                onChange={(e) =>
                  setNewProject({ ...newProject, budget: e.target.value })
                }
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. GHS 500,000"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40">
                Initial Progress
              </label>
              <span className="text-[10px] font-bold text-mda-maroon">
                {newProject.progress}%
              </span>
            </div>
            <div className="relative pt-2">
              <input
                type="range"
                min="0"
                max="100"
                value={newProject.progress}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    progress: parseInt(e.target.value),
                  })
                }
                className="w-full h-2 bg-mda-cream rounded-full appearance-none cursor-pointer accent-mda-maroon"
              />
            </div>
          </div>
        </form>

        <SheetFooter className="p-10 border-t border-mda-maroon/5 bg-white flex flex-row gap-4 sm:space-x-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 py-7 border-mda-maroon/5 rounded-[10px] text-[10px] font-bold tracking-widest text-mda-maroon hover:bg-mda-cream/30"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 py-7 bg-mda-maroon hover:bg-mda-maroon/90 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Initialize Project"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddProjectSheet;

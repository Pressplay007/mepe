import { useState, useEffect, type FormEvent } from "react";
import { Type } from "lucide-react";
import { toast } from "sonner";
import type { Announcement } from "../../data/announcements";
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

interface EditAnnouncementSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (announcement: Announcement) => Promise<void> | void;
  announcement: Announcement | null;
}

const EditAnnouncementSheet = ({
  isOpen,
  onClose,
  onSave,
  announcement,
}: EditAnnouncementSheetProps) => {
  const [edited, setEdited] = useState<Partial<Announcement>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (announcement) {
      setEdited({ ...announcement });
    }
  }, [announcement]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!edited.title || !announcement) return;

    setSubmitting(true);
    try {
      await onSave({
        ...announcement,
        ...edited,
        isOfficial: edited.category === "Official",
      } as Announcement);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="p-0 border-l border-mda-maroon/5 bg-white sm:max-w-md flex flex-col gap-0 overflow-hidden"
      >
        <SheetHeader className="p-10 bg-mda-maroon text-white text-left space-y-0">
          <SheetTitle className="text-3xl font-display uppercase text-white leading-none">
            Edit <span className="text-mda-pink">Broadcast</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            Community Announcements · #{announcement?.id}
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-6 flex-1 overflow-y-auto"
        >
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Announcement Title
            </label>
            <div className="relative group">
              <Type
                className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                size={18}
              />
              <input
                type="text"
                required
                value={edited.title || ""}
                onChange={(e) => setEdited({ ...edited, title: e.target.value })}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Annual General Meeting 2026"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Summary (Short Clip)
            </label>
            <textarea
              required
              value={edited.summary || ""}
              onChange={(e) =>
                setEdited({ ...edited, summary: e.target.value })
              }
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all min-h-[100px] resize-none"
              placeholder="Brief overview of the announcement..."
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Category
            </label>
            <Select
              value={edited.category || "General"}
              onValueChange={(value) =>
                setEdited({ ...edited, category: value })
              }
            >
              <SelectTrigger className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] h-[60px] px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink focus:ring-0 transition-all shadow-none">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border-mda-maroon/5 rounded-[10px] shadow-xl">
                <SelectItem value="General" className="focus:bg-mda-cream/50 cursor-pointer">General</SelectItem>
                <SelectItem value="Official" className="focus:bg-mda-cream/50 cursor-pointer">Official</SelectItem>
                <SelectItem value="Event" className="focus:bg-mda-cream/50 cursor-pointer">Event</SelectItem>
                <SelectItem value="Urgent" className="focus:bg-mda-cream/50 cursor-pointer">Urgent</SelectItem>
                <SelectItem value="Education" className="focus:bg-mda-cream/50 cursor-pointer">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Status
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setEdited({ ...edited, status: "Scheduled" })}
                className={`py-4 rounded-[10px] text-[10px] font-bold uppercase tracking-widest border transition-all ${edited.status === "Scheduled" ? "bg-amber-50 border-amber-500 text-amber-600" : "bg-white border-mda-maroon/5 text-mda-maroon/40"}`}
              >
                Scheduled
              </button>
              <button
                type="button"
                onClick={() => setEdited({ ...edited, status: "Published" })}
                className={`py-4 rounded-[10px] text-[10px] font-bold uppercase tracking-widest border transition-all ${edited.status === "Published" ? "bg-emerald-50 border-emerald-500 text-emerald-600" : "bg-white border-mda-maroon/5 text-mda-maroon/40"}`}
              >
                Published
              </button>
            </div>
          </div>
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
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditAnnouncementSheet;

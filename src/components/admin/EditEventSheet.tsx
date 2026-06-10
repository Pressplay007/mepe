import { useState, useEffect, type FormEvent } from "react";
import { MapPin, Type } from "lucide-react";
import { toast } from "sonner";
import type { Event } from "../../data/events";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
  SheetDescription, SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DateTimePicker from "./DateTimePicker";
import AdminImageField from "./AdminImageField";
import { uploadEventImage } from "../../services/events";


interface EditEventSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => Promise<void> | void;
  event: Event | null;
}

const EditEventSheet = ({ isOpen, onClose, onSave, event }: EditEventSheetProps) => {
  const [edited, setEdited] = useState<Partial<Event>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      setEdited({ ...event });
    }
  }, [event]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!edited.title || !edited.date || !event) return;
    if (!edited.image) {
      toast.error("Please upload an event image.");
      return;
    }

    setSubmitting(true);
    try {
      await onSave({ ...event, ...edited } as Event);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save changes.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="p-0 border-l border-mda-maroon/5 bg-white sm:max-w-md flex flex-col gap-0 overflow-hidden">
        <SheetHeader className="p-10 bg-mda-maroon text-white text-left space-y-0">
          <SheetTitle className="text-3xl font-display uppercase text-white leading-none">
            Edit <span className="text-mda-pink">Event</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            MDA Event Calendar · #{event?.id}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="p-10 space-y-6 flex-1 overflow-y-auto">
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Event Title</label>
            <div className="relative group">
              <Type className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors" size={18} />
              <input type="text" required value={edited.title || ""} onChange={(e) => setEdited({ ...edited, title: e.target.value })}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Hogbetsotso Festival" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Date & Time</label>
            <DateTimePicker
              value={edited.date || ""}
              onChange={(value) => setEdited({ ...edited, date: value })}
              placeholder="Select date & time"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Location</label>
            <div className="relative group">
              <MapPin className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors" size={18} />
              <input type="text" required value={edited.location || ""} onChange={(e) => setEdited({ ...edited, location: e.target.value })}
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Mepe Community Center" />
            </div>
          </div>

          <AdminImageField
            label="Event Image"
            value={edited.image}
            onChange={(url) => setEdited({ ...edited, image: url })}
            onUpload={uploadEventImage}
          />

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">Description</label>
            <textarea value={edited.description || ""} onChange={(e) => setEdited({ ...edited, description: e.target.value })}
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all min-h-[120px] resize-none"
              placeholder="Briefly describe the event..." />
          </div>
        </form>

        <SheetFooter className="p-10 border-t border-mda-maroon/5 bg-white flex flex-row gap-4 sm:space-x-0">
          <Button type="button" variant="outline" onClick={onClose}
            className="flex-1 py-7 border-mda-maroon/5 rounded-[10px] text-[10px] font-bold uppercase tracking-widest text-mda-maroon hover:bg-mda-cream/30">
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

export default EditEventSheet;

import { useState, type FormEvent } from "react";
import { Calendar, MapPin, Type } from "lucide-react";
import type { Event } from "../../data/events";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";


interface AddEventSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Event) => Promise<void> | void;
  nextId: string;
}

const emptyEvent: Partial<Event> = {
  title: "",
  description: "",
  date: "",
  location: "",
  category: "Cultural",
  status: "Upcoming",
};

const AddEventSheet = ({ isOpen, onClose, onAdd }: AddEventSheetProps) => {
  const [newEvent, setNewEvent] = useState<Partial<Event>>(emptyEvent);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    setError("");
    setSubmitting(true);
    try {
      await onAdd(newEvent as Event);
      setNewEvent(emptyEvent);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create event.");
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
          <SheetTitle className="text-3xl font-display uppercase  text-white leading-none">
            Create <span className="text-mda-pink">Event</span>
          </SheetTitle>
          <SheetDescription className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1">
            MDA Event Calendar
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit}
          className="p-10 space-y-6 flex-1 overflow-y-auto"
        >
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Event Title
            </label>
            <div className="relative group">
              <Type
                className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                size={18}
              />
              <input
                type="text"
                required
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Hogbetsotso Festival"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Date & Time
            </label>
            <div className="relative group">
              <Calendar
                className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                size={18}
              />
              <input
                type="text"
                required
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. October 15, 2026"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Location
            </label>
            <div className="relative group">
              <MapPin
                className="absolute left-5 top-5 text-mda-maroon/20 group-focus-within:text-mda-pink transition-colors"
                size={18}
              />
              <input
                type="text"
                required
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
                className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 pl-14 pr-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
                placeholder="e.g. Mepe Community Center"
              />
            </div>
          </div>


          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40 ml-1">
              Description
            </label>
            <textarea
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-5 px-6 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all min-h-[120px] resize-none"
              placeholder="Briefly describe the event..."
            />
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
            className="flex-1 py-7 bg-mda-maroon hover:bg-mda-maroon/90 text-white rounded-[10px] text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Schedule Event"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddEventSheet;

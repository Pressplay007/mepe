import { useEffect, useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  MapPin, 
  Edit2, 
  Trash2, 
  Tag,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';
import { type Event } from '../../data/events';
import {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../../services/events';
import AddEventSheet from '../../components/admin/AddEventSheet';
import EditEventSheet from '../../components/admin/EditEventSheet';

const EventsManagement = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    listEvents()
      .then(setEvents)
      .catch((e) => setError(e.message ?? 'Failed to load events.'))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEvent = async (event: Event) => {
    const created = await createEvent(event);
    setEvents((prev) => [created, ...prev]);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditSheetOpen(true);
  };

  const handleSaveEvent = async (updated: Event) => {
    const saved = await updateEvent(updated.id, updated);
    setEvents((prev) => prev.map((e) => (e.id === saved.id ? saved : e)));
  };

  const handleDeleteEvent = async (id: string) => {
    if (!window.confirm('Delete this event? This cannot be undone.')) return;
    await deleteEvent(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'Ongoing': return 'bg-mda-pink/10 text-mda-pink border-mda-pink/20';
      case 'Past': return 'bg-mda-maroon/10 text-mda-maroon/40 border-mda-maroon/10';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 animate-reveal">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-display text-mda-maroon uppercase leading-tight">
            EVENT <span className="text-mda-pink">CALENDAR</span>
          </h1>
          <p className="text-mda-maroon/50 mt-1 font-medium tracking-wide">Organize and schedule community gatherings.</p>
        </div>
        <button 
          onClick={() => setIsSheetOpen(true)}
          className="bg-mda-maroon text-white px-8 py-4 rounded-[10px] font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-xl shadow-mda-maroon/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus size={16} />
          Create New Event
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-[15px] border border-mda-maroon/5 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mda-maroon/20" size={18} />
          <input 
            type="text" 
            placeholder="Search events by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-mda-cream/30 border border-mda-maroon/5 rounded-[10px] py-4 pl-12 pr-4 text-sm text-mda-maroon focus:outline-none focus:border-mda-pink transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-mda-cream/30 border border-mda-maroon/5 text-mda-maroon px-6 py-4 rounded-[10px] text-[10px] font-bold uppercase tracking-widest hover:bg-mda-cream transition-colors">
            <Filter size={14} />
            Filter
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-[15px] px-6 py-4">
          <p className="text-xs font-medium text-red-600">{error}</p>
        </div>
      )}

      {loading && (
        <div className="bg-white p-16 rounded-[15px] border border-mda-maroon/5 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
          Loading events...
        </div>
      )}

      {!loading && filteredEvents.length === 0 && (
        <div className="bg-white p-16 rounded-[15px] border border-mda-maroon/5 text-center text-mda-maroon/40 text-xs font-bold uppercase tracking-widest">
          No events yet.
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white p-8 rounded-[15px] border border-mda-maroon/5 shadow-sm hover:shadow-xl hover:shadow-mda-maroon/5 transition-all group flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="p-2.5 hover:bg-mda-cream rounded-xl text-mda-maroon/40 hover:text-mda-maroon transition-all shadow-sm bg-white border border-mda-maroon/5"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2.5 hover:bg-red-50 rounded-xl text-mda-maroon/40 hover:text-red-500 transition-all shadow-sm bg-white border border-mda-maroon/5"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-2xl font-display text-mda-maroon uppercase leading-tight mb-2 group-hover:text-mda-pink transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-mda-maroon/50 font-medium mb-6 line-clamp-2">{event.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-mda-maroon/60">
                  <div className="w-8 h-8 rounded-lg bg-mda-cream flex items-center justify-center">
                    <Calendar size={14} className="text-mda-pink" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-mda-maroon/60">
                  <div className="w-8 h-8 rounded-lg bg-mda-cream flex items-center justify-center">
                    <MapPin size={14} className="text-mda-pink" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest truncate">{event.location}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-mda-maroon/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-mda-maroon/20" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon/40">{event.category}</span>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest text-mda-maroon hover:text-mda-pink transition-colors flex items-center gap-2">
                View Details
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold text-mda-maroon/40 uppercase tracking-widest">
          Showing <span className="text-mda-maroon">{filteredEvents.length}</span> events
        </p>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white border border-mda-maroon/5 rounded-xl text-mda-maroon/20 cursor-not-allowed shadow-sm">
            <ChevronLeft size={18} />
          </button>
          <button className="p-3 bg-white border border-mda-maroon/5 rounded-xl text-mda-maroon/40 hover:bg-mda-cream transition-colors shadow-sm">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Add Event Sheet Component */}
      <AddEventSheet 
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onAdd={handleAddEvent}
        nextId={String(events.length + 1)}
      />

      {/* Edit Event Sheet Component */}
      <EditEventSheet
        isOpen={isEditSheetOpen}
        onClose={() => { setIsEditSheetOpen(false); setEditingEvent(null); }}
        onSave={handleSaveEvent}
        event={editingEvent}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
};

export default EventsManagement;

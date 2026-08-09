import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { EventGrid } from '../components/EventGrid';
import { Modal } from '../components/Modal';
import { TicketModal } from '../components/TicketModal';
import { getEvents, getBookings, saveBookings, saveEvents } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { generateBookingId } from '../utils/helpers';
import { Compass, Sparkles } from 'lucide-react';

export const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [eventTypeFilter, setEventTypeFilter] = useState('All'); // All, Free, Paid
  const [timelineFilter, setTimelineFilter] = useState('Upcoming'); // All, Upcoming, Past

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Sync category from URL param if user clicked category pill on landing page
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Read events from localStorage - FILTER ONLY APPROVED
  const approvedEvents = useMemo(() => {
    const all = getEvents();
    return all.filter((e) => e.status === 'approved');
  }, []);

  // JavaScript Filter Engine
  const filteredEvents = useMemo(() => {
    return approvedEvents.filter((evt) => {
      // 1. Search Query (Title, Venue, Category, Description, Address)
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesTitle = evt.title?.toLowerCase().includes(q);
        const matchesVenue = evt.venue?.toLowerCase().includes(q);
        const matchesCategory = evt.category?.toLowerCase().includes(q);
        const matchesDesc = evt.description?.toLowerCase().includes(q);
        const matchesAddress = evt.address?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesVenue && !matchesCategory && !matchesDesc && !matchesAddress) {
          return false;
        }
      }

      // 2. Category Filter
      if (selectedCategory !== 'All' && evt.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 3. Free / Paid Pricing Filter
      if (eventTypeFilter === 'Free' && (evt.price > 0 || evt.eventType === 'Paid')) {
        return false;
      }
      if (eventTypeFilter === 'Paid' && (evt.price === 0 || evt.eventType === 'Free')) {
        return false;
      }

      // 4. Timeline Filter
      if (timelineFilter !== 'All' && evt.date) {
        const eventTime = new Date(evt.date).getTime();
        const todayTime = new Date().setHours(0, 0, 0, 0);
        if (timelineFilter === 'Upcoming' && eventTime < todayTime) {
          return false;
        }
        if (timelineFilter === 'Past' && eventTime >= todayTime) {
          return false;
        }
      }

      return true;
    });
  }, [approvedEvents, searchQuery, selectedCategory, eventTypeFilter, timelineFilter]);

  const handleRegisterClick = (event) => {
    if (!isAuthenticated) {
      addToast('Please login to register for public events.', 'info');
      navigate('/login', { state: { from: { pathname: `/events/${event.id}` } } });
      return;
    }
    setSelectedEvent(event);
    setIsConfirmModalOpen(true);
  };

  const confirmRegistration = () => {
    if (!selectedEvent || !user) return;

    const bookings = getBookings();
    const existing = bookings.find(
      (b) => b.userId === user.id && b.eventId === selectedEvent.id && b.status === 'confirmed'
    );

    if (existing) {
      addToast('You are already registered for this event!', 'info');
      setIsConfirmModalOpen(false);
      return;
    }

    const newBooking = {
      id: `bk-${Date.now()}`,
      bookingId: generateBookingId(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventDate: selectedEvent.date,
      eventVenue: selectedEvent.venue,
      organizationId: selectedEvent.organizationId,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0]
    };

    saveBookings([...bookings, newBooking]);

    // Update registered count
    const allEvents = getEvents();
    const index = allEvents.findIndex((e) => e.id === selectedEvent.id);
    if (index !== -1) {
      allEvents[index].registeredCount = (allEvents[index].registeredCount || 0) + 1;
      saveEvents(allEvents);
    }

    setIsConfirmModalOpen(false);
    setActiveBooking(newBooking);
    setIsTicketModalOpen(true);
    addToast('Registration confirmed successfully!', 'success');
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setEventTypeFilter('All');
    setTimelineFilter('All');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        {/* Header Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Approved Public Listing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Discover Events in Chennai
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Browse verified community workshops, tech summits, cultural masterclasses, and sports events happening across Chennai.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-6 mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events, venues, or categories (e.g., Trade Fair, Besant Nagar, Marathon)..."
          />

          <FilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              if (cat !== 'All') setSearchParams({ category: cat });
              else setSearchParams({});
            }}
            eventTypeFilter={eventTypeFilter}
            onSelectEventType={setEventTypeFilter}
            timelineFilter={timelineFilter}
            onSelectTimeline={setTimelineFilter}
            onReset={resetAllFilters}
          />
        </div>

        {/* Results Counter & Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium px-1">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredEvents.length}</strong> of {approvedEvents.length} approved events
            </span>
            {selectedCategory !== 'All' && (
              <span className="text-indigo-600 dark:text-cyan-400 font-semibold">
                Category: {selectedCategory}
              </span>
            )}
          </div>

          <EventGrid
            events={filteredEvents}
            onRegisterClick={handleRegisterClick}
            emptyMessage="No approved events matched your filter criteria. Try adjusting the search query or clearing the category filters."
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedEvent && (
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Registration"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900">
              <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1">
                {selectedEvent.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                📅 <strong>Date:</strong> {selectedEvent.date}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                📍 <strong>Venue:</strong> {selectedEvent.venue}, {selectedEvent.city}
              </p>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p>Attendee: <strong className="text-slate-900 dark:text-white">{user?.name}</strong> ({user?.email})</p>
              <p>Pass Fee: <strong className="text-emerald-600 dark:text-emerald-400">{selectedEvent.price === 0 ? 'Free Entry' : `₹${selectedEvent.price}`}</strong></p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmRegistration}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20"
              >
                Confirm Registration
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Ticket Pass Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        booking={activeBooking}
        event={selectedEvent}
      />

      <Footer />
    </div>
  );
};

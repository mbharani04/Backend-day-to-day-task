import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EventCard } from '../components/EventCard';
import { TicketModal } from '../components/TicketModal';
import { Modal } from '../components/Modal';
import { getEvents, getBookings, saveBookings, saveEvents } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { generateBookingId } from '../utils/helpers';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  Sparkles,
  Award,
  Users,
  CheckCircle,
  MapPin,
  Laptop,
  Trophy,
  Landmark,
  GraduationCap,
  Briefcase,
  Palette,
  Building,
  Film,
  Maximize2,
  Wrench
} from 'lucide-react';

export const Landing = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToast } = useToast();

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  useEffect(() => {
    // Filter only approved events for public landing
    const events = getEvents();
    const approved = events.filter((e) => e.status === 'approved');
    setUpcomingEvents(approved.slice(0, 6));
  }, []);

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

  const categories = [
    { name: 'Cultural', icon: Landmark, color: 'from-amber-500 to-amber-600', count: '12+ Events' },
    { name: 'Sports', icon: Trophy, color: 'from-emerald-500 to-emerald-600', count: '8+ Events' },
    { name: 'Technology', icon: Laptop, color: 'from-cyan-500 to-cyan-600', count: '15+ Events' },
    { name: 'Education', icon: GraduationCap, color: 'from-blue-500 to-blue-600', count: '10+ Events' },
    { name: 'Business', icon: Briefcase, color: 'from-indigo-500 to-indigo-600', count: '14+ Events' },
    { name: 'Arts', icon: Palette, color: 'from-purple-500 to-purple-600', count: '9+ Events' },
    { name: 'Government', icon: Building, color: 'from-slate-600 to-slate-700', count: '6+ Events' },
    { name: 'Entertainment', icon: Film, color: 'from-pink-500 to-pink-600', count: '11+ Events' },
    { name: 'Exhibition', icon: Maximize2, color: 'from-violet-500 to-violet-600', count: '7+ Events' },
    { name: 'Workshop', icon: Wrench, color: 'from-teal-500 to-teal-600', count: '13+ Events' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 dark:bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-400/15 dark:bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Official Public Events Portal • Chennai
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white max-w-5xl mx-auto leading-[1.1] mb-6">
            Discover and Register for <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
              Local Public Events
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 font-medium leading-relaxed">
            Explore what's happening around Chennai — from cultural celebrations and sports events to exhibitions, trade fairs, workshops, and community gatherings.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/events"
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-2xl shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-5 h-5" />
              Explore Events
            </Link>
            <Link
              to={isAuthenticated ? '/user/dashboard' : '/login'}
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-base rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">100+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Chennai Venues</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-indigo-600 dark:text-cyan-400">100%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verified Events</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">50k+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Active Attendees</span>
            </div>
            <div>
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">Instant</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Digital Pass Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="py-16 bg-white dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-cyan-400 block mb-2">
              Browse By Interest
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Popular Categories
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/events?category=${cat.name}`}
                  className="group p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all hover:shadow-lg flex flex-col items-center text-center"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {cat.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Approved Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-cyan-400 block mb-2">
                What's Happening Soon
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Upcoming Chennai Events
              </h2>
            </div>
            <Link
              to="/events"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-cyan-400 hover:underline"
            >
              View All Events ({getEvents().filter((e) => e.status === 'approved').length})
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((evt) => (
              <EventCard
                key={evt.id}
                event={evt}
                onRegisterClick={handleRegisterClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-2">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Built Specifically for Chennai City
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              We empower local residents and visitors to explore vibrant public events while providing organizations a seamless channel for public registrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Discover Local Events</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Find public gatherings, marathons, and technology expos across Nandambakkam, ECR, Besant Nagar, and Taramani.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Easy Registration</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                One-click instant ticket reservations with demo OTP login and automatic digital ticket generation.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Verified Events</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every organization event undergoes strict admin verification before appearing on the public event feed.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 text-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Manage Your Bookings</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keep track of all your confirmed registrations, view venue directions, and cancel bookings anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-cyan-400 block mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'Discover', desc: 'Browse approved public events happening in Chennai by category, date, or venue.' },
              { step: '02', title: 'Explore', desc: 'Read event descriptions, schedules, organizer details, and available seats.' },
              { step: '03', title: 'Register', desc: 'Log in with simple OTP (123456) and reserve your free or paid entry ticket.' },
              { step: '04', title: 'Attend', desc: 'Show your digital ticket pass at the venue entrance and enjoy the event.' }
            ].map((s, idx) => (
              <div key={s.step} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex flex-col justify-between">
                <div>
                  <span className="text-4xl font-black text-indigo-600 dark:text-cyan-400 opacity-40 block mb-4">
                    {s.step}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight">
            Something exciting is happening near you.
          </h2>
          <p className="text-indigo-100 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Chennai residents discovering concerts, expos, marathons, and educational job fairs every weekend.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 hover:bg-slate-100 font-extrabold text-base rounded-2xl shadow-2xl transition-all hover:scale-105"
          >
            Explore Chennai Events
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Registration Confirmation Modal */}
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
              <p>Pass Price: <strong className="text-emerald-600 dark:text-emerald-400">{selectedEvent.price === 0 ? 'Free Entry' : `₹${selectedEvent.price}`}</strong></p>
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

      {/* Ticket Modal */}
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

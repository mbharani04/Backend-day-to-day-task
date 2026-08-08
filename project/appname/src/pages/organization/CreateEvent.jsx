import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { getEvents, saveEvents } from '../../utils/storage';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { CATEGORIES } from '../../components/FilterBar';
import {
  FileText,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Image as ImageIcon,
  Save,
  Send,
  ArrowLeft
} from 'lucide-react';

export const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToast } = useToast();

  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200',
    date: '2026-09-25',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    registrationDeadline: '2026-09-20',
    venue: 'Chennai Trade Centre',
    address: 'Nandambakkam, Mount Poonamallee Road',
    city: 'Chennai',
    pincode: '600089',
    maxParticipants: 300,
    eventType: 'Free', // Free | Paid
    price: 0
  });

  useEffect(() => {
    if (isEditing) {
      const events = getEvents();
      const existing = events.find((e) => e.id === id);
      if (existing) {
        setFormData(existing);
      }
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'eventType' && value === 'Free' ? { price: 0 } : {})
    }));
  };

  const handleSubmit = (statusType = 'pending') => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.venue.trim()) {
      addToast('Please fill out all required event details.', 'error');
      return;
    }

    const events = getEvents();
    const orgId = user?.organizationId || 'org-chennai-01';
    const orgName = user?.name || 'Chennai Events Organization';

    if (isEditing) {
      const updatedEvents = events.map((e) =>
        e.id === id
          ? {
              ...e,
              ...formData,
              status: statusType, // 'pending' or 'draft'
              organizationId: orgId,
              organizationName: orgName
            }
          : e
      );
      saveEvents(updatedEvents);
      addToast('Event details updated successfully!', 'success');
    } else {
      const newEvent = {
        id: `evt-${Date.now()}`,
        ...formData,
        registeredCount: 0,
        organizationId: orgId,
        organizationName: orgName,
        status: statusType, // 'pending' for admin review
        rejectionReason: ''
      };
      saveEvents([...events, newEvent]);
      addToast(
        statusType === 'pending'
          ? 'Event submitted successfully. Waiting for admin approval.'
          : 'Event saved as draft.',
        'success'
      );
    }

    navigate('/organization/events');
  };

  const presetImages = [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200', // Trade Fair
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1200', // Tech Expo
    'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200', // Marathon
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200', // Cultural
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200', // Startup Conclave
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200'  // Education
  ];

  return (
    <DashboardLayout
      title={isEditing ? 'Edit Public Event' : 'Create & Submit New Public Event'}
      subtitle="Complete all multi-section information to submit your event for admin moderation."
    >
      <div className="max-w-4xl space-y-8 pb-12">
        {/* Form Container */}
        <div className="space-y-8 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors">
          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <FileText className="w-5 h-5" />
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Chennai International Trade Fair 2026"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Event Image URL *
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Paste image URL or pick preset below"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* Preset Image Selector */}
              <div className="sm:col-span-2 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 block">Pick Image Preset:</span>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {presetImages.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt="preset"
                      onClick={() => setFormData((prev) => ({ ...prev, image: url }))}
                      className={`w-16 h-12 rounded-lg object-cover cursor-pointer border-2 transition-all shrink-0 ${
                        formData.image === url
                          ? 'border-indigo-600 scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Event Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide comprehensive details about schedule, key speakers, entry guidelines, and highlights..."
                  className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Date & Time */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Calendar className="w-5 h-5" />
              2. Date & Timing Schedule
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Start Time *
                </label>
                <input
                  type="text"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  placeholder="e.g. 09:30 AM"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  End Time *
                </label>
                <input
                  type="text"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  placeholder="e.g. 06:00 PM"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Registration Deadline *
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  value={formData.registrationDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Location */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <MapPin className="w-5 h-5" />
              3. Location & Venue
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Venue Name *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="e.g. Chennai Trade Centre"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Mount Poonamallee Road, Nandambakkam"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  City (Default: Chennai) *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 600089"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Capacity & Pricing */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider text-indigo-600 dark:text-cyan-400 flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Users className="w-5 h-5" />
              4. Registration & Ticket Pricing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Maximum Participants *
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Entry Pass Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Free">Free Entry</option>
                  <option value="Paid">Paid Ticket</option>
                </select>
              </div>

              {formData.eventType === 'Paid' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Ticket Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min={0}
                    placeholder="Amount in INR"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => navigate('/organization/events')}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-semibold text-xs rounded-xl transition-all"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleSubmit('draft')}
                className="flex-1 sm:flex-initial px-5 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-900 dark:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('pending')}
                className="flex-1 sm:flex-initial px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                Submit for Admin Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

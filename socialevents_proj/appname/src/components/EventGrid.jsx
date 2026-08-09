import React from 'react';
import { EventCard } from './EventCard';
import { EmptyState } from './EmptyState';
import { Calendar } from 'lucide-react';

export const EventGrid = ({ events = [], onRegisterClick, emptyMessage, showStatus }) => {
  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Public Events Found"
        description={emptyMessage || "No events currently match your filter or search criteria. Try refining your filters or search keywords."}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onRegisterClick={onRegisterClick}
          showStatus={showStatus}
        />
      ))}
    </div>
  );
};

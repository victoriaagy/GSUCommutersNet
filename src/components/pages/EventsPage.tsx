import { useState } from 'react';
import { EventCard } from '../EventCard';
import { Button } from '../ui/button';
import type { Event, EventType } from '../EventCard';

const events: Event[] = [
  {
    id: 1,
    title: 'Commuter Student Mixer',
    date: 'Nov 20, 2024',
    time: '5:00 PM - 7:00 PM',
    location: 'Student Center, Room 340',
    type: 'Social',
    description: 'Meet fellow commuter students and build connections.',
    imageUrl: 'https://images.unsplash.com/photo-1758270704464-f980b03b9633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzb2NpYWxpemluZ3xlbnwxfHx8fDE3NjMxMzk5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    title: 'Study Skills Workshop',
    date: 'Nov 22, 2024',
    time: '3:00 PM - 4:30 PM',
    location: 'Library, 4th Floor',
    type: 'Academic',
    description: 'Learn effective study techniques and time management strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1762158007836-25d13ab34c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwd29ya3Nob3AlMjBjbGFzc3Jvb218ZW58MXx8fHwxNzYzMTM5OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    title: 'Campus Tour for Commuters',
    date: 'Nov 25, 2024',
    time: '12:00 PM - 1:30 PM',
    location: 'Meet at Sparks Hall',
    type: 'Academic',
    description: 'Discover the best spots on campus including parking and dining.',
    imageUrl: 'https://images.unsplash.com/photo-1565564277651-c2e8f8155017?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjB0b3VyJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzMTM5OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 4,
    title: 'Career Fair',
    date: 'Dec 3, 2024',
    time: '10:00 AM - 3:00 PM',
    location: 'Recreation Center',
    type: 'Academic',
    description: 'Connect with employers and explore internship opportunities.',
    imageUrl: 'https://images.unsplash.com/photo-1762330472769-cb8e6c8324d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJlZXIlMjBmYWlyJTIwbmV0d29ya2luZ3xlbnwxfHx8fDE3NjMxMzk5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | EventType>('All');

  const filteredEvents = events.filter(event => 
    activeFilter === 'All' ? true : event.type === activeFilter
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-black mb-2">Events</h1>
        <p className="text-gray-600">Discover upcoming events and activities for commuter students!</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        <Button
          onClick={() => setActiveFilter('Social')}
          variant={activeFilter === 'Social' ? 'default' : 'outline'}
          className={activeFilter === 'Social' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}
        >
          Social Events
        </Button>
        <Button
          onClick={() => setActiveFilter('Academic')}
          variant={activeFilter === 'Academic' ? 'default' : 'outline'}
          className={activeFilter === 'Academic' ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-600 text-blue-600 hover:bg-blue-50'}
        >
          Academic Events
        </Button>
        {activeFilter !== 'All' && (
          <Button
            onClick={() => setActiveFilter('All')}
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
          >
            Clear Filter
          </Button>
        )}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No events found with this filter.</p>
        </div>
      )}
    </main>
  );
}
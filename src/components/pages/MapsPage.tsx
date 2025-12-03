import { MapPin, Car, Coffee, Utensils, BookOpen } from 'lucide-react';
import { Card } from '../ui/card';
import GoogleMap from '../GoogleMap';

const locations = [
  {
    category: 'Parking',
    icon: Car,
    color: 'bg-blue-100 text-blue-600',
    places: [
      { name: 'G Deck', address: '30 Piedmont Ave SE' },
      { name: 'M Deck', address: '100 Piedmont Ave SE' },
      { name: 'S Deck', address: '75 Gilmer St SE' }
    ]
  },
  {
    category: 'Dining',
    icon: Utensils,
    color: 'bg-green-100 text-green-600',
    places: [
      { name: 'Panther Dining Hall', address: 'Student Center East' },
      { name: 'Chick-fil-A', address: 'Student Center West' },
      { name: 'Freshens', address: 'Library North' }
    ]
  },
  {
    category: 'Coffee Shops',
    icon: Coffee,
    color: 'bg-orange-100 text-orange-600',
    places: [
      { name: 'Starbucks', address: 'Library South' },
      { name: 'Dunkin\'', address: 'Aderhold Hall' },
      { name: 'Einstein Bros', address: 'Langdale Hall' }
    ]
  },
  {
    category: 'Study Spaces',
    icon: BookOpen,
    color: 'bg-purple-100 text-purple-600',
    places: [
      { name: 'GSU Library', address: '100 Decatur St SE' },
      { name: 'Law Library', address: '140 Decatur St SE' },
      { name: '55 Park Place', address: '55 Park Pl NE' }
    ]
  }
];



export function MapsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-black mb-2">Campus Maps</h1>
        <p className="text-gray-600">Navigate GSU buildings and facilities with ease</p>
      </div>

      {/* Map Placeholder */}
      <div className='mb-8'>
        <GoogleMap />
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => {
          const Icon = location.icon;
          return (
            <Card key={location.category} className="p-6 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${location.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-black">{location.category}</h3>
              </div>
              <div className="space-y-3">
                {location.places.map((place, index) => (
                  <div key={index} className="flex items-start gap-2 text-gray-700">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-gray-400" />
                    <div>
                      <div>{place.name}</div>
                      <div className="text-gray-500">{place.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </main>
  );
}

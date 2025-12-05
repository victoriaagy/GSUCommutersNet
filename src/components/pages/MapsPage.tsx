import { MapPin, Car, Coffee, Utensils, BookOpen } from 'lucide-react';
import { Card } from '../ui/card';
import { useRef } from 'react';
import GoogleMap, { MapHandle } from '../GoogleMap';

const locations = [
  {
    category: 'Parking',
    icon: Car,
    color: 'bg-blue-100 text-blue-600',
    places: [
      { name: 'G Deck', address: '30 Piedmont Ave SE', lat: 33.7531, lng: -84.3877 },
      { name: 'M Deck', address: '100 Piedmont Ave SE', lat: 33.7546, lng: -84.3870 },
      { name: 'S Deck', address: '75 Gilmer St SE', lat: 33.7539, lng: -84.3850 }
    ]
  },
  {
    category: 'Dining',
    icon: Utensils,
    color: 'bg-green-100 text-green-600',
    places: [
      { name: 'Panther Dining Hall', address: 'Student Center East', lat: 33.7525, lng: -84.3916 },
      { name: 'Chick-fil-A', address: 'Student Center West', lat: 33.7528, lng: -84.3918 },
      { name: 'Freshens', address: 'Library North', lat: 33.7539, lng: -84.3879 }
    ]
  },
  {
    category: 'Coffee Shops',
    icon: Coffee,
    color: 'bg-orange-100 text-orange-600',
    places: [
      { name: 'Starbucks', address: 'Library South', lat: 33.7534, lng: -84.3878 },
      { name: 'Dunkin\'', address: 'Aderhold Hall', lat: 33.7530, lng: -84.3884 },
      { name: 'Einstein Bros', address: 'Langdale Hall', lat: 33.7529, lng: -84.3870 }
    ]
  },
  {
    category: 'Study Spaces',
    icon: BookOpen,
    color: 'bg-purple-100 text-purple-600',
    places: [
      { name: 'GSU Library', address: '100 Decatur St SE', lat: 33.7533, lng: -84.3878 },
      { name: 'Law Library', address: '140 Decatur St SE', lat: 33.7521, lng: -84.3865 },
      { name: '55 Park Place', address: '55 Park Pl NE', lat: 33.7570, lng: -84.3874 }
    ]
  }
];

export function MapsPage() {
  const mapRef = useRef<MapHandle>(null);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-black mb-2">Campus Maps</h1>
        <p className="text-gray-600">Navigate GSU buildings and facilities with ease</p>
      </div>

      {/* Map */}
      <div className="mb-8">
        <GoogleMap ref={mapRef} />
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
                  <div
                    key={index}
                    onClick={() =>
                      mapRef.current?.moveToLocation(
                        place.lat,
                        place.lng,
                        place.name,
                        place.address
                      )
                    }
                    className="flex items-start gap-2 text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded"
                  >
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
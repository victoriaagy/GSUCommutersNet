import { useState } from "react";
import type { StudySpot } from "../App";
import { ChevronDown, Star } from "lucide-react";

interface StudySpotCardProps {
  spot: StudySpot;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

export function StudySpotCard({ spot, favorites, toggleFavorite }: StudySpotCardProps) {
  const [expanded, setExpanded] = useState(false);

  const isFavorite = favorites.includes(spot.id);

  const getBusyColors = (level?: string) => {
    switch (level) {
      case "Low":
        return { text: "text-green-600", bar: "bg-green-500", width: "33%" };
      case "Medium":
        return { text: "text-yellow-600", bar: "bg-yellow-500", width: "66%" };
      case "High":
        return { text: "text-red-600", bar: "bg-red-500", width: "100%" };
      default:
        return { text: "text-gray-600", bar: "bg-gray-400", width: "50%" };
    }
  };

  // Expanded emoji set — every amenity has something cute
  const amenityIcons: Record<string, string> = {
    WiFi: "📶",
    Quiet: "🤫",
    Food: "🍽️",
    "Power Outlets": "🔌",
    Seating: "🛋️",
    Whiteboards: "📝",
    "Window Views": "🌆",
    "Group Tables": "🧑‍🤝‍🧑",
    "Private Desks": "🪑",
    "Nap Pods": "🛌",
    "Collaborative Tables": "🤝",
    "Digital Media": "💻",
    "Nearby Food": "🍱",
    Default: "✨", // fallback
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={spot.imageUrl} alt={spot.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{spot.name}</h2>
            <p className="text-gray-600 text-sm">{spot.description}</p>
          </div>
          {/* Favorite Button — always yellow star */}
          <button
            onClick={() => toggleFavorite(spot.id)}
            className="ml-2 text-yellow-500 hover:text-yellow-600"
          >
            <Star size={22} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center justify-between w-full text-blue-600 hover:text-blue-800 font-medium"
        >
          {expanded ? "Hide details" : "Show details"}
          <ChevronDown
            size={18}
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </button>

        {/* Expandable Section */}
        {expanded && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="mb-2"><strong>Hours:</strong> {spot.hours}</p>
            {spot.location && <p className="mb-2"><strong>Location:</strong> {spot.location}</p>}

            {/* Busy Level Indicator */}
            {spot.busyLevel && (
              <div className="mb-2">
                <p className={`font-medium ${getBusyColors(spot.busyLevel).text}`}>
                  Busy Level: {spot.busyLevel}
                </p>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className={`h-2 rounded ${getBusyColors(spot.busyLevel).bar}`}
                    style={{ width: getBusyColors(spot.busyLevel).width }}
                  />
                </div>
              </div>
            )}

            {/* Amenities */}
            {spot.amenities && (
              <div className="flex flex-wrap gap-2 mt-2">
                {spot.amenities.map((a) => (
                  <span
                    key={a}
                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {amenityIcons[a] || amenityIcons.Default} {a}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

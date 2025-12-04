import { useState, useEffect } from "react";
import { StudySpotCard } from "../StudySpotCard";
import { Button } from "../ui/button";
import type { StudySpot, SpotType } from "../../App";

interface StudySpotsPageProps {
  studySpots: StudySpot[];
}

export function StudySpotsPage({ studySpots }: StudySpotsPageProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | SpotType | 'Favorites'>('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const filteredSpots = studySpots.filter((spot) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Favorites") return favorites.includes(spot.id);
    return spot.type === activeFilter;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-black mb-2">Study Spots</h1>
        <p className="text-gray-600">Find your perfect place to study on campus.</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 flex-wrap mb-8">
        <Button
          onClick={() => setActiveFilter("Quiet")}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            activeFilter === "Quiet"
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
              : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-50"
          }`}
        >
          🧘 Quiet Spots
        </Button>

        <Button
          onClick={() => setActiveFilter("Active")}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            activeFilter === "Active"
              ? "bg-pink-100 text-pink-800 hover:bg-pink-200"
              : "bg-white border border-pink-300 text-pink-600 hover:bg-pink-50"
          }`}
        >
          🕺 Active Spots
        </Button>

        <Button
          onClick={() => setActiveFilter("Favorites")}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            activeFilter === "Favorites"
              ? "bg-yellow-200 text-yellow-800 hover:bg-yellow-300"
              : "bg-white border border-yellow-300 text-yellow-600 hover:bg-yellow-50"
          }`}
        >
          ⭐ Favorites
        </Button>

        {activeFilter !== "All" && (
          <Button
            onClick={() => setActiveFilter("All")}
            className="rounded-full px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            🔄 Clear Filter
          </Button>
        )}
      </div>

      {/* Study Spots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSpots.map((spot) => (
          <StudySpotCard
            key={spot.id}
            spot={spot}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredSpots.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No study spots found with this filter.</p>
        </div>
      )}
    </main>
  );
}

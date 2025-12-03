import { Clock, Volume2, VolumeX, Wifi } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import type { StudySpot } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StudySpotCardProps {
  spot: StudySpot;
}

export function StudySpotCard({ spot }: StudySpotCardProps) {
  // Auto-detect GSU WiFi spots
  const hasGSUWifi =
    spot.name.includes("GSU") ||
    spot.name.includes("Library") ||
    spot.name.includes("Panther") ||
    spot.name.includes("55 Park Place") ||
    spot.name.includes("Centennial") ||
    spot.name.includes("Law Library") ||
    spot.name.includes("CMII");

  return (
    <Card
      tabIndex={0} // Makes the card focusable for keyboard navigation
      className="overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-2xl bg-white focus:outline focus:outline-blue-300"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <ImageWithFallback
          src={spot.imageUrl}
          alt={spot.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Spot Name */}
        <h3 className="text-black font-semibold text-lg mb-2">{spot.name}</h3>

        {/* Badges: Type + Busy Level */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {/* Type Badge */}
          <Badge
            aria-label={`Study spot type: ${spot.type}`}
            className={`${
              spot.type === 'Quiet'
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-black text-white hover:bg-black/90'
            } cursor-default rounded-full flex items-center gap-1.5 px-3 py-1.5 text-sm`}
          >
            {spot.type === 'Quiet' ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
            {spot.type}
          </Badge>

          {/* Optional Busy Level */}
          {spot.busyLevel && (
            <Badge
              aria-label={`${spot.busyLevel} busy level`}
              className="bg-yellow-100 text-yellow-700 rounded-full px-3 py-1.5 text-sm"
            >
              {spot.busyLevel} Busy
            </Badge>
          )}

          {/* Optional Amenities */}
          {hasGSUWifi && (
            <Badge
              aria-label="WiFi Access at GSU"
              className="bg-green-100 text-green-700 rounded-full hover:bg-green-200 flex items-center gap-1 px-3 py-1.5 text-sm"
            >
              <Wifi className="h-3 w-3" />
              WiFi Access (GSU)
            </Badge>
          )}
          {spot.amenities?.map((amenity) => (
            <Badge
              key={amenity}
              aria-label={amenity}
              className="bg-purple-100 text-purple-700 rounded-full px-3 py-1.5 text-sm"
            >
              {amenity}
            </Badge>
          ))}
        </div>

        {/* Hours */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Clock className="h-4 w-4" />
          <span>{spot.hours}</span>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-snug line-clamp-3">{spot.description}</p>
      </div>
    </Card>
  );
}

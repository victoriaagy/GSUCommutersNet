import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export type MapHandle = {
  moveToLocation: (lat: number, lng: number) => void;
};

const GoogleMap = forwardRef<MapHandle>((props, ref) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useImperativeHandle(ref, () => ({
    moveToLocation(lat: number, lng: number) {
      if (mapInstance.current) {
        mapInstance.current.panTo({ lat, lng });
        mapInstance.current.setZoom(18);
      }
    },
  }));



  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDJZU7vW5MA3fRfS_eN_pEt3E6ZfuTHLuc&callback=initMap";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    (window as any).initMap = () => {
      if (!mapRef.current) return;

      const gsu = { lat: 33.7537, lng: -84.3858 };

      const map = new google.maps.Map(mapRef.current, {
        zoom: 16,
        center: gsu,
      });

      new google.maps.marker.AdvancedMarkerElement({
        position: gsu,
        map: mapInstance.current,
        title: 'Georgia State University',
      });

      new google.maps.marker.AdvancedMarkerElement({
        position: { lat: 33.7746, lng: -84.3963 },
        map: mapInstance.current,
        title: 'Library',
      });

      new google.maps.marker.AdvancedMarkerElement({
        position: { lat: 33.7525, lng: -84.3915 },
        map: mapInstance.current,
        title: 'Student Center',
      });
    };

    return () => {
      delete (window as any).initMap;
    };
  }, []);

  
  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "700px", borderRadius: "10px" }}
    />
  );
}

)

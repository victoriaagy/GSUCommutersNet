import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

export type MapHandle = {
  moveToLocation: (lat: number, lng: number, name: string, address: string) => void;
};

const GoogleMap = forwardRef<MapHandle>((props, ref) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const activeMarker = useRef<google.maps.Marker | null>(null);
  const infoWindow = useRef<google.maps.InfoWindow | null>(null);

  useImperativeHandle(ref, () => ({
    moveToLocation(lat, lng, name, address) {
      if (!mapInstance.current) return;

      // Move map
      mapInstance.current.panTo({ lat, lng });
      mapInstance.current.setZoom(18);

      // Remove previous marker
      if (activeMarker.current) {
        activeMarker.current.setMap(null);
      }

      // New marker
      activeMarker.current = new google.maps.Marker({
        position: { lat, lng },
        map: mapInstance.current,
        title: name,
      });

      // Create InfoWindow if not created
      if (!infoWindow.current) {
        infoWindow.current = new google.maps.InfoWindow();
      }

      // Custom content HTML
      const content = `
        <div style="font-family:Arial; padding: 6px 0;">
          <div style="font-size:16px; font-weight:bold; margin-bottom:4px;">${name}</div>
          <div style="font-size:14px; margin-bottom:6px;">${address}</div>
          <a href="https://www.google.com/maps?q=${lat},${lng}" target="_blank"
            style="color:#1a73e8; text-decoration:none; font-size:14px;">
            View on Google Maps
          </a>
        </div>
      `;

      infoWindow.current.setContent(content);
      infoWindow.current.open({
        anchor: activeMarker.current,
        map: mapInstance.current,
      });
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

      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 33.7537, lng: -84.3858 },
        zoom: 16,
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
});

export default GoogleMap;
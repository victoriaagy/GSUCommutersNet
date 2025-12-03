import { useEffect, useRef } from 'react';

export default function GoogleMap(){
    const mapRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDJZU7vW5MA3fRfS_eN_pEt3E6ZfuTHLuc&callback=initMap"
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        (window as any).initMap = () => {
            if (!mapRef.current) return;

            const gsu = {lat: 33.7537, lng: -84.3858};

            const map = new google.maps.Map(mapRef.current, { 
                    zoom: 16,
                    center: gsu,
                });
                //
                new google.maps.Marker({
                    position: gsu,
                    map: map,
                    title: 'Georgia State University',
               });

               new google.maps.Marker({
                    position: {lat: 33.7746, lng: -84.3963}, /*Library*/
                    map: map,
                    title: 'Library',
               });

               new google.maps.Marker({
                    position: {lat: 33.7525, lng: -84.3915}, /*Student Center*/
                    map: map,
                    title: 'Student Center',
               });
               
        }
    }
)


}
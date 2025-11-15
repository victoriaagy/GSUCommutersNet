function initMap() {
                const gsu = {lat: 33.7537, lng: -84.3858}/*gsu coordinates*/
                const googleMap = new google.maps.Map(document.getElementById("googleMap"), { 
                    zoom: 16,
                    center: gsu,
                });
                //
                new google.maps.Marker({
                    position: gsu,
                    map: googleMap,
                    title: 'Georgia State University',
               });
            }   
var map = L.map('map').setView([40.7128, -74.0060], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('data/locations.geojson')
    .then(res => res.json())
    .then(data => {
    L.geoJSON(data, {
        renderer: L.canvas(),
        style: function(feature) {
            const category = feature.properties.category;
            if (category === 'roadtrip') {
                return { color: 'gray' };
            } else if (category === 'hike') {
                return { color: 'green' };
            } else if (category === 'observation') {
                return { color: 'red' };
            } else {
                return { color: 'blue' };
            }
        },
        pointToLayer: function(feature, latlng) {
            const props = feature.properties;
            if (props.markerImage) {
                const photoIcon = L.icon({
                    iconUrl: props.markerImage,
                    iconSize: [30, 30],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -30],
                    className: "photo-marker"
                });

                return L.marker(latlng, { icon: photoIcon });
            }
            return L.marker(latlng);
        },
        onEachFeature: function (feature, layer) {
            const props = feature.properties;

            const media = props.media[0];

            let mediaHTML = '';

            if (media.type === 'image') {
            mediaHTML = `<img src="${media.src}" width="250">`;
            }

            const popupContent = `
                <h3>${props.title}</h3>
                <p>${props.description}</p>
                ${mediaHTML}  
            `;

            layer.bindPopup(popupContent);
        }
    }).addTo(map);
});




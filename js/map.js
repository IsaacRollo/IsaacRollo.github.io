var map = L.map('map').setView([40.7128, -74.0060], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

fetch('data/locations.geojson')
    .then(res => res.json())
    .then(data => {
    L.geoJSON(data, {
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




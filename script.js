async function main() {
    function init() {
        let map = initMap();
        let searchResultLayer = L.layerGroup();      
        map.addLayer(searchResultLayer);
       
        window.addEventListener('DOMContentLoaded', (event) => {
            document.querySelector('#search-btn').addEventListener('click', async () => {
                let query = document.querySelector('#search-input').value;
                let center = map.getBounds().getCenter();
                let results = await search(center.lat, center.lng, query);

                searchResultLayer.clearLayers();

                let searchResults = document.querySelector('#search-results');
                for (let eachVenue of results.response.venues) {
                    let coordinate = [eachVenue.location.lat, eachVenue.location.lng];
                    let marker = L.marker(coordinate);
                    marker.bindPopup(`<div><h1>${eachVenue.name}</h1></div>`);
                    marker.addTo(searchResultLayer);


                    let resultElement = document.createElement('div');
                    resultElement.className = "search-result";
                    resultElement.innerHTML = eachVenue.name;
                    resultElement.addEventListener('click', function () {
                        map.flyTo(coordinate, 16);
                        marker.openPopup();
                    })
                    searchResults.appendChild(resultElement);
                }

            })


            document.querySelector('#toggle-search-btn').addEventListener('click', async () => {
                let currentDisplay = document.querySelector("#search-container").style.display;
                if (!currentDisplay || currentDisplay == 'none') {
                    document.querySelector("#search-container").style.display = "block";
                } else {
                    document.querySelector("#search-container").style.display = "none";
                }
            })
        })
    }

    init();
}


function initMap() {
    let singapore = [1.29, 103.85];
    let map = L.map('singapore-map');
    map.setView(singapore, 13);


    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
    }).addTo(map);

    return map;
}

main();
function addSearchResultToMap(map, searchResultLayer, searchResultDiv, result, searchMarkers) {
    let marker = L.marker([result.location.lat, result.location.lng]);
    marker.bindPopup(`<div><h1>${result.name}</h1>`);
    marker.addTo(searchResultLayer);
    searchMarkers.push(marker);


    let resultElement = document.createElement('div');
    resultElement.innerHTML = result.name;
    resultElement.addEventListener('click', () => {
        map.flyTo([result.location.lat, result.location.lng], 16);
        marker.openPopup();
    })


    searchResultDiv.appendChild(resultElement);
}
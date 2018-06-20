export function initMap(mapContainer, options = {
    coordinate: [-25.363, 131.044],
    zoom: 4,
    contentString: '<div class="content"><h4>Address</h4><p>Explanation</p></div>',
    marker: 'https://dummyimage.com/32x32/ff0000/ff0000.jpg',
    title: 'Uluru (Ayers Rock)'
}) {
    let map = new google.maps.Map(mapContainer, {
        zoom: options.zoom,
        center: {lat: options.coordinate[0], lng: options.coordinate[1]}
    });

    let infowindow = new google.maps.InfoWindow({
        content: options.contentString
    });

    let marker = new google.maps.Marker({
        position: {lat: options.coordinate[0], lng: options.coordinate[1]},
        map: map,
        title: options.title,
        icon: options.marker
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
};
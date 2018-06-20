export function initMap(mapContainer) {

    let uluru = {lat: -25.363, lng: 131.044};
    let map = new google.maps.Map(mapContainer, {
        zoom: 4,
        center: uluru
    });

    let contentString = '<div class="content"><h4>Address</h4><p>Explanation</p></div>';

    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    let image = 'https://dummyimage.com/32x32/ff0000/ff0000.jpg';
    let marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Uluru (Ayers Rock)',
        icon: image
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
};
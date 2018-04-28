'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var initMap = function initMap(mapContainer) {
    _classCallCheck(this, initMap);

    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(mapContainer, {
        zoom: 4,
        center: uluru
    });

    var contentString = '<div class="content"><h4>Address</h4><p>Explanation</p></div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var image = 'https://dummyimage.com/32x32/ff0000/ff0000.jpg';
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Uluru (Ayers Rock)',
        icon: image
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
};
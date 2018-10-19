export function initMap(mapContainer) {

    let uluru = {lat: 35.3795884, lng: 34.086817};
    let map = new google.maps.Map(mapContainer, {
        zoom: 13,
        center: uluru
    });

    let contentString = '<div class="content"><h4>' + "Noah's Ark Deluxe Hotel & Spa" + '</h4><p>İskele Bafra Turizm Bölgesi, Vokolida</p></div>';

    let infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    let image = 'https://dummyimage.com/32x32/ff0000/ff0000.jpg';
    let marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'Uluru (Ayers Rock)'
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });

};
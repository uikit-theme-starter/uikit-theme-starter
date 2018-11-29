import 'uikit';
import Swiper from 'swiper';


require('@/js/picker.js');
require('@/js/picker.date');

//import validation from '@/templates/components/form/scripts/validation';
//import '@/templates/components/form/scripts/mask';
import * as map from '@/templates/components/map/js/map';

let mapContainer = document.getElementById('map-default');
if (mapContainer) {
    map.initMap(mapContainer);
}

var datepicker = document.querySelector('.datepicker');

if (datepicker) {
    var lang = $('html').attr('lang');

    var pickerOptionsTr = {
        monthsFull: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        weekdaysShort: ["Pa", "Pt", "Sl", "ça", "Pe", "Cu", "Ct"],
        monthsShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
        weekdaysFull: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
        showMonthsShort: true,
        firstDay: 1,
        format: 'dd-mm-yyyy',
        today: 'Bugün',
        clear: 'Temizle',
        close: 'Kapat',
        labelMonthNext: 'Sonraki Ay',
        labelMonthPrev: 'Önceki Ay',
        labelMonthSelect: 'Ayı Seç',
        labelYearSelect: 'Yılı Seç'
    };

    var pickerOptionsEn = {
        monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        showMonthsShort: true,
        firstDay: 1,
        format: 'dd-mm-yyyy',
        today: 'Today',
        clear: 'Clear',
        close: 'Close',
        labelMonthNext: 'Next month',
        labelMonthPrev: 'Previous month',
        labelMonthSelect: 'Select a month',
        labelYearSelect: 'Select a year',
    };

    switch (lang) {
        case 'tr':
            $('.datepicker').pickadate(pickerOptionsTr);
            break;
        case 'en':
            $('.datepicker').pickadate(pickerOptionsEn);
            break;
    }
}

var swiperContainer = document.querySelector('.swiper-container');

if (swiperContainer) {
    var galleryTop = new Swiper('.swiper-activity-gallery', {
        spaceBetween: 0,
        loop: true,
        parallax: true,
        slidesPerView: 1,
        //centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
    });

    var galleryThumbs = new Swiper('.swiper-activity-content', {
        loop: true,
        spaceBetween: 10,
        touchRatio: 0.2,
    });

    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
}

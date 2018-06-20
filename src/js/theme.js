import UIkit from 'uikit';
//import * as map from '../components/map/default/default';

let mapContainer = document.getElementById('map-default');
if (mapContainer) {
    map.initMap(mapContainer);
}

<<<<<<< HEAD:src/js/theme.js
//import * as video from '../components/video/default/default';

//video.init();

//$(function () {
=======
import * as video from '../../src/components/video/default/default';

video.init();

$(function () {
>>>>>>> 0d540306c6534192c4f4d60cc2d4b15898a10104:src/theme/theme.js

    /*
     * 1 - Mask & Validation
     * 2 - Swiper Default
     * 3 - Tab Nav Mobile
     */

    // 1
    // ========================================================================

<<<<<<< HEAD:src/js/theme.js
    //$('[type="tel"]').mask('(000) 000-0000');
=======
    $('[type="tel"]').mask('(000) 000-0000');
>>>>>>> 0d540306c6534192c4f4d60cc2d4b15898a10104:src/theme/theme.js

    /*$.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]*$/.test(value);
    });

    let message = "Lütfen ilgili alanı doldurunuz.";

    $('#form-default').validate({
        rules: {
            input: {
                required: true,
                lettersonly: true
            },
            select: {
                required: true,
            },
            textarea: {
                required: true,
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 14
            },
            radio: {
                required: true,
            },
            checkbox1: {
                required: true,
            },
            checkbox2: {
                required: true,
            }
        },
        messages: {
            input: message,
            radio: message,
            email: message,
            phone: message,
            textarea: message,
            checkbox1: message,
            checkbox2: message
        },
        submitHandler: function (form) {
            form.submit();
        }
    });*/

    // 2 - Swiper Default
    // ========================================================================

    //var swiper = new Swiper('.swiper-container', {});

    // 3 - Tab Nav Mobile
    // ========================================================================

    /*var total = 0;
    var padding = 0;
    var tabNav = $('.tab-default .uk-tab');

    tabNav.find('li').each(function () { 
        total += parseInt(
            $(this).width()
        );

        padding += parseInt(
            $(this).css('padding-left')  
        );

    });

    tabNav.width(total + padding + 4);*/

//});
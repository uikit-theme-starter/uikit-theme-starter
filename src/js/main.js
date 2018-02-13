$(function () {

    /*
     * 1 - Mask & Validation
     * 2 - Swiper Default
     * 3 - Tab Nav Mobile
     */


    // 1
    // ========================================================================

    $('.mask-phone').mask('(000) 000-0000');

    $.validator.addMethod("lettersonly", function (value, element) {
        return this.optional(element) || /^[a-zA-ZçÇğĞiİöÖşŞüÜ\s]*$/.test(value);
    });

    var message = "Lütfen ilgili alanı doldurunuz."

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
    });

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

});
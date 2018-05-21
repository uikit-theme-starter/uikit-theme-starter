function sliderInit() {
    window.centerScale = new Swiper('.swiper-center-scale', {
        slidesPerView: 3,
        spaceBetween: 70,
        centeredSlides: true,
        loop: true,
        parallax: true,
        navigation: {
            nextEl: '[uk-slidenav-next]',
            prevEl: '[uk-slidenav-previous]',
        }
    });
}

function sliderResize() {
    let width = $(window).width();
    let container = document.querySelector('.swiper-container');
    let slides  = container.querySelectorAll('.swiper-slide>*');
    if (width < 640) {
        if (window.centerScale !== undefined) {
            window.centerScale.destroy(true, true);
            window.centerScale = undefined;
            container.classList.add('uk-overflow-auto');
            slides.forEach(function (e) {
                e.setAttribute('style', '');
            });
        }
    } else {
        if (window.centerScale === undefined) {
            sliderInit();
            container.classList.remove('uk-overflow-auto');
        }
    }
}

sliderResize();

$(() => {
    $(window).resize(() => {
        sliderResize();
    });
});
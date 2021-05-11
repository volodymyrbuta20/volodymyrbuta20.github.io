'use strict';

window.addEventListener('DOMContentLoaded', () => {

    $(document).ready(function() {

        $('.hamburger').click(function () {
            $('.hamburger, .menu').toggleClass('active');
        });

        $('.testimonials__carousel').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 5000,
            arrows: false,
            dots: true,
        });

        $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('.header').addClass('header__active');
            } else {
                $('.header').removeClass('header__active');
            }
        });

        $(window).scroll(function () {
            if ($(this).scrollTop() > 10) {
                $('.promo__img').addClass('go-top');
                $('#back-top').fadeIn(500);
            } else {
                $('.promo__img').removeClass('go-top');
                $('#back-top').fadeOut(500);
            }
        });

        $(window).scroll(function() {
            if ($(this).scrollTop() > 800) {
                $('.pageup').fadeIn('slow');
            } else {
                $('.pageup').fadeOut();
            }
        });

        $(function () {
            $('.pageup').click(function () {
                $("html, body").animate({scrollTop: 0}, 1000);
            });
        });

        const form = document.querySelector('.footer__form'),
            confirm = form.querySelector('.footer__confirmation'),
            input = form.querySelector('.footer__input');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            let email = input.value;

            if (email === null) {
                alert("Enter your Email");
            } else {
                confirm.style.display = "block";
            }

            event.target.reset();
        });

        $('.menu a').on('click', function () {
            let href = $(this).attr("href");

            $('.menu, .hamburger').removeClass('active');
            $("html, body").animate({scrollTop: $(href).offset().top},
            {
                duration: 330,
                easing: "linear",
            });
            return false;
        });

        new WOW().init();
    });
});


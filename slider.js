/* =============================================
   LaunchBoost — Swiper Slider
   ============================================= */

var serviceSwiper = new Swiper('.serviceSwiper', {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,
  grabCursor: true,
  centeredSlides: false,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});

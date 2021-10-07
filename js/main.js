

$( document ).ready(function() {
  var swiper
  var window_width
  getGeoLocation()
  window_width = $(window).width()
  if (window_width < 768){
    hideNavbar()
  }
  hamburgerClickHandler()
  var swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    effect: 'cube',
    cubeEffect: {
      slideShadows: true,
    },
    allowTouchMove: false,
    autoplay: {
     delay: 5000
    },
    speed: 600
  });
})
$( window ).resize(function() {
  window_width = $(window).width()
  if (window_width < 768)
    hideNavbar()
  else if (window_width >= 768){
    showNavbar()
    $('#swiper').css('margin-top', '0')
    $('#first-section').css('margin-top', '0')
  }
})

function hideNavbar() {
  $(".navbar-nav").css('z-index', '-1')
}
function showNavbar() {
  $(".navbar-nav").css('z-index', '0')
  $('.navbar-nav').removeClass('show-navbar-nav')
  $('.hamburger').removeClass('is-active')
}

function hamburgerClickHandler() {
  $(".hamburger").click(function() {
    hamburgerAction()
  })
}
function hamburgerAction() {
  if ($('.hamburger').hasClass('is-active')){
    $('.hamburger').removeClass('is-active')
    $('.navbar-nav').removeClass('show-navbar-nav')
    $('#swiper').css('margin-top', '0')
    $('#first-section').css('margin-top', '0')
    $('.navbar-nav').css('z-index', '-1')
  } else{
    $('.hamburger').addClass('is-active')
    $('.navbar-nav').addClass('show-navbar-nav')
    $('#swiper').css('margin-top', '4.5em')
    // $('#first-section').css('margin-top', '2em')
    setTimeout(function() {$('.navbar-nav').css('z-index', '0')}, 1000)
  }
}
function getGeoLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
  haz_algo(position.coords.latitude, position.coords.longitude);
});
}

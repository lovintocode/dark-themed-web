$( document ).ready(function() {
  // Variables //
  var swiper
  var window_width
  var myLazyLoad

  window_width = $(window).width()
  if (window_width < 768){
    hideNavbar()
  }
  // hamburguer menu handler
  hamburgerClickHandler()
  // swiper menu handler
  swiperHandler()
  // preloader start handler
  preloaderHandler()
  // image lazy loader
  lazyLoader()
  // loadDinamicImages()
  equalHeightHandler()
})
$( window ).resize(function() {
  window_width = $(window).width()
  if (window_width <= 768)
    hideNavbar()
  else if (window_width > 768){
    showNavbar()
    $('#swiper').css('margin-top', '0')
    $('#first-section').css('margin-top', '0')
  }
})
function swiperHandler() {
  swiper = new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    direction: 'horizontal',
    loop: true,
    // effect: 'cube',
    // cubeEffect: {
    //   slideShadows: true,
    // },
    allowTouchMove: true,
    autoplay: {
     delay: 5000
   },
   speed: 600
 });
}
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
    $('.hamburger').attr('disabled', true)
    setTimeout(function() {
      $('.hamburger').attr('disabled', false)
    },1000)
  } else{
    $('.hamburger').addClass('is-active')
    $('.navbar-nav').addClass('show-navbar-nav')
    $('#swiper').css('margin-top', '4.5em')
    $('.hamburger').attr('disabled', true)
    setTimeout(function() {
      $('.navbar-nav').css('z-index', '0')
      $('.hamburger').attr('disabled', false)
    }, 1000)
  }
}
function preloaderHandler() {
  setTimeout(function() {$('#preloader').fadeOut('slow')}, 3000)
}

function lazyLoader() {
  myLazyLoad = new LazyLoad({
    elements_selector: ".lazy"
  });
}
function equalHeightHandler() {
  $('.equalheight').matchHeight();
}
// function loadDinamicImages() {
//   let doc = document.documentElement;
//   let window_top
//   $( window ).scroll(function() {
//     window_top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
//     console.log(window_top)
//     console.log(getOffsetY('image-gallery') - 100)
//   })
// }

// function getOffsetY(el) {
//   var offsets = $('#'+el).offset();
//   var top = offsets.top;
//   return top
// }


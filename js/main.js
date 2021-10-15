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
  loadDinamicImages()
  equalHeightHandler()
  // Manages recipes nav
  recipesNavHandler()
})
$( window ).resize(function() {
  window_width = $(window).width()
  if (window_width <= 768)
    hideNavbar()
  else if (window_width > 768){
    showNavbar()
    $('#home-wrapper').css('margin-top', '0')
    $('#contact-wrapper').css('margin-top', '0')
    $('#recipes-wrapper').css('margin-top', '0');
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
    $('#home-wrapper').css('margin-top', '0')
    $('#contact-wrapper').css('margin-top', '0')
    $('#recipes-wrapper').css('margin-top', '0');
    $('.navbar-nav').css('z-index', '-1')
    $('.hamburger').attr('disabled', true)
    setTimeout(function() {
      $('.hamburger').attr('disabled', false)
    },1000)
  } else{
    $('.hamburger').addClass('is-active')
    $('.navbar-nav').addClass('show-navbar-nav')
    $('#home-wrapper').css('margin-top', '4.5em')
    $('#contact-wrapper').css('margin-top', '4.5em')
    $('#recipes-wrapper').css('margin-top', '4.5em');
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
function recipesNavHandler() {
  $('.hidden-menu').hide()
  $(".recipes-item").click(function() {
    let list_id = this.id
    $('#'+list_id+'.hidden-menu').toggle('normal')
  })
}
function loadDinamicImages() {
  var observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true)
      setTimeout(function() {
        $('#image-gallery .card:first-child()').css('margin-top', '0')
      },200)
    setTimeout(function() {
      $('#image-gallery .card:nth-child(2)').css('margin-top', '0')
    },300)
    setTimeout(function() {
      $('#image-gallery .card:last-child()').css('margin-top', '0')
    },400)
  }, { threshold: [0]
  });

  observer.observe(document.querySelector("#image-gallery"));
}

$( window ).resize(function() {
  // console.log($("#recipes-box .box-container .box .calories")[0].offsetWidth)
  // console.log($("#recipes-box .box-container .box .calories")[0].offsetHeight)
  window_width = $(window).width()
  if (window_width <= 768)
    hideNavbar()
  else if (window_width > 768){
    showNavbar()
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
}
function showNavbar() {
  $('.navbar-nav').removeClass('show-navbar-nav')
  $('.hamburger-hidden').removeClass('is-active')
}

function hamburgerClickHandler() {
  $(".hamburger").click(function() {
    hamburgerAction()
  })
}
function hamburgerAction() {
  if ($('.hamburger').hasClass('is-active')){
    $('.hamburger-hidden').removeClass('is-active')
    $('.navbar-nav').removeClass('show-navbar-nav')
    $('#wrapper').css({
      'height': 'auto',
      'overflow': 'auto'
    });
    $('.hamburger').attr('disabled', true)
    setTimeout(function() {
      $('.hamburger').attr('disabled', false)
    },600)
  } else{
    $('.hamburger-hidden').addClass('is-active')
    $('.navbar-nav').addClass('show-navbar-nav')
    $('.hamburger').attr('disabled', true)
    setTimeout(function() {
      $('.hamburger').attr('disabled', false)
    }, 600)
    $('#wrapper').css({
      'height': '100vh',
      'overflow': 'hidden'
    });
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
  if ($(".moving-box").length > 0){
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
    })
    observer.observe(document.querySelector("#image-gallery"))
  }
}
function sessionHandler() {
  $('#login-btn').click(function() {
    $('.credentials-box').css('z-index', '-1')
    $('#register-form').css('width', '0')
    setTimeout(function() {
      $('#register-form').css('display', 'none')
      $('#login-form').css('display', 'flex')
    }, 800)
    setTimeout(function() {
      $('#login-form').css('width', '90%')
    }, 900)
    setTimeout(function() {
      $('.credentials-box').css('z-index', '0')
    }, 1200)
  });
  $('#register-btn').click(function() {
    $('.credentials-box').css('z-index', '-1')
    $('#login-form').css('width', '0')
    setTimeout(function() {
      $('#login-form').css('display', 'none')
      $('#register-form').css('display', 'flex')
    }, 800)
    setTimeout(function() {
      $('#register-form').css('width', '90%')
    }, 900)
    setTimeout(function() {
      $('.credentials-box').css('z-index', '0')
    }, 1200)
  })
}

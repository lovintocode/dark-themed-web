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
  // sets move on certain images on web (when scroll reaches certain point)
  loadDinamicImages()
  // equal height on divs
  equalHeightHandler()
  // manages recipes nav filtering
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
function recipesNavHandler() {
  var prevent_ajax_counter = 0
  var ingredient = ''
  var cuisine_type = 'None'
  var meal_type = 'None'
  var diet_label = 'None'
  var health_label = 'None'

  $('.selection-box').change(function() {
    cuisine_type = $('#cuisine_type').find('.option-box:selected').text()
    meal_type = $('#meal_type').find('.option-box:selected').text()
    diet_label = $('#diet_label').find('.option-box:selected').val()
    health_label = $('#health_label').find('.option-box:selected').val()
    if (meal_type == '')
      meal_type = 'None'
    if (diet_label == '')
      diet_label = 'None'
    if (health_label == '')
      health_label = 'None'
    if (ingredient.length > 1) {
      sendAjaxRecipe(ingredient, cuisine_type, meal_type, diet_label, health_label)
    }
  })
  $('#recipe-search').on('input', function() {
    ingredient = $(this).val()
    prevent_ajax_counter ++
    setTimeout(function() {
      prevent_ajax_counter --
      if (ingredient.length > 1 && prevent_ajax_counter == 0) {
        sendAjaxRecipe(ingredient, cuisine_type, meal_type, diet_label, health_label)
      }
    }, 1500)
  })
}
function sendAjaxRecipe(ingredient, cuisine_type, meal_type, diet_label, health_label) {
  $.ajax({
    url: 'php/api-managment/api-managment.php',
    method: 'post',
    data: { 'ingredient':ingredient,'cuisine_type':cuisine_type,'meal_type':meal_type,'diet_label':diet_label,'health_label':health_label},
    success: function(data){
        // Cuando se pasa la consulta aqui se muestran los datos data recibidos por el echo
        var parsed_data = JSON.parse(data)
        console.log(parsed_data['hits'])
        for (let i = 0; i < parsed_data['hits'].length; i++) {
          console.log(parsed_data['hits'][i]['recipe']['label'])
        }
      },
      error: function() {
        console.log('error recipe')
      }
    });
}



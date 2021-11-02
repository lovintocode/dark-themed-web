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
  // manages selection boxes and filtering
  selectionBoxHandler()
})

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
  if ($('#swiper').length > 0)
    swiperHandler()
  // preloader start handler
  preloaderHandler()
  // image lazy loader
  if ($('.lazy').length > 0)
    lazyLoader()
  // sets move on certain images on web (when scroll reaches certain point)
  loadDinamicImages()
  // equal height on divs
  equalHeightHandler()
  // manages selection boxes and filtering
  if ($('.selection-box').length > 0)
    selectionBoxHandler()
  // manages Recipes pagination
  manageRecipesPagination()
  // Handles modal events
  modalHandler()
  // Handles session
  sessionHandler()
  // Handles plan questions
  planQuestionsHandler()
})

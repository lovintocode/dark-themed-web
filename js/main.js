$( document ).ready(function() {
  // Variables //
  var swiper
  var window_width
  var myLazyLoad

  window_width = $(window).width()
  if (window_width < 768){
    hideNavbar()
  }
  // Hamburguer menu handler
  hamburgerClickHandler()
  // Swiper menu handler
  if ($('#swiper').length > 0)
    swiperHandler()
  // Preloader start handler
  preloaderHandler()
  // Image lazy loader
  if ($('.lazy').length > 0)
    lazyLoader()
  // Sets move on certain images on web (when scroll reaches certain point)
  // loadDinamicImages()
  // Equal height on divs (del)
  equalHeightHandler()
  // Manages selection boxes and filtering
  if ($('.selection-box').length > 0)
    selectionBoxHandler()
  // Manages Recipes pagination
  manageRecipesPagination()
  // Handles modal events
  modalHandler()
  // Handles session
  sessionHandler()
  // Handles plan questions
  planQuestionsHandler()
  // Handles plan clicks (bbdd insertion)
  handlePlanClickers()
  // Handles plan styling
  managePlanDisplays()
  nutritionalModalHandler()
  if ($('#plan-container').length > 0) {
    ajaxGetUserResponse('')
    $(document).on('click', '#create-plan', function() {
      ajaxGetUserResponse('')
    })
  }
})

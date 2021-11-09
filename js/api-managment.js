var pagination_urls = []
var parsed_response = []
var first_page_url = ''
var next_page_url = ''
var recipe_variables =
{
  ingredient: '',
  cuisine_type: '',
  meal_type: '',
  diet_label: '',
  health_label: ''
}
var page_reset = false
function selectionBoxHandler() {
  var prevent_ajax_counter = 0
  $('.select-wrapper').click(function() {
    $(this).find('.select').toggleClass('open')
  })

  $(window).click(function(e){
    for (const select of document.querySelectorAll('.select')) {
      if (!select.contains(e.target)) {
        select.classList.remove('open');
      }
    }
  })
  $('.option-box').click(function() {
    if (!$(this).hasClass('selected')) {
      $(this).parent().find('.option-box.selected').removeClass('selected')
      $(this).addClass('selected')
      $(this).closest('.select').find('.selection-box span').text($(this).text())
      sendRecipesData($(this))
    }
  })
  $('#recipe-search').on('input', function() {
    recipe_variables['ingredient'] = $(this).val()
    prevent_ajax_counter ++
    pagination_urls = []
    $('#recipes-filter .lds-ring').css('opacity', '1')
    if (!$('#recipes-box .recipe-search-figure').hasClass('add-color-animation')) {
      $('#recipes-box .recipe-search-figure').addClass('add-color-animation')
    }
    setTimeout(function() {
      prevent_ajax_counter --
      if (recipe_variables['ingredient'].length > 0) {
        page_reset = false
        if (prevent_ajax_counter == 0) {
          managePaginationStyle()
          let recipe_object = { 'recipe_variables': recipe_variables }
          sendAjaxRequest(recipe_object)
        }
      } else {
        page_reset = true
        managePaginationStyle()
        $( '#next_page_url' ).unbind('mouseenter mouseleave')
        changeEmptyContainerContent('Introduce any food search and start discovering')
      }
    }, 1500)
    setTimeout(function() {
      if (recipe_variables['ingredient'].length == 0)
        $('#recipes-filter .lds-ring').css('opacity', '0')
    }, 1500)
  })
}
function sendRecipesData(select_changed) {
  let elem_id = select_changed.closest('.select').find('.selection-box span').attr('id')
  let elem_value = select_changed.attr('data-value')
  pagination_urls = []
  recipe_variables[elem_id] = elem_value
  if (recipe_variables['ingredient'].length > 0){
    let recipe_object = { 'recipe_variables': recipe_variables }
    sendAjaxRequest(recipe_object)
  }
}
function printRecipes() {
  // Small card
  let title = ''
  let image = ''
  let cal = ''
  let cuisine_type = ''
  let serves = ''
  let meal_type = ''

  // Modal card
  let cautions = ''
  let diet_labels = ''
  let dish_type = ''
  let health_labels = ''
  let preparation_url = ''

  // Nutrient information
  let proteins = ''
  let water = ''
  let cholesterol = ''
  let carbs = ['']
  let fats = ['']
  let vitamins = ['']
  let minerals = ['']

  let id_counter = 1
  $('#recipes-box').empty()
  for (let i = 0; i < parsed_response['hits'].length; i++){
    let recipe = parsed_response['hits'][i]['recipe']

    // Get api general data
    title = recipe['label']
    image = recipe['image']
    calories = Math.round(recipe['calories'])
    cuisine_type = firstToUpperCase(recipe['cuisineType'])
    serves = recipe['yield']
    meal_type = firstToUpperCase(recipe['mealType'])
    cautions = recipe['cautions'].join(', ')
    diet_labels = recipe['dietLabels'].join(', ')
    dish_type = firstToUpperCase(recipe['dishType'])
    health_labels = getHealthLabelsHtml(recipe['healthLabels'])
    preparation_url = recipe['url']

    // Get api nutrients data
    proteins = recipe['digest'][2]['total']
    water = recipe['digest'][25]['total']
    cholesterol = recipe['digest'][3]['total']
    carbs = getNutrientData(recipe['digest'][1])
    fat = getNutrientData(recipe['digest'][0])
    vitamins = getVitamins(recipe['digest'])
    minerals = getMinerals(recipe['digest'])

    $('#recipes-box').append
    (
      '<div class="box-container"><div class="box"><div class="image-container"><img class="image" src="'+image+'" alt="Recipe Card" onerror="imgError(this)"><div class="calories-container"><span class="calories">'+calories+' Cal</span></div></div><div class="data-container"><h3 class="title">'+title+'</h3><div class="data-box-container"><span class="data-box"><i class="fas fa-globe icon"></i><span class="cuisine_type">'+cuisine_type+'</span></span><span class="data-box"><i class="fas fa-users icon"></i><span class="yield"><span>Serves</span> '+serves+'</span></span><span class="data-box"><i class="fas fa-utensils icon"></i><span class="meal_type">'+meal_type+'</span></span></div></div><div class="functions-box"><div class="add-container-global"><div id="add-plan" class="add-container"><a class="link" href="#" title=""><i class="fas fa-plus icon"></i><span class="text">Add Plan</span></a></div><div id="add-fav" class="add-container"><a class="link" href="#" title=""><i class="fas fa-heart icon"></i><span class="text">Favorite</span></a></div></div><div id="know-more" class="function-container"><a class="link" id="modal-trigger" data-micromodal-trigger="modal-'+id_counter+'" title=""><i class="fas fa-info icon"></i><span class="text">More info</span></a></div></div></div></div>'
      )
    $('#recipes-box').append
    (
      '<div class="modal micromodal-slide" id="modal-'+id_counter+'" aria-hidden="true"><div class="modal__overlay" tabindex="-1" data-micromodal-close><div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title"><header class="modal__header"><button class="modal__close" aria-label="Close modal" data-micromodal-close></button></header><main class="modal__content" id="modal-'+id_counter+'-content"><div class="image-title-container"><img class="image" src="'+image+'" alt="'+title+'"><h2 class="title">'+title+'</h3></div><div class="general-info"><h3 class="subtitle">General Information</h2><ul class="general-item"><li class="list-item"><h4 class="list-title">Calories</h4><span>'+calories+'</span></li><li class="list-item"><h4 class="list-title">Cusine Type</h4><span>'+cuisine_type+'</span></li><li class="list-item"><h4 class="list-title">Meal Type</h4><span>'+meal_type+'</span></li><li class="list-item"><h4 class="list-title">Dish Type</h4><span>'+dish_type+'</span></li><li class="list-item"><h4 class="list-title">Serves</h4><span>'+serves+'</span></li><li class="list-item"><h4 class="list-title">Diet Labels</h4><span>'+diet_labels+'</span></li></ul></div>'+health_labels+'<div class="nutritional-info"><h3 class="subtitle">Nutritional Information</h3><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Protein</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'+proteins+'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Carbs</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'+carbs['total']+'</span></li><li class="list-item"><span class="left">'+carbs['Fiber']+'</span><span class="right">500</span></li><li class="list-item"><span class="left">Sugars</span><span class="right">'+carbs['Sugars']+'</span></li><li class="list-item"><span class="left">Sugars Added</span><span class="right">'+carbs['Sugars, added']+'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Fats</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'+fat['total']+'</span></li><li class="list-item"><span class="left">Trans</span><span class="right">'+fat['Trans']+'</span></li><li class="list-item"><span class="left">Saturated</span><span class="right">'+fat['Saturated']+'</span></li><li class="list-item"><span class="left">Monounsaturated</span><span class="right">'+fat['Monounsaturated']+'</span></li><li class="list-item"><span class="left">Polyunsaturated</span><span class="right">'+fat['Polyunsaturated']+'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Vitamins</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">A</span><span class="right">'+vitamins['A']+'</span></li><li class="list-item"><span class="left">C</span><span class="right">'+vitamins['C']+'</span></li><li class="list-item"><span class="left">B1</span><span class="right">'+vitamins['B1']+'</span></li><li class="list-item"><span class="left">B2</span><span class="right">'+vitamins['B2']+'</span></li><li class="list-item"><span class="left">B3</span><span class="right">'+vitamins['B3']+'</span></li><li class="list-item"><span class="left">B6</span><span class="right">'+vitamins['B6']+'</span></li><li class="list-item"><span class="left">B9</span><span class="right">'+vitamins['B9']+'</span></li><li class="list-item"><span class="left">B12</span><span class="right">'+vitamins['B12']+'</span></li><li class="list-item"><span class="left">D</span><span class="right">'+vitamins['D']+'</span></li><li class="list-item"><span class="left">E</span><span class="right">'+vitamins['E']+'</span></li><li class="list-item"><span class="left">K</span><span class="right">'+vitamins['K']+'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Minerals</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Sodium</span><span class="right">'+minerals['Sodium']+'</span></li><li class="list-item"><span class="left">Calcium</span><span class="right">'+minerals['Calcium']+'</span></li><li class="list-item"><span class="left">Magnesium</span><span class="right">'+minerals['Magnesium']+'</span></li><li class="list-item"><span class="left">Potassium</span><span class="right">'+minerals['Potassium']+'</span></li><li class="list-item"><span class="left">Iron</span><span class="right">'+minerals['Iron']+'</span></li><li class="list-item"><span class="left">Zinc</span><span class="right">'+minerals['Zinc']+'</span></li><li class="list-item"><span class="left">Phosphorus</span><span class="right">'+minerals['Phosphorus']+'</span></li></div></ul></div></main></div></div></div>'
      )
id_counter++
}
manageBoxesStyle()
managePaginationStyle()
modalHandler()
}
function manageBoxesStyle() {
  let timeout = 100
  $('#recipes-box .box').each(function() {
    let box = $(this)
    setTimeout(function() {
      box.css('opacity', '1')
    }, timeout)
    timeout += 50
  });
}
function managePaginationStyle() {
  $('#next_page_url').css('display', 'block')
  $('#prev_page_url').css('display', 'block')

  if (pagination_urls.length > 2) {
    $('#prev_page_url').attr('disabled', 'false')
  } else {
    $('#prev_page_url').attr('disabled', 'true')
  }

  if (pagination_urls.length == 0){
    if (page_reset) {
      $('#page-change .pagination-container .next').text('')
    } else {
      $('#page-change .pagination-container .next').text(1)
    }
    $('#page-change .pagination-container .current').text(0)
    $('#page-change .pagination-container .prev').text('')
  } else if (pagination_urls.length == 1) {
    $('#page-change .pagination-container .prev').text('')
    $('#page-change .pagination-container .next').text(pagination_urls.length)
    $('#page-change .pagination-container .current').text(pagination_urls.length -1)
  } else if (pagination_urls.length == 2){
    $('#page-change .pagination-container .current').text(pagination_urls.length - 1)
    $('#page-change .pagination-container .next').text(pagination_urls.length)
    $('#page-change .pagination-container .prev').text(pagination_urls.length - 2)
  } else {
    $('#page-change .pagination-container .current').text(pagination_urls.length - 1)
    $('#page-change .pagination-container .next').text(pagination_urls.length)
    $('#page-change .pagination-container .prev').text(pagination_urls.length - 2)
  }
  if (pagination_urls.length >= 2) {
    $( '#prev_page_url' ).hover(
      function() {
        $('#page-change .pagination-container .prev').css('font-size', '30px')
        $('#page-change .pagination-container .prev').css('font-weight', 'bold')
        $('#page-change .pagination-container .current').css('font-size', '16px')
        $('#page-change .pagination-container .current').css('font-weight', 'normal')
      },
      function() {
        $('#page-change .pagination-container .prev').css('font-size', '18px')
        $('#page-change .pagination-container .prev').css('font-weight', 'normal')
        $('#page-change .pagination-container .current').css('font-size', '30px')
        $('#page-change .pagination-container .current').css('font-weight', 'bold')
      }
      )
  } else {
    $( '#prev_page_url' ).unbind('mouseenter mouseleave')
    $('#page-change .pagination-container .current').css('font-size', '30px')
    $('#page-change .pagination-container .current').css('font-weight', 'bold')
    $( '#next_page_url' ).hover(
      function() {
        $('#page-change .pagination-container .next').css('font-size', '30px')
        $('#page-change .pagination-container .next').css('font-weight', 'bold')
        $('#page-change .pagination-container .current').css('font-size', '18px')
        $('#page-change .pagination-container .current').css('font-weight', 'normal')
      },
      function() {
        $('#page-change .pagination-container .next').css('font-size', '18px')
        $('#page-change .pagination-container .next').css('font-weight', 'normal')
        $('#page-change .pagination-container .current').css('font-size', '30px')
        $('#page-change .pagination-container .current').css('font-weight', 'bold')
      }
      )
  }
  if (page_reset)
    $( '#next_page_url' ).unbind('mouseenter mouseleave')
}
function manageRecipesPagination() {
  $('#next_page_url').click(function(e) {
    e.preventDefault()
    if (next_page_url != '' && !page_reset){
      if (pagination_urls.length == 0)
        pagination_urls.push(first_page_url)
      pagination_urls.push(next_page_url)
      let next_recipe_object = { 'next_page_url': pagination_urls[pagination_urls.length - 1], 'recipe_variables': recipe_variables }
      sendAjaxRequest(next_recipe_object)
    }
  })
  $('#prev_page_url').click(function() {
    if (pagination_urls.length >= 2 && !page_reset){
      pagination_urls.splice(-1)
      let next_recipe_object = { 'prev_page_url': pagination_urls[pagination_urls.length - 1], 'recipe_variables': recipe_variables }
      sendAjaxRequest(next_recipe_object)
    }
  });
}
function sendAjaxRequest(data_object) {
  $.ajax({
    url: 'php/api-managment/api-managment.php',
    method: 'post',
    dataType: 'text',
    data: data_object,
    success: function(data){
      // Cuando se pasa la consulta aqui se muestran los datos data recibidos por el echo
      $('#recipes-filter .lds-ring').css('opacity', '0')
      let api_response = data.split('arr-separation')[0]
      if (pagination_urls.length == 0)
        first_page_url = data.split('arr-separation')[1]
      if (isStringJson(api_response)) {
        parsed_response = JSON.parse(api_response)
        console.log(parsed_response)
        if (!jQuery.isEmptyObject(parsed_response['hits'])){
          if (!jQuery.isEmptyObject(parsed_response['_links']))
            next_page_url = parsed_response['_links']['next']['href']
          printRecipes()
        } else {
          changeEmptyContainerContent('No matches found, please change your search criteria')
          page_reset = true
          managePaginationStyle()
        }
      } else {
        changeEmptyContainerContent('No matches found, please change your search criteria')
        page_reset = true
        managePaginationStyle()
      }
    },
    error: function() {
      console.log('error recipe')
    }
  });
}
function isStringJson(api_response) {
  try {
    JSON.parse(api_response)
  } catch (e) {
    return false
  }
  return true
}
function changeEmptyContainerContent(text_value) {
  $('#recipes-box').empty()
  $('#recipes-box').append
  (
    '<div class="no-recipes-search"><p class="text">'+text_value+'</p><div class="image-container"><svg enable-background="new 0 0 1049 1280" version="1.1" viewBox="0 0 1049 1280" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g clip-rule="evenodd" fill-rule="evenodd"><path d="m253 1281h-252v-1280h773c-0.607 0.254-1.192 0.617-1.825 0.746-25.793 5.244-40.539 23.107-40.041 49.448 0.445 23.596 10.478 43.478 25.765 60.812 16.904 19.167 37.358 32.744 63.208 36.136 8.575 1.124 17.421 0.177 26.418 0.177 0.031 0.258 0.282 1.402 0.289 2.549 0.146 23.592 3.593 47.045 1.31 70.794-1.713 17.827 2.365 35.473 6.52 52.85 2.882 12.054 7.371 23.173 18.025 30.745 1.169 0.831 1.861 2.718 2.221 4.245 4.234 17.985 8.382 35.991 12.485 54.007 0.323 1.416 0.386 2.979 0.175 4.416-6.646 45.137-13.54 90.237-19.926 135.41-2.422 17.132-4.432 34.398-1.256 51.754 0.271 1.485-0.803 3.408-1.672 4.88-4.901 8.308-10.286 16.349-14.831 24.842-6.252 11.684-5.023 23.101 2.772 33.82 1.67 2.296 3.243 4.663 5.389 7.759-2.992-0.621-4.948-0.941-6.858-1.438-10.41-2.707-19.742-2.188-26.674 7.667-2.755 3.916-7.234 5.228-11.954 5.139-4.994-0.095-9.984-0.405-14.978-0.587-9.062-0.33-16.157 3.26-21.267 10.754-1.581 2.32-3.136 4.658-4.946 7.35-10.6-5.75-20.325-2.256-30.106 2.318-2.107 0.985-5.301 1.256-7.396 0.396-12.592-5.166-24.126-3.645-34.793 4.626-2.593 2.01-5.06 2.441-8.273 1.56-9.777-2.682-18.761-0.615-27.02 5.171-3.405 2.387-6.941 4.603-10.521 6.721-3.229 1.911-6.383 2.022-9.85-0.08-4.523-2.741-9.35-5.002-14.121-7.313-4.213-2.039-8.472-2.9-12.249 1.207-5.099-4.103-10.326-5.228-16.155-2.612-0.842 0.378-2.354 0.112-3.169-0.434-7.21-4.832-15.437-5.809-23.747-6.861-2.263-0.286-4.862-1.84-6.353-3.614-5.671-6.753-10.778-13.979-16.414-20.764-11.685-14.067-26.842-18.286-44.459-15.076-4.36 0.794-8.731 1.53-13.232 2.317-1.966-5.575-3.857-10.718-5.555-15.924-0.373-1.143-0.45-2.679 4e-3 -3.75 7.329-17.305 14.337-34.764 22.302-51.774 7.752-16.557 21.284-25.233 39.438-28.784 12.729-2.49 25.086-7.617 37.102-12.753 8.418-3.599 11.424-11.406 9.489-20.463-1.071-5.02-2.388-10.1-4.478-14.756-2.046-4.557-2.273-8.688-0.803-13.374 2.682-8.542 3.267-16.675-7.368-21.144 7.136-10.487 6.315-20.232-0.371-30.15-7.888-11.699-7.648-11.859 0.714-23.728 4.156-5.897 3.956-10.919-1.657-15.386-4.781-3.805-10.036-7.226-15.537-9.872-11.392-5.48-23.123-10.251-34.613-15.537-1.674-0.771-3.716-2.607-3.999-4.228-1.668-9.537-5.911-17.776-12.521-24.577-8.933-9.19-17.975-18.354-27.708-26.661-8.142-6.949-14.247-14.496-18.076-24.801-6.951-18.711-16.84-22.993-36.171-17.796-3.374 0.906-6.851 1.654-10.02 3.063-10.517 4.673-21.773 5.885-32.948 7.642-36.625 5.756-71.106 17.472-102.18 38.029-27.639 18.285-47.072 42.594-53.158 75.993-4.23 23.21-3.444 46.605 0.313 69.677 5.109 31.365 11.493 62.526 17.591 93.724 0.698 3.569-0.084 5.735-2.249 8.423-17.439 21.656-35.444 42.914-51.816 65.358-20.488 28.088-32.132 59.712-28.781 94.997 1.961 20.65 6.493 41.055 9.711 61.594 0.362 2.311 0.223 4.977-0.58 7.146-5.885 15.918-12.321 31.637-17.973 47.633-12.985 36.75-14.342 73.771-0.29 110.52 7.125 18.633 15.657 36.724 23.253 55.183 1.373 3.338 1.976 7.315 1.761 10.928-0.999 16.787-2.59 33.539-3.635 50.323-1.825 29.322 8.006 53.279 32.985 70.04 0.138 0.093 0.327 0.176 0.386 0.31 0.732 1.66 2.175 3.386 2.049 4.986-1.51 19.291-7.598 36.852-20.969 51.241-9.293 10.001-18.977 19.643-28.6 29.332-1.195 1.203-3.095 1.707-4.668 2.535 0.677 0.732 1.354 1.465 2.03 2.198 17.884-12.725 35.769-25.448 53.653-38.173 0.556 0.26 1.111 0.519 1.667 0.777-2.442 14.391-4.323 28.906-7.484 43.138-3.212 14.462-12.692 25.698-22.622 36.467 0.42 0.323 0.839 0.646 1.259 0.97 9.874-7.201 19.747-14.402 29.987-21.871 3.467 12.372 1.828 22.652-8.206 30.604-3.522 2.792-7.146 5.457-10.747 8.149-1.788 1.337-3.626 2.604-5.441 3.903 0.182 0.442 0.364 0.885 0.546 1.327 6.44-1.173 12.914-2.191 19.314-3.555 10.055-2.142 19.455-5.365 22.805-17.277 5.239 4.725 9.904 8.93 14.568 13.136 0.566-0.126 1.133-0.252 1.699-0.378-13.619-25.72-5.426-47.608 10.901-68.645 0.454 2.034 0.859 3.598 1.146 5.183 2.261 12.449 4.222 24.962 6.87 37.328 1.187 5.542 0.357 9.7-3.411 14.033-5.454 6.274-10.254 13.123-15.232 19.801-1.865 2.503-3.452 5.215-5.166 7.832z" fill="#232222"/><path class="recipe-search-figure" d="m253 1281c1.714-2.617 3.301-5.329 5.168-7.833 4.979-6.678 9.778-13.526 15.232-19.801 3.768-4.333 4.597-8.491 3.411-14.033-2.647-12.366-4.609-24.879-6.87-37.328-0.288-1.585-0.693-3.148-1.146-5.183-16.327 21.036-24.52 42.925-10.901 68.645-0.566 0.126-1.132 0.252-1.699 0.378-4.665-4.206-9.329-8.411-14.568-13.136-3.351 11.912-12.75 15.136-22.805 17.277-6.4 1.363-12.874 2.382-19.314 3.555-0.182-0.442-0.364-0.885-0.546-1.327 1.815-1.299 3.654-2.566 5.441-3.903 3.6-2.692 7.224-5.357 10.747-8.149 10.033-7.952 11.673-18.232 8.206-30.604-10.24 7.469-20.114 14.67-29.987 21.871-0.42-0.323-0.839-0.646-1.259-0.97 9.93-10.769 19.409-22.005 22.622-36.467 3.161-14.231 5.042-28.747 7.484-43.138-0.556-0.259-1.111-0.518-1.667-0.777-17.884 12.725-35.769 25.448-53.653 38.173-0.676-0.733-1.353-1.466-2.03-2.198 1.573-0.828 3.473-1.332 4.668-2.535 9.623-9.689 19.306-19.331 28.6-29.332 13.372-14.39 19.459-31.95 20.969-51.241 0.125-1.601-1.317-3.326-2.049-4.986-0.059-0.134-0.248-0.217-0.386-0.31-24.979-16.761-34.81-40.718-32.985-70.04 1.044-16.784 2.636-33.536 3.635-50.323 0.215-3.612-0.388-7.59-1.761-10.928-7.596-18.459-16.128-36.55-23.253-55.183-14.052-36.746-12.695-73.767 0.29-110.52 5.652-15.996 12.088-31.715 17.973-47.633 0.803-2.17 0.942-4.836 0.58-7.146-3.218-20.539-7.75-40.943-9.711-61.594-3.351-35.285 8.293-66.909 28.781-94.997 16.372-22.444 34.377-43.702 51.816-65.358 2.164-2.688 2.946-4.854 2.249-8.423-6.099-31.197-12.482-62.358-17.591-93.724-3.758-23.071-4.543-46.467-0.313-69.677 6.086-33.399 25.519-57.708 53.158-75.993 31.075-20.558 65.556-32.273 102.18-38.029 11.175-1.757 22.432-2.969 32.948-7.642 3.169-1.408 6.646-2.156 10.02-3.063 19.331-5.197 29.22-0.915 36.171 17.796 3.829 10.305 9.935 17.852 18.076 24.801 9.733 8.308 18.775 17.471 27.708 26.661 6.609 6.801 10.853 15.04 12.521 24.577 0.283 1.62 2.325 3.457 3.999 4.228 11.49 5.286 23.222 10.057 34.613 15.537 5.501 2.646 10.756 6.067 15.537 9.872 5.613 4.467 5.813 9.488 1.657 15.386-8.362 11.868-8.602 12.028-0.714 23.728 6.687 9.918 7.507 19.663 0.371 30.15 10.635 4.469 10.05 12.602 7.368 21.144-1.471 4.686-1.243 8.817 0.803 13.374 2.09 4.656 3.406 9.736 4.478 14.756 1.935 9.057-1.071 16.864-9.489 20.463-12.016 5.136-24.373 10.263-37.102 12.753-18.154 3.551-31.687 12.228-39.438 28.784-7.965 17.011-14.973 34.47-22.302 51.774-0.454 1.071-0.377 2.607-4e-3 3.75 1.697 5.206 3.589 10.349 5.555 15.924 4.501-0.787 8.872-1.523 13.232-2.317 17.617-3.21 32.774 1.009 44.459 15.076 5.636 6.785 10.743 14.011 16.414 20.764 1.49 1.774 4.09 3.328 6.353 3.614 8.311 1.053 16.537 2.029 23.747 6.861 0.815 0.546 2.327 0.812 3.169 0.434 5.829-2.615 11.057-1.49 16.155 2.612 3.777-4.107 8.036-3.246 12.249-1.207 4.771 2.311 9.598 4.571 14.121 7.313 3.467 2.103 6.621 1.991 9.85 0.08 3.58-2.118 7.116-4.334 10.521-6.721 8.259-5.786 17.242-7.853 27.02-5.171 3.214 0.882 5.681 0.45 8.273-1.56 10.667-8.271 22.201-9.792 34.793-4.626 2.095 0.859 5.288 0.589 7.396-0.396 9.781-4.574 19.507-8.068 30.106-2.318 1.811-2.691 3.365-5.029 4.946-7.35 5.109-7.494 12.205-11.084 21.267-10.754 4.993 0.182 9.983 0.492 14.978 0.587 4.72 0.089 9.199-1.223 11.954-5.139 6.932-9.855 16.264-10.374 26.674-7.667 1.91 0.497 3.866 0.817 6.858 1.438-2.146-3.096-3.719-5.463-5.389-7.759-7.796-10.72-9.024-22.137-2.772-33.82 4.545-8.493 9.93-16.534 14.831-24.842 0.869-1.472 1.943-3.395 1.672-4.88-3.176-17.355-1.166-34.622 1.256-51.754 6.386-45.173 13.28-90.273 19.926-135.41 0.211-1.437 0.148-3-0.175-4.416-4.104-18.016-8.251-36.021-12.485-54.007-0.359-1.527-1.052-3.414-2.221-4.245-10.654-7.572-15.144-18.691-18.025-30.745-4.154-17.377-8.232-35.022-6.52-52.85 2.283-23.749-1.164-47.202-1.31-70.794-7e-3 -1.146-0.258-2.291-0.289-2.549-8.997 0-17.843 0.947-26.418-0.177-25.85-3.392-46.304-16.969-63.208-36.136-15.287-17.334-25.319-37.216-25.765-60.812-0.498-26.341 14.248-44.204 40.041-49.448 0.631-0.128 1.216-0.491 1.823-0.745h16c0.427 0.237 0.83 0.609 1.285 0.692 36.479 6.608 62.253 27.847 78.898 59.988 12.62 24.367 15.867 49.396-2.678 73.162 3.105 4.523 5.121 0.365 7.02-1.111 15.204-11.83 20.722-10.938 31.106 5.047 1.188 1.83 2.982 3.838 4.929 4.513 11.901 4.128 18.474 12.614 20.867 24.625 0.76 3.814 2.045 6.223 6.563 6.47 2.248 0.122 4.849 1.705 6.495 3.399 4.508 4.64 8.602 9.684 12.845 14.58 1.3 1.499 2.268 3.86 3.875 4.415 6.027 2.08 6.84 6.955 6.864 12.036 0.046 9.318 0.123 18.677-0.643 27.951-2.068 25.045-5.508 50.013-6.614 75.091-0.93 21.049 0.647 42.209 1.144 63.319 0.092 3.904 2.059 6.129 5.813 7.634 26.592 10.655 49.296 26.856 68.253 48.354 4.491 5.093 9.31 9.897 13.978 14.835v3c-2.566 7.503-5.299 14.953-7.673 22.517-10.766 34.297-21.869 68.497-31.996 102.98-8.392 28.575-15.308 57.58-23.413 86.242-5.714 20.204-12.58 40.069-24.317 57.771-9.165 13.821-20.874 24.14-38.097 26.573-2.246 0.318-4.399 1.476-6.532 2.393-58.037 24.949-117.45 46.014-178.28 63.069-32.853 9.212-65.726 18.354-98.589 27.526-2.504 0.699-4.869 0.765-4.587 4.887 1.591 23.269 2.793 46.564 4.109 69.853 1.735 30.709-1.444 60.429-15.776 88.4-4.739 9.249-8.615 19.306-10.777 29.443-7.504 35.179-1.215 69.122 11.272 102.23 2.11 5.597 5.234 10.876 6.771 16.602 0.893 3.33 0.595 7.85-1.062 10.752-1.691 2.962-1.996 5.062-1.177 8.164 7.647 28.954 15.23 57.926 22.612 86.948 2.03 7.982 3.326 16.153 5.094 24.903-2.604 0-4.397-3e-3 -6.19 1e-3 -22.163 0.037-44.326 0.02-66.489 0.141-9.637 0.053-19.272 0.393-28.908 0.602-101 1e-3 -202 1e-3 -303 1e-3zm579.56-1144.5c17.521-0.888 27.815-11.284 27.249-28.534-0.119-3.632-0.616-7.34-1.563-10.844-7.453-27.569-25.084-47.688-47.641-63.985-11.33-8.186-23.809-13.938-37.874-15.81-19.615-2.61-32.601 9.344-31.015 29.007 0.397 4.928 1.269 9.999 2.983 14.609 11.939 32.089 34.166 54.767 65.035 68.908 7.128 3.266 15.193 4.487 22.826 6.649zm-539.28 466.47c0.499-0.03 0.997-0.06 1.496-0.09 2.379-10.696 4.758-21.393 7.165-32.212-7.982 0.055-11.653 2.307-11.458 8.383 0.255 7.995 1.804 15.948 2.797 23.919z" fill="#fff" class="recipe-search-figure" fill-opacity=".8"/><path d="m556 1281c9.636-0.209 19.271-0.549 28.908-0.602 22.163-0.121 44.326-0.104 66.489-0.141 1.793-4e-3 3.587-1e-3 6.19-1e-3 -1.768-8.75-3.063-16.921-5.094-24.903-7.382-29.022-14.965-57.994-22.612-86.948-0.819-3.103-0.515-5.202 1.177-8.164 1.656-2.902 1.954-7.422 1.062-10.752-1.537-5.726-4.661-11.005-6.771-16.602-12.487-33.108-18.776-67.052-11.272-102.23 2.162-10.138 6.038-20.194 10.777-29.443 14.332-27.972 17.512-57.691 15.776-88.4-1.316-23.288-2.519-46.584-4.109-69.853-0.282-4.122 2.083-4.188 4.587-4.887 32.863-9.173 65.736-18.314 98.589-27.526 60.827-17.056 120.24-38.12 178.28-63.069 2.133-0.917 4.286-2.074 6.532-2.393 17.223-2.434 28.932-12.752 38.097-26.573 11.737-17.702 18.604-37.567 24.317-57.771 8.105-28.662 15.021-57.667 23.413-86.242 10.127-34.485 21.23-68.686 31.996-102.98 2.374-7.563 5.106-15.014 7.673-22.517v832c-164.67-1e-3 -329.33-1e-3 -494-1e-3z" fill="#232222"/><path d="m1050 446c-4.668-4.938-9.486-9.742-13.978-14.835-18.957-21.497-41.661-37.698-68.253-48.354-3.754-1.505-5.721-3.729-5.813-7.634-0.496-21.11-2.073-42.271-1.144-63.319 1.106-25.078 4.546-50.046 6.614-75.091 0.766-9.274 0.688-18.633 0.643-27.951-0.024-5.081-0.837-9.956-6.864-12.036-1.607-0.555-2.575-2.916-3.875-4.415-4.243-4.896-8.337-9.94-12.845-14.58-1.646-1.694-4.247-3.277-6.495-3.399-4.519-0.247-5.804-2.655-6.563-6.47-2.394-12.011-8.966-20.497-20.867-24.625-1.946-0.675-3.74-2.683-4.929-4.513-10.385-15.985-15.902-16.877-31.106-5.047-1.898 1.477-3.914 5.635-7.02 1.111 18.545-23.767 15.298-48.795 2.678-73.162-16.646-32.142-42.419-53.38-78.898-59.988-0.455-0.083-0.858-0.455-1.285-0.692h260v445z" fill="#232222"/><path d="m832.56 136.51c-7.633-2.162-15.697-3.383-22.825-6.648-30.869-14.142-53.096-36.819-65.035-68.908-1.715-4.61-2.586-9.682-2.983-14.609-1.586-19.663 11.399-31.617 31.015-29.007 14.065 1.871 26.544 7.624 37.874 15.81 22.557 16.297 40.188 36.416 47.641 63.985 0.947 3.504 1.444 7.212 1.563 10.844 0.565 17.249-9.729 27.645-27.25 28.533z" fill="#232222"/><path d="m293.27 602.97c-0.993-7.971-2.542-15.924-2.798-23.919-0.195-6.076 3.476-8.328 11.458-8.383-2.406 10.819-4.786 21.516-7.165 32.212-0.497 0.03-0.996 0.059-1.495 0.09z" fill="#232222"/></g></svg></div></div>'
    )
}
function imgError(error_image) {
  error_image.src = 'img/photos/no-image.jpg'
  error_image.onerror = ''
  return true
}
function firstToUpperCase(array=[]) {
  let stringified_arr = ''
  if (array.length > 0) {
    for (let i = 0; i < array.length; i++) {
      let upperCased = array[i].charAt(0).toUpperCase() + array[i].slice(1)
      stringified_arr += upperCased
      if (i < array.length - 1)
        stringified_arr += ', '
    }
  }
  return stringified_arr;
}
function modalHandler() {
  var micromodal = new MicroModal.init({
    onShow: modal => $('.link').css('position', 'static'),
    onClose: modal => $('.link').css('position', 'relative')
  })
  $('.modal .nutritional-info .title-container').click(function() {
    let list_height = '0'
    let type = $(this).children('.list-title').text()
    console.log($(this).siblings('.list-container').css('height'))
    switch (type) {
      case 'Protein': list_height = '4em'
      break
      case 'Carbs': list_height = '11em'
      break
      case 'Fats': list_height = '14em'
      break
      case 'Vitamins': list_height = '29em'
      break
      case 'Minerals': list_height = '19em'
      break
    }
    if ($(this).siblings('.list-container').css('height') == '0px')
      $(this).siblings('.list-container').css('height', list_height)
    else {
      $(this).siblings('.list-container').css('height', '0em')
    }
  });
}

// Gets data from protein and carbs
function getNutrientData(nutrient_object) {
  let aux_object = {}
  aux_object['total'] = Math.round(nutrient_object['total'])
  for (let i = 0; i < nutrient_object['sub'].length; i++) {
    if (nutrient_object['sub'][i]['label'] != 'Carbs (net)')
      aux_object[nutrient_object['sub'][i]['label']] = Math.round(nutrient_object['sub'][i]['total'])
  }
  return aux_object
}
function getVitamins(nutrient_object) {
  let aux_object = {}
  aux_object['A'] = Math.round(nutrient_object[11]['total']) 
  aux_object['C'] = Math.round(nutrient_object[12]['total']) 
  aux_object['B1'] = Math.round(nutrient_object[13]['total'])
  aux_object['B2'] = Math.round(nutrient_object[14]['total'])
  aux_object['B3'] = Math.round(nutrient_object[15]['total'])
  aux_object['B6'] = Math.round(nutrient_object[16]['total'])
  aux_object['B9'] = Math.round(nutrient_object[18]['total'])
  aux_object['B12'] = Math.round(nutrient_object[20]['total']) 
  aux_object['D'] = Math.round(nutrient_object[21]['total']) 
  aux_object['E'] = Math.round(nutrient_object[22]['total']) 
  aux_object['K'] = Math.round(nutrient_object[23]['total']) 

  return aux_object
}
function getMinerals(nutrient_object) {
  let aux_object = {}
  aux_object['Sodium'] = Math.round(nutrient_object[4]['total'])
  aux_object['Calcium'] = Math.round(nutrient_object[5]['total'])
  aux_object['Magnesium'] = Math.round(nutrient_object[6]['total'])
  aux_object['Potassium'] = Math.round(nutrient_object[7]['total'])
  aux_object['Iron'] = Math.round(nutrient_object[8]['total'])
  aux_object['Zinc'] = Math.round(nutrient_object[9]['total'])
  aux_object['Phosphorus'] = Math.round(nutrient_object[10]['total'])

  return aux_object
}

function getHealthLabelsHtml(nutrient_object) {
  let added_html = ''

  added_html += '<div class="health-info"><h3 class="subtitle">Health Labels</h3><ul class="health-item">'
  for(let i = 0; i < nutrient_object.length; i++) {
    added_html += '<li class="list-item"><span>'+nutrient_object[i]+'</span></li>'
  }
  added_html += '</ul></div>'

  return added_html
}

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
    setTimeout(function() {
      prevent_ajax_counter --
      if (recipe_variables['ingredient'].length > 2 && prevent_ajax_counter == 0) {
        pagination_urls = []
        let recipe_object = { 'recipe_variables': recipe_variables }
        sendAjaxRequest(recipe_object)
      } else {
        $('#recipes-box').empty()
        $('#recipes-box').append
        (
          '<div class="no-recipes-search"><p class="text">Introduce any food search and start discovering</p></div>'
          )
      }
    }, 1500)
  })
}
function sendRecipesData(select_changed) {
  let elem_id = select_changed.closest('.select').find('.selection-box span').attr('id')
  let elem_value = select_changed.attr('data-value')
  recipe_variables[elem_id] = elem_value
  if (recipe_variables['ingredient'].length > 2){
    pagination_urls = []
    let recipe_object = { 'recipe_variables': recipe_variables }
    sendAjaxRequest(recipe_object)
  }
}
function printRecipes() {
  let title = ""
  let image = ""
  let cal = ""
  let cuisine_type = ""
  let serves = ""
  let meal_type = ""
  let next_page = ""
  $('#recipes-box').empty()
  for (let i = 0; i < parsed_response['hits'].length; i++){
    let recipe = parsed_response['hits'][i]['recipe']
    title = recipe['label']
    image = recipe['image']
    calories = Math.round(recipe['calories'])
    cuisine_type = firstToUpperCase(recipe['cuisineType'])
    serves = recipe['yield']
    meal_type = firstToUpperCase(recipe['mealType'])
    $('#recipes-box').append
    (
      '<div class="box-container"><div class="box"><div class="image-container"><img class="image" src="'+image+'" alt="Recipe Card" onerror="imgError(this)"><div class="calories-container"><span class="calories">'+calories+' Cal</span></div></div><div class="data-container"><h3 class="title">'+title+'</h3><div class="data-box-container"><span class="data-box"><i class="fas fa-globe icon"></i><span class="cuisine_type">'+cuisine_type+'</span></span><span class="data-box"><i class="fas fa-users icon"></i><span class="yield"><span>Serves</span> '+serves+'</span></span><span class="data-box"><i class="fas fa-utensils icon"></i><span class="meal_type">'+meal_type+'</span></span></div></div><div class="functions-box"><div class="add-container-global"><div id="add-plan" class="add-container"><a class="link" href="#" title=""><i class="fas fa-plus icon"></i><span class="text">Add Plan</span></a></div><div id="add-fav" class="add-container"><a class="link" href="#" title=""><i class="fas fa-heart icon"></i><span class="text">Favorite</span></a></div></div><div id="know-more" class="function-container"><a class="link" href="#" title=""><i class="fas fa-info icon"></i><span class="text">More info</span></a></div></div></div></div>'
      )
  }
  $('#next_page_url').css('display', 'block')
  $('#prev_page_url').css('display', 'block')
}
function manageRecipesPagination() {
  $('#next_page_url').click(function() {
    if (parsed_response['_links'].length !== 0){
      if (pagination_urls.length == 0)
        pagination_urls.push(first_page_url)
      pagination_urls.push(next_page_url)
      console.log(pagination_urls)
      let next_recipe_object = { 'next_page_url': pagination_urls[pagination_urls.length - 1], 'recipe_variables': recipe_variables }
      sendAjaxRequest(next_recipe_object)
    }
  })
  $('#prev_page_url').click(function() {
    if (pagination_urls.length >= 2){
      pagination_urls.splice(-1)
      let next_recipe_object = { 'prev_page_url': pagination_urls[pagination_urls.length - 1], 'recipe_variables': recipe_variables }
      sendAjaxRequest(next_recipe_object)
    }
  });
  if (pagination_urls.length >= 2) {
    $('#prev_page_url').attr('disabled', 'false')
  } else {
    $('#prev_page_url').attr('disabled', 'true')
  }
}
function sendAjaxRequest(data_object) {
  $.ajax({
    url: 'php/api-managment/api-managment.php',
    method: 'post',
    dataType: 'text',
    data: data_object,
    success: function(data){
        // Cuando se pasa la consulta aqui se muestran los datos data recibidos por el echo
        let api_response = data.split('arr-separation')[0]
        if (pagination_urls.length == 0)
          first_page_url = data.split('arr-separation')[1]
        parsed_response = JSON.parse(api_response)
        if (parsed_response['_links'].length !== 0)
          next_page_url = parsed_response['_links']['next']['href']
        console.log(parsed_response)
        printRecipes()
      },
      error: function() {
        console.log('error recipe')
      }
    });
}
function imgError(error_image) {
  error_image.src = "img/photos/no-image.jpg"
  error_image.onerror = ""
  return true
}
function firstToUpperCase(array) {
  let stringified_arr = ""
  for (let i = 0; i < array.length; i++) {
    let upperCased = array[i].charAt(0).toUpperCase() + array[i].slice(1)
    stringified_arr += upperCased
    if (i < array.length - 1)
      stringified_arr += ', '
  }
  return stringified_arr;
}

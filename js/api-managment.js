var pagination_urls = []
var current_page = 0

function selectionBoxHandler() {
  var prevent_ajax_counter = 0
  var recipe_variables = 
  {
    ingredient: '',
    cuisine_type: '',
    meal_type: '',
    diet_label: '',
    health_label: ''
  }
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
      sendRecipesData($(this), recipe_variables)
    }
  })
  $('#recipe-search').on('input', function() {
    recipe_variables['ingredient'] = $(this).val()
    prevent_ajax_counter ++
    setTimeout(function() {
      prevent_ajax_counter --
      if (recipe_variables['ingredient'].length > 2 && prevent_ajax_counter == 0) {
        sendAjaxRecipe(recipe_variables)
      }
    }, 1500)
  })
}
function sendRecipesData(select_changed, recipe_variables) {
  let elem_id = select_changed.closest('.select').find('.selection-box span').attr('id')
  let elem_value = select_changed.attr('data-value')
  recipe_variables[elem_id] = elem_value
  if (recipe_variables['ingredient'].length > 2)
    sendAjaxRecipe(recipe_variables)
}
function sendAjaxRecipe(recipe_variables) {
  $.ajax({
    url: 'php/api-managment/api-managment.php',
    method: 'post',
    data: {'recipe_variables': recipe_variables},
    success: function(data){
        // Cuando se pasa la consulta aqui se muestran los datos data recibidos por el echo
        var parsed_data = JSON.parse(data)
        console.log(parsed_data)
        printRecipes(parsed_data)
      },
      error: function() {
        console.log('error recipe')
      }
    });
}
function printRecipes(data) {
  let title = ""
  let image = ""
  let cal = ""
  let cuisine_type = ""
  let serves = ""
  let meal_type = ""
  let next_page = ""
  $('#recipes-box').empty()
  for (let i = 0; i < data['hits'].length; i++){
    let recipe = data['hits'][i]['recipe']
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
  pagination_urls.push(data['_links']['next']['href'])
  if (pagination_urls.length > 0) {
    current_page = 0
  } else {
    current_page = pagination_urls.length
  }
  $('#next-page .next-page-container').append
  (
    '<span id="prev_page_url"><i class="fas fa-chevron-left"></i></span><span id="next_page_url"><i class="fas fa-chevron-right"></i></span>'
    )
  setPaginationClickers()
}
function setPaginationClickers() {
  if (pagination_urls.length > 1) {
    $('#prev_page_url').click(function() {

    });
  }
  $('#next_page_url').click(function() {
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
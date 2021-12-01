var plan_requirements = {}
plan_requirements['plan_requirements'] = 'false'

function planQuestionsHandler() {
  $('#questions-container .question .trigger').click(function() {
    let finish = false
    let correct_answer = false
    let value = ''
    let options = []
    let container_id = $(this).closest('.question').attr('id')
    switch (container_id) {
      case 'question-sex':
      options = ['Male', 'Female']
      value = $('#answer-sex').text()
      if (options.includes(value)){
        plan_requirements['sex'] = value
        correct_answer = true
      }
      case 'question-activity':
      options = ['Sedentary', 'Slightly Active', 'Moderately Active', 'Active', 'Very Active']
      value = $('#answer-activity').text()
      if (options.includes(value)){
        plan_requirements['activity'] = value
        correct_answer = true
      }
      break;
      case 'question-body':
      options = ['Ectomorph', 'Mesomorph', 'Endomorph']
      value = $('#answer-body').text()
      if (options.includes(value)){
        plan_requirements['body'] = value
        correct_answer = true
      }
      break;
      case 'question-objective':
      options = ['Maintain Weight', 'Lose Weight', 'Gain Weight']
      value = $('#answer-objective').text()
      if (options.includes(value)) {
        plan_requirements['objective'] = value
        correct_answer = true
      }
      break;
      case 'question-personal':
      let weight = $('#question-weight').val()
      let height = $('#question-height').val()
      let age = $('#question-age').val()

      if (checkPlanAnswers(weight, 2, 700) && checkPlanAnswers(height, 53, 272) && checkPlanAnswers(age, 18, 90)){
        plan_requirements['weight'] = weight
        plan_requirements['height'] = height
        plan_requirements['age'] = age
        finish = true
        correct_answer = true
      } else {
        finish = false
      }
      break;
    }
    if (!finish && correct_answer) {
      $('#'+container_id).removeClass('question-show')
      $('#'+container_id).children('.trigger').attr('disabled', true)
      setTimeout(function() {
        $('#'+container_id).css('display', 'none')
        $('#'+container_id).next('.question').css('display', 'flex')
        $('#'+container_id).next('.question').css('min-height', '80vh')
      }, 800)
      setTimeout(function() {
        $('#'+container_id).next('.question').addClass('question-show')
        $('#'+container_id).next('.question').children('.trigger').attr('disabled', false)
      }, 1000)
    } else if (finish) {
      $('#'+container_id).removeClass('question-show')
      $('#'+container_id).children('.trigger').attr('disabled', true)
      setTimeout(function() {
        $('#'+container_id).css('display', 'none')
        $('#questions-container .test-end').fadeIn()
        $('#questions-container .test-end').css('display', 'flex')
      }, 500)
      plan_requirements['plan_requirements'] = 'true'
    }
  });
  planHelpHints()
}
function checkPlanAnswers(value, min, max) {
  if (value.length > 0 && !isNaN(value)) {
    if (value > min && value < max) {
      return true
    }
  }
  return false;
}
function planHelpHints() {
  $('#questions-container .select').click(function() {
    var options = {
      'activity': {
        'Sedentary': 'Your job is in a desk and you do not do any active exercice',
        'Slightly Active': 'Your job is on your feet for the most part, you do 30 minutes of light exercice',
        'Moderately Active': 'Your job is on your feet for the most part, you do about an hour of light exercice',
        'Active': 'Your job includes physical activity, you do intense workout about 3 - 5 days a week',
        'Very Active': 'Most of your day includes heavy physical activity, you do intense workout about 5 - 7 days a week'
      },
      'body': {
        'Ectomorph': 'img/photos/ectomorph.png',
        'Mesomorph': 'img/photos/mesomorph.png',
        'Endomorph': 'img/photos/endomorph.png'
      }
    }
    var activity = $('#answer-activity').text()
    var body = $('#answer-body').text()
    if (activity in options['activity']) {
      $('#question-activity .help').text(options['activity'][activity])
    }
    if (body in options['body']) {
      $('#question-body .image').attr('src', options['body'][body])
    }
  })
}
function handlePlanClickers() {
  // Plan register
  $('#register-plan').click(function() {
    ajaxStoreUserData()
  })
  // Pan add from recipes
  $(document).on('click', '#add-plan', function(){
    var recipe_id = $(this).closest('.box-container').attr('id')
    $('#show-plans .modal__content').empty()
    ajaxGetUserResponse(recipe_id)
  });
  // Create new empty plan
  $(document).on('click', '#create-plan', function() {
    $('#show-plans .modal__content').empty()
    ajaxCreatePlan()
  })
  $(document).on('click', '#add-time-recipe', function(){
    var time = $(this).data('time')
    if ($('.confirmation-box').length <= 0)
      $(this).parent().append(confirmationBox(time))
  });
  $(document).on('click', '#confirmation-true', function() {
    var recipe_insert = {}

    var recipe_id = ''
    var time = $(this).data('time')
    var elements = $(this).closest('.confirmation-box').siblings('.time')
    elements.each(function(index, el) {
      if ($(this).data('time') == time) {
        recipe_insert['plan_id'] = $(this).data('plan')
        recipe_insert['day'] = $(this).data('day')
        recipe_insert['time'] = $(this).data('time')
        recipe_insert['id'] = $(this).data('recipe').substr(recipe_id.length - 1);
      }
    });
    recipe_insert['recipe'] = getRecipe(recipe_insert['id'])
    ajaxAddRecipe(recipe_insert)
    $(this).closest('.confirmation-box').remove()
  })
  $(document).on('click', '#confirmation-false', function() {
    $(this).closest('.confirmation-box').remove()
  })
  $(document).on('click', '#show-modal-recipe', function() {
    var request_data = {}
    let el = $(this)
    request_data['plan_id'] = el.data('plan')
    request_data['day'] = el.data('day')
    request_data['time'] = el.data('time')
    ajaxGetRecipe(request_data)
    $('#show-recipe .modal__content').append('')
  })
  $(document).on('click', '#close-recipe', function() {
    $('#show-recipe').removeClass('is-open')
  })
}
function confirmationBox(time) {
  return '<div class="confirmation-box"><span class="text">Do you want to add the recipe ?</span><div class="btn-box"><a id="confirmation-true" data-time="'+time+'" class="btn btn-secondary">Yes</a><a id="confirmation-false" class="btn btn-primary">No</a></div></div>'
}
function getRecipe(recipe_id) {
  var recipe_box = ''
  $('#recipes-box .modal__content').each(function(index, el) {
    var box_id = $(this).attr('id')
    var box_id = box_id.substring(box_id.indexOf("-") + 1, box_id.lastIndexOf("-"))
    if (box_id == recipe_id) {
      recipe_box = $(this)
    }
  });
  return getRecipeValues(recipe_box)
}
function getRecipeValues(recipe_box) {
  var recipe_data = {}
  // General
  recipe_data['image'] = recipe_box.find('.image').attr('src')
  recipe_data['title'] = recipe_box.find('.title').text()
  recipe_data['calories'] = recipe_box.find('.calories').text()
  recipe_data['cuisine_type'] = recipe_box.find('.cuisine-type').text()
  recipe_data['meal_type'] = recipe_box.find('.meal-type').text()
  recipe_data['serves'] = recipe_box.find('.serves').text()
  recipe_data['dish_type'] = recipe_box.find('.dish-type').text()
  recipe_data['diet_labels'] = recipe_box.find('.diet-labels').text().split(',')
  recipe_data['health_labels'] = getHealthLabels(recipe_box)
  // Nutritional Info
  var carbs = recipe_box.find('.carbs').end()
  var fat = recipe_box.find('.fat').end()
  var vitamins = recipe_box.find('.vitamins').end()
  var minerals = recipe_box.find('.minerals').end()
  recipe_data['nutritional_info'] =
  {
    'protein':
    {
      'total': recipe_box.find('.protein').end().find('.total').text()
    },
    'carbs':
    {
      'total': carbs.find('.total').text(),
      'sugar': carbs.find('.sugar').text(),
      'sugar-added': carbs.find('.sugar-added').text(),
      'fiber': carbs.find('.fiber').text()
    },
    'fat':
    {
      'total': fat.find('.total').text(),
      'trans': fat.find('.trans').text(),
      'saturated': fat.find('.saturated').text(),
      'monounsaturated': fat.find('.monounsaturated').text(),
      'polyunsaturated': fat.find('.polyunsaturated').text(),

    },
    'vitamins':
    {
      'total': vitamins.find('.total').text(),
      'a': vitamins.find('.a').text(),
      'c': vitamins.find('.c').text(),
      'b1': vitamins.find('.b1').text(),
      'b2': vitamins.find('.b2').text(),
      'b3': vitamins.find('.b3').text(),
      'b6': vitamins.find('.b6').text(),
      'b9': vitamins.find('.b9').text(),
      'b12': vitamins.find('.b12').text(),
      'd': vitamins.find('.d').text(),
      'e': vitamins.find('.e').text(),
      'k': vitamins.find('.k').text(),
    },
    'minerals':
    {
      'sodium': minerals.find('.sodium').text(),
      'calcium': minerals.find('.calcium').text(),
      'magnesium': minerals.find('.magnesium').text(),
      'potassium': minerals.find('.potassium').text(),
      'iron': minerals.find('.iron').text(),
      'zinc': minerals.find('.zinc').text(),
      'phosphorus': minerals.find('.phosphorus').text(),
    }
  }
  console.log(recipe_data)
  return recipe_data
}
function getHealthLabels(recipe_box) {
  var health_labels = []
  recipe_box.find('.health-label').each(function(index, el) {
    health_labels.push($(this).text())
  });
  return health_labels
}

function ajaxStoreUserData() {
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {'plan_requirements':plan_requirements},
    success: function(data) {
      location.reload(true)
    },
    error: function() {
      console.log("error")
    }
  })
}
function ajaxGetUserResponse(recipe_id) {
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {'get_user_response': recipe_id},
    success: function(data) {
      // console.log(data)
      var parsed_data = JSON.parse(data)
      getHtmlUserResponse(parsed_data)
    },
    error: function() {
      console.log("error")
    }
  })
}
function ajaxCreatePlan() {
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {'create_plan': 'true'},
    success: function(data) {
      $('#wrapper').append('<div class="result-box valid"><span class="text">The plan has been succefully added</span></div>')
      setTimeout(function() {
        $('#wrapper .result-box').remove()
      }, 3000)
      $('#show-plans').removeClass('is-open')
    },
    error: function() {
      console.log("error")
    }
  })
}

function ajaxLoadPlan() {
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {'get_plans': 'true'},
    success: function(data) {
      $('#show-plans .modal__content').append(data)
      console.log(data)
    },
    error: function() {
      console.log("error")
    }
  })
}

function ajaxAddRecipe(recipe) {
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {'add_recipe': recipe},
    success: function(data) {
      $('#show-plans').removeClass('is-open')
      $('#wrapper').append('<div class="result-box valid"><span class="text">The recipe has been succefully created</span></div>')
      setTimeout(function() {
        $('#wrapper .result-box').remove()
      }, 3000)
      ajaxGetUserResponse(data)
    },
    error: function() {
      console.log("error")
    }
  })
}
function ajaxGetRecipe(request_data) {
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {'get_recipe': request_data},
    success: function(data) {
      var parsed_data = JSON.parse(data)
      insertRecipeModal(parsed_data)
      $('#show-recipe').addClass('is-open')
    },
    error: function() {
      console.log("error")
    }
  })
}
function insertRecipeModal(parsed_data) {
    // Get api general data
    var title = parsed_data['title']
    var image = parsed_data['image']
    var calories = parsed_data['calories']
    var cuisine_type = parsed_data['cuisineType']
    var serves = parsed_data['serves']
    var meal_type = parsed_data['meal_type']
    var diet_labels = parsed_data['diet_labels'].join(', ')
    var dish_type = parsed_data['dish_type']
    var health_labels = getHealthLabelsHtml(parsed_data['health_labels'])
    // var preparation_url = parsed_data['url']

    // Nutritional info
    var nutritional_info = parsed_data['nutritional_info']
    var proteins = nutritional_info['protein']['total']
    var carbs = nutritional_info['carbs']
    var fat = nutritional_info['fat']
    var vitamins = nutritional_info['vitamins']
    var minerals = nutritional_info['minerals']
    $('#show-recipe .modal__content').empty()
    $('#show-recipe .modal__content').append('<div class="image-title-container"><img class="image" src="'+image+'" alt="'+title+'"><h2 class="title">'+title+'</h3></div><div class="general-info"><h3 class="subtitle">General Information</h2><ul class="general-item"><li class="list-item"><h4 class="list-title">Calories</h4><span class="calories">'+calories+'</span></li><li class="list-item"><h4 class="list-title">Cusine Type</h4><span class="cuisine-type">'+cuisine_type+'</span></li><li class="list-item"><h4 class="list-title">Meal Type</h4><span class="meal-type">'+meal_type+'</span></li><li class="list-item"><h4 class="list-title">Dish Type</h4><span class="dish-type">'+dish_type+'</span></li><li class="list-item"><h4 class="list-title">Serves</h4><span class="serves">'+serves+'</span></li><li class="list-item"><h4 class="list-title">Diet Labels</h4><span class="diet-labels">'+diet_labels+'</span></li></ul></div>'+health_labels+'<div class="nutritional-info"><h3 class="subtitle">Nutritional Information</h3><ul class="nutritional-item proteins"><div class="title-container"><h4 class="list-title">Protein</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right total">'+proteins+'</span></li></div></ul><ul class="nutritional-item carbs"><div class="title-container"><h4 class="list-title">Carbs</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right total">'+carbs['total']+'</span></li><li class="list-item"><span class="left">Fiber</span><span class="right fiber">'+carbs['fiber']+'</span></li><li class="list-item"><span class="left">Sugars</span><span class="right sugar">'+carbs['sugar']+'</span></li><li class="list-item"><span class="left">Sugars Added</span><span class="right sugar-added">'+carbs['sugar-added']+'</span></li></div></ul><ul class="nutritional-item fat"><div class="title-container"><h4 class="list-title">Fats</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right total">'+fat['total']+'</span></li><li class="list-item"><span class="left">Trans</span><span class="right trans">'+fat['trans']+'</span></li><li class="list-item"><span class="left">Saturated</span><span class="right saturated">'+fat['saturated']+'</span></li><li class="list-item"><span class="left">Monounsaturated</span><span class="right monounsaturated">'+fat['monounsaturated']+'</span></li><li class="list-item"><span class="left">Polyunsaturated</span><span class="right polyunsaturated">'+fat['polyunsaturated']+'</span></li></div></ul><ul class="nutritional-item vitamins"><div class="title-container"><h4 class="list-title">Vitamins</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">A</span><span class="right a">'+vitamins['a']+'</span></li><li class="list-item"><span class="left">C</span><span class="right c">'+vitamins['c']+'</span></li><li class="list-item"><span class="left">B1</span><span class="right b1">'+vitamins['b1']+'</span></li><li class="list-item"><span class="left">B2</span><span class="right b2">'+vitamins['b2']+'</span></li><li class="list-item"><span class="left">B3</span><span class="right b3">'+vitamins['b3']+'</span></li><li class="list-item"><span class="left">B6</span><span class="right b6">'+vitamins['b6']+'</span></li><li class="list-item"><span class="left">B9</span><span class="right b9">'+vitamins['b9']+'</span></li><li class="list-item"><span class="left">B12</span><span class="right b12">'+vitamins['b12']+'</span></li><li class="list-item"><span class="left">D</span><span class="right d">'+vitamins['d']+'</span></li><li class="list-item"><span class="left">E</span><span class="right e">'+vitamins['e']+'</span></li><li class="list-item"><span class="left">K</span><span class="right k">'+vitamins['k']+'</span></li></div></ul><ul class="nutritional-item minerals"><div class="title-container"><h4 class="list-title">Minerals</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Sodium</span><span class="right sodium">'+minerals['sodium']+'</span></li><li class="list-item"><span class="left">Calcium</span><span class="right calcium">'+minerals['calcium']+'</span></li><li class="list-item"><span class="left">Magnesium</span><span class="right magnesium">'+minerals['magnesium']+'</span></li><li class="list-item"><span class="left">Potassium</span><span class="right potassium">'+minerals['potassium']+'</span></li><li class="list-item"><span class="left">Iron</span><span class="right iron">'+minerals['iron']+'</span></li><li class="list-item"><span class="left">Zinc</span><span class="right zinc">'+minerals['zinc']+'</span></li><li class="list-item"><span class="left">Phosphorus</span><span class="right phosphorus">'+minerals['phosphorus']+'</span></li></div></ul></div>')
  }
  function getHtmlUserResponse(parsed_data) {
    let plan_counter = 0
    let plan_type = parsed_data['type']
    let plan_data = parsed_data['data']
    let plan_html = parsed_data['html']
    let recipe_id = parsed_data['recipe_id']

    if (parsed_data['type'] == 'has-plan') {
      showPlans(plan_data, recipe_id)
    } else {
      if ($('#plan-container').length > 0)
        $('#plan-container').append(parsed_data['html'])
      else
        $('#show-plans .modal__content').append(parsed_data['html'])
    }
  }
// Shows user's plans
function showPlans(plans, recipe_id) {
  var html_content = ''
  var content = ''
  empty_plan = false

  html_content += '<div class="user-plans">'
  // plans loop
  let plan_counter = 1
  plans.forEach(function(plan){
    data = JSON.parse(JSON.parse(plan['data']))
    plan_id = plan['id']
    creation = JSON.parse(plan['creation'])
    last_mod = JSON.parse(plan['last_modified'])
    // plan container
    html_content += '<div id="plan'+plan_id+'" class="plan-container">'
    html_content += '<a class="plan btn btn-primary"><div class="plan-functions"><span>Plan '+plan_counter+'</span><i class="far fa-trash-alt delete"></i></div></a>'
    // days container
    html_content += '<div class="days-container">'
    // days loop
    for (let [day, day_value] of Object.entries(data['days'])) {
      var total_day_calories = day_value['total_calories']
      // day-container
      html_content += '<div class="day-container">'
      html_content += '<a id="" class="day btn btn-secondary">'+day+'</a>'
      // times-container
      html_content += '<div class="times-container">'
      // times loop
      for (let [time, recipe] of Object.entries(day_value['times'])) {
        if (Object.keys(recipe).length > 0) {
          console.log(recipe)
          html_content += '<a id="show-modal-recipe" data-micromodal-trigger="show-recipe" class="time full" data-plan="'+plan_id+'" data-day="'+day+'" data-time="'+time+'">'+time+' - '+recipe['title']+'</a>'
        } else {
          if ($('#plan-wrapper').length > 0)
            html_content += '<a class="time" data-plan="'+plan_id+'" data-day="'+day+'" data-time="'+time+'">There is no recipe</a>'
          else
            html_content += '<a id="add-time-recipe" class="time" data-recipe="'+recipe_id+'" data-plan="'+plan_id+'" data-day="'+day+'" data-time="'+time+'">Add '+time+'</a>'
        }
      }
      // end time container
      html_content += '</div>'
      // end day-container
      html_content += '</div>'
    }
    // end days-container
    html_content += '</div>'
    if (plans.length < 5 && plans.length == plan_counter)
      html_content += '<a id="create-plan" class="btn btn-primary create">Create Plan</a>'
    // end plan container
    html_content += '</div>'
    plan_counter++
  })
  html_content += '</div>'
  if ($('#recipes-wrapper').length > 0) {
    $('#show-plans .modal__content').append(html_content)
  } else if ($('#plan-wrapper').length > 0) {
    $('#plan-container .user-plans').remove()
    $('#plan-container').append(html_content)
  }
}

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
      console.log(plan_requirements)
      plan_requirements['plan_requirements'] = 'true'
    }
  });
}
function checkPlanAnswers(value, min, max) {
  if (value.length > 0 && !isNaN(value)) {
    if (value > min && value < max) {
      return true
    }
  }
  return false;
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
    // ajaxAddRecipe()
  });
  $(document).on('click', '#confirmation-true', function() {
    var plan_insert = {}

    var recipe_id = ''
    var time = $(this).data('time')
    var elements = $(this).closest('.confirmation-box').siblings('.time')
    elements.each(function(index, el) {
      if ($(this).data('time') == time) {
        plan_insert['plan_id'] = $(this).data('plan')
        plan_insert['day'] = $(this).data('day')
        plan_insert['time'] = $(this).data('time')
        recipe_id = $(this).data('recipe')
      }
    });

    plan_insert['recipe'] = getRecipe(recipe_id)
  })
  $(document).on('click', '#confirmation-false', function() {
    $(this).closest('.confirmation-box').remove()
  })
}
function getRecipe(recipe_id) {
  recipe_id = recipe_id.substr(recipe_id.length - 1);
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

    }
  }
  console.log(recipe_data['nutritional_info'])
}
function getHealthLabels(recipe_box) {
  var health_labels = []
  recipe_box.find('.health-label').each(function(index, el) {
    health_labels.push($(this).text())
  });
  return health_labels
}
function confirmationBox(time) {
  return '<div class="confirmation-box"><span class="text">Do you want to add the recipe ?</span><div class="btn-box"><a id="confirmation-true" data-time="'+time+'" class="btn btn-secondary">Yes</a><a id="confirmation-false" class="btn btn-primary">No</a></div></div>'
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
      var parsed_data = JSON.parse(data)
      /*console.log(data)*/
      var html_data = getHtmlUserResponse(parsed_data)
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
      // must load plans
      // console.log(data)
      var parsed_data = JSON.parse(data)
      showPlans(parsed_data)
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

function ajaxAddRecipe(data) {
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {'add_recipe': data},
    success: function(data) {
      // $('#add-recipe .modal__content').append(data)
      console.log(data)
    },
    error: function() {
      console.log("error")
    }
  })
}
function getHtmlUserResponse(parsed_data) {
  let plan_counter = 0
  let plan_type = parsed_data['type']
  let plan_data = parsed_data['data']
  let plan_html = parsed_data['html']
  let recipe_id = parsed_data['recipe_id']

  if (parsed_data['type'] == 'has-plan') {
    showPlans(plan_data, recipe_id)
  }
}
// Shows user's plans
function showPlans(plans, recipe_id) {
  var html_content = ''
  var content = ''
  empty_plan = false

  html_content += '<div class="user-plans">'
  // plans loop
  console.log(plans)
  let plan_counter = 1
  plans.forEach(function(plan){
    data = JSON.parse(JSON.parse(plan['data']))
    plan_id = plan['id']
    creation = JSON.parse(plan['creation'])
    last_mod = JSON.parse(plan['last_modified'])
    // plan container
    html_content += '<div id="plan'+plan_id+'" class="plan-container">'
    html_content += '<a id="" class="plan btn btn-primary">Plan '+plan_counter+'</a>'
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
        if (recipe.length > 0) {
          html += '<a id="show-recipe" class="time" data-plan="'+plan_id+'" data-day="'+day+'" data-time="'+time+'>'+time+'</a>'
        } else {
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
    $('#show-recipe').append(html_content)
  }
}

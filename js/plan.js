var plan_requirements = []

function planQuestionsHandler() {
  $('#questions-container .question .trigger').click(function() {
    let next = true
    let options = []
    let container_id = $(this).closest('.question').attr('id')
    switch (container_id) {
      case 'question-activity':
      options = ['Sedentary', 'Slightly Active', 'Moderately Active', 'Active', 'Very Active']
      let value = $('#answer-activity').text()
      if (options.includes(value))
        plan_requirements['activity'] = value
      break;
      case 'question-body':
      options = ['Ectomorph', 'Mesomorph', 'Endomorph']
      let value = $('#answer-body').text()
      if (options.includes(value))
        plan_requirements['body'] = value
      break;
      case 'question-objective':
      options = ['Maintain', 'Deficit', 'Surplus']
      let value = $('#answer-objective').text()
      if (options.includes(value))
        plan_requirements['objective'] = value
      break;
      case 'question-personal':
      let weight = $('#question-weight').val()
      let height = $('#question-height').val()
      let age = $('#question-age').val()

      if (!checkPlanAnswers(weight, 2, 700))
        console.log("true")
      else
        console.log("false")

      next = false
      break;
    }
    console.log(plan_requirements)
    $('#'+container_id).fadeOut()
    if (next) {
      setTimeout(function() {
        $('#'+container_id).next('.question').fadeIn()
      }, 500)
    } else {
      $('#'+container_id).next('.test-end').fadeIn()
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

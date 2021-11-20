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

function handlePlanDataInsertion() {
  $('#register-plan').click(function() {
    ajaxStoreUserData()
  })
}
function ajaxStoreUserData() {
  console.log(plan_requirements)
  $.ajax({
    url: 'php/plan-management/plan-management.php',
    type: 'post',
    data: {yes: "works"},
    success: function(data) {
      console.log("success")
      console.log(data)
    },
    error: function() {
      console.log("error")
    }
  });
}
// function sendAjaxRequest() {
//   function sendAjaxRequest(data_object) {
//     $.ajax({
//       url: 'php/api-management/api-management.php',
//       method: 'post',
//       dataType: 'text',
//       data: data_object,
//       success: function(data){
//       // Cuando se pasa la consulta aqui se muestran los datos data recibidos por el echo
//       console.log(data)
//       $('#recipes-filter .lds-ring').css('opacity', '0')
//       let api_response = data.split('arr-separation')[0]
//       if (pagination_urls.length == 0)
//         first_page_url = data.split('arr-separation')[1]
//       if (isStringJson(api_response)) {
//         parsed_response = JSON.parse(api_response)
//         if (!jQuery.isEmptyObject(parsed_response['hits'])){
//           if (!jQuery.isEmptyObject(parsed_response['_links']))
//             next_page_url = parsed_response['_links']['next']['href']
//           printRecipes()
//         } else {
//           changeEmptyContainerContent('No matches found, please change your search criteria')
//           page_reset = true
//           managePaginationStyle()
//         }
//       } else {
//         changeEmptyContainerContent('No matches found, please change your search criteria')
//         page_reset = true
//         managePaginationStyle()
//       }
//     },
//     error: function() {
//       console.log('error recipe')
//     }
//   });
//   }
// }

<?php
// Register user to plan //
function manageUserCredentials($plan_requirements) {

  $bmr = '';
  if (checkParams($plan_requirements)) {
    $bmr = calculateBmr($plan_requirements['sex'], $plan_requirements['weight'], $plan_requirements['height'], $plan_requirements['age'], $plan_requirements['activity']);
    $plan_requirements['bmr'] = $bmr;
    $bbdd = new bbdd();
    if ($bbdd->updateUserPlanDetails($plan_requirements, $_SESSION['username'])) {
      $_SESSION['plan'] = 'true';
    }
    $bbdd->close();
  }
}
function checkParams($plan_requirements) {
	$correct_params = true;

	$sex = $plan_requirements['sex'];
	$activity = $plan_requirements['activity'];
	$body = $plan_requirements['body'];
	$objective = $plan_requirements['objective'];
	$weight = $plan_requirements['weight'];
	$height = $plan_requirements['height'];
	$age = $plan_requirements['age'];

	$sex_options = ['Male', 'Female'];
	$activity_options = ['Sedentary', 'Slightly Active', 'Moderately Active', 'Active', 'Very Active'];
	$body_options = ['Ectomorph', 'Mesomorph', 'Endomorph'];
	$objective_options = ['Maintain Weight', 'Lose Weight', 'Gain Weight'];

	if (!$sex != '' || !in_array($sex, $sex_options))
		$correct_params = false;
	else if (!$activity != '' || !in_array($activity, $activity_options))
		$correct_params = false;
	else if (!$body != '' || !in_array($body, $body_options))
		$correct_params = false;
	else if (!$objective != '' || !in_array($objective, $objective_options))
		$correct_params = false;
	else if (!$weight != '' || !checkPlanAnswers($weight, 2, 700))
		$correct_params = false;
	else if (!$height != '' || !checkPlanAnswers($height, 53, 272))
		$correct_params = false;
	else if (!$age != '' || !checkPlanAnswers($age, 18, 90))
		$correct_params = false;

	return $correct_params;
}
function checkPlanAnswers($value, $min, $max) {
  if (strlen($value) > 0 && is_numeric($value)) {
    if ($value > $min && $value < $max) {
      return true;
    }
  }
  return false;
}
function calculateBmr($sex, $weight, $height, $age, $activity) {
	$bmr = '';
	if ($sex == 'Male') {
		$bmr = (10 * $weight) + (6.25 * $height) - (5 * $age) + 5;
	} else {
		$bmr = (10 * $weight) + (6.25 * $height) - (5 * $age) - 161;
	}
  switch($activity) {
    case 'Sedentary':
    $bmr = $bmr * 1.2;
    break;
    case 'Slightly Active':
    $bmr = $bmr * 1.1375;
    break;
    case 'Moderately Active':
    $bmr = $bmr * 1.55;
    break;
    case 'Active':
    $bmr = $bmr * 1.725;
    break;
    case 'Very Active':
    $bmr = $bmr * 1.9;
    break;
  }
  return $bmr;
}
// End Register user to plan //

// Get user response depending on lvl //
function getUserResponse($username) {
  $recipe_id = $_POST['get_user_response'];
  $bbdd = new bbdd();
  $response = [
    'html' => '',
    'data' => '',
    'type' => '',
    'recipe_id' => ''
  ];
  $response['html'] = '<div class="user-response">';
  // User not registered
  if ($username == '') {
    $response['html'] .= '<span class="text">You need an account to use this service</span><a class="btn btn-primary" href="index.php?page=session_layout">Go to Register</a>';
    $response['type'] = 'unregistered-user';
  } else if ($bbdd->userAlreadyExists(['username' => $username])){
    if ($bbdd->userHasPlan($username)) {
      $plans = loadPlans($username);
      if (!empty($plans)) {
        $response['data'] = $plans;
        $response['type'] = 'has-plan';
      } else {
        $response['html'] .= '<span class="text">You need a plan to use this service</span><a id="create-plan" class="btn btn-primary">Create plan</a>';
        $response['type'] = 'no-plan';
      }
    } else {
      $response['html'] .= '<span class="text">You need to plan register to use this service</span><a href="index.php?page=plan" class="btn btn-primary">Go to Plan</a>';
      $response['type'] = 'unregistered-plan';
    }
  }
  $response['html'] .= '</div>';
  $response['recipe_id'] = $recipe_id;
  // echo $response;
  echo json_encode($response);
}
// End Get user response depending on lvl //
// Load plans from user
function loadPlans($username) {
  $bbdd = new bbdd();
  $plans = [];
  $plans = $bbdd->getPlans($username);
  $bbdd->close();
  return $plans;
}
function getHealthLabelsHtml($nutrient_object) {
  $added_html = '';

  $added_html .= '<div class="health-info"><h3 class="subtitle">Health Labels</h3><ul class="health-item">';
  for($i = 0; $i < count($nutrient_object); $i++) {
    $added_html .= '<li class="list-item"><span>'+$nutrient_object[$i]+'</span></li>';
  }
  $added_html .= '</ul></div>';

  return $added_html;
}
// Plan creation
function createPlan($username) {
  $response = '<span>Error: Plan not created</span>';
  $bbdd = new bbdd();
  if ($bbdd->createPlan($username)) {
    $response = loadPlans($username);
    echo json_encode($response);
  } else {
    echo $response;
  }
  $bbdd->close();
}
// Plan updating
function updatePlan($plan_id) {
  $bbdd = new bbdd();
  if ($bbdd->updatePlan()) {
  }
  $bbdd->close();
}

function loadPlanButtons($plans) {
  $count = 1;
  for($i = 0; $i < $plans; $i++) {
    echo '<button id="plan'.$count.'" class="plan-btn">Plan '.$count.'</button>';
    $count++;
  }
}
function addRecipe($recipe) {
  $added_recipe = false;
  $bbdd = new bbdd();
  $bbdd->addRecipe($recipe);
  $bbdd->close();
  echo $recipe['id'];
}
function getRecipe($request_data) {
  $recipe = '';
  $bbdd = new bbdd();
  $recipe = $bbdd->getRecipe($request_data);
  $bbdd->close();
  echo $recipe;
}
function removePlan($plan_id) {
  $plan_removed = false;
  $bbdd = new bbdd();
  if ($bbdd->removePlan($plan_id))
    $plan_removed = true;
  $bbdd->close();
  echo $plan_removed;
}
?>

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
    'type' => ''
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
function loadModal() {
  $image = $time_value['img'];
  $title = $time_value['title'];
  $calories = $time_value['calories'];
  $cuisine_type = $time_value['cuisine_type'];
  $meal_type = $time_value['meal_type'];
  $dish_type = $time_value['dish_type'];
  $serves = $time_value['serves'];
  $diet_labels = implode(',', $time_value['diet_labels']);
  $health_labels = getHealthLabelsHtml($time_value['health_labels']);

  $proteins = $time_value['nutritional_info']['protein']['total'];
  $carbs['total'] = $time_value['nutritional_info']['carbs']['total'];
  $carbs['fiber'] = $time_value['nutritional_info']['carbs']['fiber'];
  $carbs['sugar'] = $time_value['nutritional_info']['carbs']['sugar'];
  $carbs['sugar_added'] = $time_value['nutritional_info']['carbs']['sugar_added'];

  $nutritional_info = $time_value['nutritional_info'];
  $fat['total'] = $nutritional_info['fats']['total'];
  $fat['trans'] = $nutritional_info['fats']['trans'];
  $fat['saturated'] = $nutritional_info['fats']['saturated'];
  $fat['monounsaturated'] = $nutritional_info['fats']['monounsaturated'];
  $fat['polyunsaturated'] = $nutritional_info['fats']['polyunsaturated'];
  $vitamins['a'] = $nutritional_info['vitamins']['a'];
  $vitamins['c'] = $nutritional_info['vitamins']['a'];
  $vitamins['b1'] = $nutritional_info['vitamins']['a'];
  $vitamins['b2'] = $nutritional_info['vitamins']['a'];
  $vitamins['b3'] = $nutritional_info['vitamins']['a'];
  $vitamins['b6'] = $nutritional_info['vitamins']['a'];
  $vitamins['b9'] = $nutritional_info['vitamins']['a'];
  $vitamins['b12'] = $nutritional_info['vitamins']['a'];
  $vitamins['d'] = $nutritional_info['vitamins']['a'];
  $vitamins['e'] = $nutritional_info['vitamins']['a'];
  $vitamins['k'] = $nutritional_info['vitamins']['a'];
  $minerals['sodium'] = $nutritional_info['minerals']['sodium'];
  $minerals['calcium'] = $nutritional_info['minerals']['calcium'];
  $minerals['magnesium'] = $nutritional_info['minerals']['magnesium'];
  $minerals['potassium'] = $nutritional_info['minerals']['potassium'];
  $minerals['iron'] = $nutritional_info['minerals']['iron'];
  $minerals['zinc'] = $nutritional_info['minerals']['zinc'];
  $minerals['phosphorus'] = $nutritional_info['minerals']['phosphorus'];
  echo '
  <div class="modal micromodal-slide" id="recipe-modal" aria-hidden="true"><div class="modal__overlay" tabindex="-1" data-micromodal-close><div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title"><header class="modal__header"><button class="modal__close" aria-label="Close modal" data-micromodal-close></button></header><main class="modal__content"><div class="image-title-container"><img class="image" src="'.$image.'" alt="'.$title.'"><h2 class="title">'.$title.'</h3></div><div class="general-info"><h3 class="subtitle">General Information</h2><ul class="general-item"><li class="list-item"><h4 class="list-title">Calories</h4><span>'.$calories.'</span></li><li class="list-item"><h4 class="list-title">Cusine Type</h4><span>'.$cuisine_type.'</span></li><li class="list-item"><h4 class="list-title">Meal Type</h4><span>'.$meal_type.'</span></li><li class="list-item"><h4 class="list-title">Dish Type</h4><span>'.$dish_type.'</span></li><li class="list-item"><h4 class="list-title">Serves</h4><span>'.$serves.'</span></li><li class="list-item"><h4 class="list-title">Diet Labels</h4><span>'.$diet_labels.'</span></li></ul></div>'.$health_labels.'<div class="nutritional-info"><h3 class="subtitle">Nutritional Information</h3><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Protein</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'.$proteins.'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Carbs</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'.$carbs['total'].'</span></li><li class="list-item"><span class="left">Fiber</span><span class="right">'.$carbs['fiber'].'</span></li><li class="list-item"><span class="left">Sugars</span><span class="right">'.$carbs['sugar'].'</span></li><li class="list-item"><span class="left">Sugars Added</span><span class="right">'.$carbs['sugar_added'].'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Fats</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'.$fat['total'].'</span></li><li class="list-item"><span class="left">Trans</span><span class="right">'.$fat['trans'].'</span></li><li class="list-item"><span class="left">Saturated</span><span class="right">'.$fat['saturated'].'</span></li><li class="list-item"><span class="left">Monounsaturated</span><span class="right">'.$fat['monounsaturated'].'</span></li><li class="list-item"><span class="left">Polyunsaturated</span><span class="right">'.$fat['polyunsaturated'].'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Vitamins</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">A</span><span class="right">'.$vitamins['a'].'</span></li><li class="list-item"><span class="left">C</span><span class="right">'.$vitamins['c'].'</span></li><li class="list-item"><span class="left">B1</span><span class="right">'.$vitamins['b1'].'</span></li><li class="list-item"><span class="left">B2</span><span class="right">'.$vitamins['b2'].'</span></li><li class="list-item"><span class="left">B3</span><span class="right">'.$vitamins['b3'].'</span></li><li class="list-item"><span class="left">B6</span><span class="right">'.$vitamins['b6'].'</span></li><li class="list-item"><span class="left">B9</span><span class="right">'.$vitamins['b9'].'</span></li><li class="list-item"><span class="left">B12</span><span class="right">'.$vitamins['b12'].'</span></li><li class="list-item"><span class="left">D</span><span class="right">'.$vitamins['d'].'</span></li><li class="list-item"><span class="left">E</span><span class="right">'.$vitamins['e'].'</span></li><li class="list-item"><span class="left">K</span><span class="right">'.$vitamins['k'].'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Minerals</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Sodium</span><span class="right">'.$minerals['sodium'].'</span></li><li class="list-item"><span class="left">Calcium</span><span class="right">'.$minerals['calcium'].'</span></li><li class="list-item"><span class="left">Magnesium</span><span class="right">'.$minerals['magnesium'].'</span></li><li class="list-item"><span class="left">Potassium</span><span class="right">'.$minerals['potassium'].'</span></li><li class="list-item"><span class="left">Iron</span><span class="right">'.$minerals['iron'].'</span></li><li class="list-item"><span class="left">Zinc</span><span class="right">'.$minerals['zinc'].'</span></li><li class="list-item"><span class="left">Phosphorus</span><span class="right">'.$minerals['phosphorus'].'</span></li></div></ul></div></main></div></div></div>
  ';
}
function loadPlanButtons($plans) {
  $count = 1;
  for($i = 0; $i < $plans; $i++) {
    echo '<button id="plan'.$count.'" class="plan-btn">Plan '.$count.'</button>';
    $count++;
  }
}
function addRecipe($recipe) {
  $bbdd = new bbdd();
  if ($bbdd->addRecipe($recipe))
    echo "insertd";
  else
    echo "not inseted";
  $bbdd->close();
}
?>

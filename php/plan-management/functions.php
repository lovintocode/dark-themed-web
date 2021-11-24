<?php

// Register user to plan
function manageUserCredentials($plan_requirements) {

  $bmr = '';
  if (checkParams($plan_requirements)) {
    $bmr = calculateBmr($plan_requirements['sex'], $plan_requirements['weight'], $plan_requirements['height'], $plan_requirements['age'], $plan_requirements['activity']);
    $plan_requirements['bmr'] = $bmr;
    $bbdd = new bbdd();
    if ($bbdd->updateUserPlanDetails($plan_requirements, $_SESSION['username'])) {
      $_SESSION['plan'] = 'true';
    }
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

// Plan management
function getPlanData() {
  $username = $_SESSION['username'];
}

?>

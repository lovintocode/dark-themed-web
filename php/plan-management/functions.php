<?php

function manageUserCredentials() {
	$plan_requirements = $_POST['plan_requirements'];
	$bmr = '';
	$username = $_SESSION['username'];
	if (checkParams($plan_requirements)) {
		$bmr = calculateBmr($username);
		echo $bmr;
	}
}
function checkParams() {
	$correct_params = false;

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

function calculateBmr($sex, $weight, $height, $age) {
	$bmr = '';
	if ($sex == 'Male') {
		$bmr = (10 * $weight) + (6.25 * $height) - (5 * $age) + 5;
	} else {
		$bmr = (10 * $weight) + (6.25 * $height) - (5 * $age) - 161;
	}
	return $bmr;
}
?>
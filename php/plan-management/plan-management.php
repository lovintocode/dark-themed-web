<?php
if (isset($_POST['plan_requirements']) || isset($_POST['get_user_response']) ||isset($_POST['create_plan']) || isset($_POST['get_plans']) || isset($_POST['add_recipe'])) {
  require_once "../../config.php";
  require_once "../bbdd/bbdd.php";
  require_once "functions.php";
} else {
  require_once "config.php";
  require_once "php/bbdd/bbdd.php";
  require_once "functions.php";
}
$username = '';
if (isset($_SESSION['username']))
  $username = $_SESSION['username'];
if (isset($_POST['plan_requirements']))
	manageUserCredentials($_POST['plan_requirements']);
else if (isset($_POST['get_user_response']))
  getUserResponse($username);
else if (isset($_POST['create_plan']))
  createPlan($username);
else if (isset($_POST['get_plans']))
	loadPlans($username);
else if (isset($_POST['add_recipe']))
  addRecipe($_POST['add_recipe'])
// else if (isset($_POST['update_plan']))
//   updatePlan();
?>

<?php
if (isset($_POST['plan_requirements'])){
  require_once "../../config.php";
  require_once "../bbdd/bbdd.php";
  require_once "functions.php";
} else {
  require_once "config.php";
  require_once "php/bbdd/bbdd.php";
  require_once "functions.php";
}
if (isset($_POST['plan_requirements']))
	manageUserCredentials($_POST['plan_requirements']);
else if (isset($_POST['create_plan']))
  createPlan($_SESSION['username']);
else if (isset($_POST['get_plan_data']))
	getPlanData($_SESSION['username']);
else if (isset($_POST['update_plan']))
  updatePlan();
?>

<?php
require_once 'php/bbdd/bbdd.php';
require_once 'php/bbdd/session-functions.php';

$response_text = '';
$class_switch = '';

if (isset($_POST['register_user'])) {
  $credentials = array();
  $credentials['username'] = $_POST['username'];
  $credentials['email'] = $_POST['email'];
  $credentials['password'] = $_POST['password'];
  $credentials['password_verify'] = $_POST['password_verify'];

  if (checkValidCredentials($credentials)['credentials']['valid'] == 'true') {
    $bbdd = new bbdd();
    if (!$bbdd->userAlreadyExists($credentials)) {
      if ($bbdd->insertNewUser($credentials)) {
        $response_text = 'User registered';
        $class_switch = 'valid';
      } else {
        $response_text = 'User not registered';
        $class_switch = 'invalid';
      }
    } else {
      $response_text = 'User already exists';
      $class_switch = 'invalid';
    }
    $bbdd->close();
  } else {
    $response_text = "Credentials not valid";
    $class_switch = 'invalid';
  }
} else if (isset($_POST['login_user'])) {
  $credentials = array();
  $credentials['username'] = $_POST['username'];
  $credentials['password'] = $_POST['password'];

  if (checkValidCredentials($credentials)['credentials']['valid'] == 'true') {
    $bbdd = new bbdd();
    if ($bbdd->userAlreadyExists($credentials)) {
      if ($bbdd->logInUser($credentials)) {
        $_SESSION['username'] = $credentials['username'];
        changeLayoutUsername($credentials);
        if (isset($_SESSION['username']) && $bbdd->userHasPlan($_SESSION['username']))
          $_SESSION['plan'] = 'true';
      } else {
        $response_text = "User not logged in";
        $class_switch = 'invalid';
      }
      $bbdd->close();
    } else
    $response_text = "User not exists";
    $class_switch = 'invalid';
  } else {
     $response_text = "Credentials not valid";
     $class_switch = 'invalid';
  }
} else if (isset($_POST['logout'])) {
  session_destroy();
  header('Location: index.php');
}
?>

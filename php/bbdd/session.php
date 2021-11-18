<?php
require_once ROOT.'/php/bbdd/bbdd.php';
require_once ROOT.'/php/bbdd/session-functions.php';
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
        echo "user inserted";
      } else {
        echo "user not inserted";
      }
    } else {
      echo "user already exists";
    }
    $bbdd->close();
  } else {
    echo "credentials not valid";
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
        if ($bbdd->userHasPlan($_SESSION['username']))
          $_SESSION['plan'] = 'true';
      } else {
        echo "User not logged in";
      }
    $bbdd->close();
    } else
      echo "User not exists";
  }
} else if (isset($_POST['logout'])) {
  session_destroy();
  header('Location: index.php');
}
?>

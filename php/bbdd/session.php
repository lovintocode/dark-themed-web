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
        echo '<script>
        let session_name = document.getElementById("session-user")
        session_name.querySelector("span").innerHTML = "'.$credentials['username'].'"        
        </script>';
      } else {
        echo "User not logged in";
      }
    }
  }
} else if (isset($_POST['logout'])) {
  session_destroy();
  header('Location: index.php');
}
?>

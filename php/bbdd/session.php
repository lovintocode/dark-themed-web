<?php
require_once ROOT.'/php/bbdd/bbdd.php';
require_once ROOT.'/php/bbdd/session_functions.php';
if (isset($_POST['register_user'])) {
  $credentials = array();
  $credentials['username'] = $_POST['username'];
  $credentials['email'] = $_POST['email'];
  $credentials['password'] = $_POST['password'];
  $credentials['password_verify'] = $_POST['password_verify'];
  if (checkValidCredentials($credentials) == 'true') {
    if (!userAlreadyExists($credentials)) {
      
    }
  } else {
  }
}
	// if (isset($_POST['login_user'])) {

	// }
?>

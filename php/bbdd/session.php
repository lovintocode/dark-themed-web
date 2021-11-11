<?php
	require_once ROOT."/php/bbdd/bbdd.php";
	require_once ROOT."/php/bbdd/session_functions.php";
	if (isset($_POST['register_user'])) {
		$username = $_POST['username'];
		$email = $_POST['email'];
		$password = $_POST['password'];
		$credentials = array();
		$credentials['username'] = $username;
		$credentials['email'] = $email;
		$credentials['password'] = $password;
		$validated_credentials = checkValidCredentials($credentials);
		print_r($validated_credentials);
	}
	// if (isset($_POST['login_user'])) {

	// }

 ?>
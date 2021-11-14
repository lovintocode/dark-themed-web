<?php
function checkValidCredentials($credentials) {
	$return_response = array();
  $valid_credentials = 'true';
  foreach ($credentials as $key => $value) {
    if (!empty($value)) {
     switch ($key) {
      case 'username':
      if (strlen($value) < 4 || strlen($value) > 16 ) {
        $return_response['username']['valid'] = 'false' ;
        $return_response['username']['string'] = 'Username must be greater than three and smaller than 17';
        $valid_credentials = 'false';
      } else if (preg_match('/@[A-Za-z0-9_]+\*/', $value)) {
        $return_response['username']['valid'] = 'false';
        $return_response['username']['string'] = 'Username must only contain letters, numbers and underscores';
        $valid_credentials = 'false';
      } else {
        $return_response['username']['valid'] = 'true';
      }
      break;
      case 'email':
      if (!filter_var($value, FILTER_VALIDATE_EMAIL)  ) {
        $return_response['email']['valid'] = 'false';
        $return_response['email']['string'] = 'Email invalid format';
        $valid_credentials = 'false';
      } else {
        $return_response['email']['valid'] = 'true';
      }
      break;
      case 'password':
      if (strlen($value) < 8  || strlen($value) > 30) {
        $return_response['password']['valid'] = 'false';
        $return_response['password']['string'] = 'Password must be greater than 8 and smaller than 31';
        $valid_credentials = 'false';
      } else {
        $return_response['password']['valid'] = 'true';
      }
      break;
      case 'password_verify':
      if (strlen($value) < 8 || strlen($value) > 30) {
        $return_response['password_verify']['valid'] = 'false';
        $return_response['password_verify']['string'] = 'Password must be greater than 8 and smaller than 31';
        $valid_credentials = 'false';
      } else if ($credentials['password'] != $value) {
        $return_response['password_verify']['valid'] = 'false';
        $return_response['password_verify']['string'] = 'Passwords must be equal';
        $valid_credentials = false;
      } else {
        $return_response['password_verify']['valid'] = 'true';
      }
      break;
    }
  }
}
$return_response['credentials']['valid'] = $valid_credentials;
return $return_response;
}
?>

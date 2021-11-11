<?php
function checkValidCredentials($credentials) {
	$return_response = array();
	foreach ($credentials as $key => $value) {
		if (!empty($value)) {
			switch ($key) {
				case 'username':
					if ($value.length < 5) {
						$return_response['username']['valid'] = false ;
						$return_response['username']['string'] = 'Username must be greater than four';
					} else if (preg_match('@[A-Za-z0-9_]+*', $value)) {
						$return_response['username']['valid'] = false ;
						$return_response['username']['string'] = 'Username must only contain letters, numbers and underscores';
					} else {
						$return_response['username']['valid'] = true;
						$return_response['username']['string'] = 'Username is valid';
					}
				break;
				case 'email':
					if (!filter_var($value, FILTER_VALIDATE_EMAIL)  ) {
						$return_response['email']['valid'] = false;
						$return_response['email']['string'] = 'Email invalid format';
					} else {
						$return_response['email']['valid'] = true;
					}
				break;
				case 'password':
					if ($value.length < 8  ) {
						$return_response['password']['valid'] = false;
						$return_response['password']['string'] = 'Password must be greater than 8';
					} else {
						$return_response['password']['valid'] = true;
					}
				break;
				case 'password_verify':
					if ($value.length < 8  ) {
						$return_response['password']['valid'] = false;
						$return_response['password']['string'] = 'Password must be greater than 8';
					} else {
						$return_response['password']['valid'] = true;
					}
				break;
			}
		}
	} 
	return $return_response;
}
?>
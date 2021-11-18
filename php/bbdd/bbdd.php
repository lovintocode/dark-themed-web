<?php
class bbdd {

	protected $connection;
	protected $query;

	public function __construct($dbhost = HOST, $dbuser = USER, $dbpass = PASSWORD, $dbname = DATABASE, $charset = 'utf8') {
		$this->connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
		if ($this->connection->connect_error) {
			$this->error('Failed to connect to MySQL - ' . $this->connection->connect_error);
		}
		$this->connection->set_charset($charset);
	}

  // GENERAL FUNCTIONS //
  function close() {
    $this->connection = '';
  }

  // USER FUNCTIONS //
  function userAlreadyExists($credentials) {
    $username = $credentials['username'];

    $user_exists = false;
    $query = 'SELECT * FROM users WHERE username=?';
    $stmt = $this->connection->prepare($query);
    if ($stmt){
     $stmt->bind_param("s", $username);
     $stmt->execute();
     if(mysqli_num_rows($stmt->get_result()) > 0) 
      $user_exists = true;
    $stmt->close();
  }
  return $user_exists;
}
function insertNewUser($credentials) {
  $username = $credentials['username'];
  $email = $credentials['email'];
  $password = password_hash($credentials['password'], CRYPT_BLOWFISH);

  $user_inserted = false;
  $query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  $stmt = $this->connection->prepare($query);
  if ($stmt){
   $stmt->bind_param("sss", $username, $email, $password);
   if ($stmt->execute())
    $user_inserted = true;
  $stmt->close();
}
return $user_inserted;
}
function logInUser($credentials) {
  $username = $credentials['username'];
  $password = $credentials['password'];

  $user_checked = false;
  $query = 'SELECT * FROM users WHERE username=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt){
   $stmt->bind_param("s", $username);
   if ($stmt->execute()){
    $result = $stmt->get_result();
    if(mysqli_num_rows($result) > 0) {
     while ($data = $result->fetch_assoc()) {
      if (password_verify($password, $data['password']))
       $user_checked = true;
   }
 }
}
$stmt->close();
}
return $user_checked;
}
function deleteUser($credentials) {
  $username = $credentials['username'];

  $user_deleted = false;
  $query = 'DELETE ? FROM users';
  $stmt = $this->connection->prepare($query);
  if ($stmt){
   $stmt->bind_param("s", $username);
   if ($stmt->execute())
    $user_deleted = true;
  $stmt->close();
}
return $user_deleted;
}
function getAllUserData($username) {
  $user_data = array();

  $user_data_received = false;
  $query = 'SELECT * FROM users WHERE username=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt){
    $stmt->bind_param("s", $username);
    if ($stmt->execute()){
      $result = $stmt->get_result();
      if(mysqli_num_rows($result) > 0) {
        while ($data = $result->fetch_assoc()) {
          $user_data['username'] = $_SESSION['username'];
          $user_data['email'] = $data['email'];
          $user_data['bmr'] = $data['bmr'];
          $user_data['weight'] = $data['weight'];
          $user_data['height'] = $data['height'];
          $user_data['age'] = $data['age'];
          $user_data['activity'] = $data['activity'];
          $user_data['body_type'] = $data['body_type'];
          $user_data['objective'] = $data['objective'];
          $user_data['plan'] = $data['plan'];
        }
      }
    }
    $stmt->close();
  }
  return $user_data;
}
function userHasPlan($username) {
  $plan_exists = false;

  $query = 'SELECT plan FROM users WHERE username=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt){
    $stmt->bind_param("s", $username);
    if ($stmt->execute()) {
      $result = $stmt->get_result();
      if(mysqli_num_rows($result) > 0) {
        while ($data = $result->fetch_assoc()) {
          if (!empty($data['plan']))
            $plan_exists = true;
        }
      }
    }
    $stmt->close();
  }
  return $plan_exists;
}
  // PLANS FUNCTIONS //
}
?>

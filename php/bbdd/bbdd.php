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
  function getUserId($username) {
    $id = '';

    $query = 'SELECT id FROM users WHERE username =?';
    $stmt = $this->connection->prepare($query);
    if ($stmt) {
      $stmt->bind_param('s', $username);
      if ($stmt->execute()) {
        $result = $stmt->get_result();
        if (mysqli_num_rows($result) > 0){
          while ($data = $result->fetch_assoc())
            $id = $data['id'];
        }
      }
    }
    $stmt->close(); 
    return $id;
  }
  function userAlreadyExists($credentials) {
    $username = $credentials['username'];

    $user_exists = false;
    $query = 'SELECT * FROM users WHERE username=?';
    $stmt = $this->connection->prepare($query);
    if ($stmt){
     $stmt->bind_param('s', $username);
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

  // Must finish
function deleteUser($credentials) {
  $username = $credentials['username'];
  $password = $credentials['password'];

  $user_deleted = false;
  $query = 'DELETE FROM users WHERE username=?';
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
      $user_data = $data;
      $user_data['username'] = $_SESSION['username'];
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
   $stmt->bind_param('s', $username);
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
function updateUserPlanDetails($plan_requirements, $username) {
  $details_inserted = false;

  $bmr = $plan_requirements['bmr'];
  $weight = $plan_requirements['weight'];
  $height = $plan_requirements['height'];
  $age = $plan_requirements['age'];
  $activity = $plan_requirements['activity'];
  $body_type = $plan_requirements['body'];
  $objective = $plan_requirements['objective'];
  $plan_valid = 'true';

  $query = 'UPDATE users SET bmr=?, weight=?, height=?, age=?, activity=?, body_type=?, objective=?, plan=? WHERE username=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt) {
    $stmt->bind_param('sssssssss', $bmr, $weight, $height, $age, $activity, $body_type, $objective, $plan_valid, $username);
    if ($stmt->execute()) {
      $details_inserted = true;
    }
    $stmt->close();
  }
  return $details_inserted;
}
function createPlan($username) {
  $plan_created = false;
  $user_plan_count = $this->countUserPlans($username);

  if ($user_plan_count < 5) {
    $user_id = $this->getUserId($username);
    $data = json_encode(file_get_contents("../../json/plan-empty.json"));
    $creation = array(
      'date' => date('Y-m-d') ,
      'time' => date('h:i:sa')
    );
    $last_modified = $creation;
    $creation_encoded = json_encode($creation);
    $last_mod_encoded = json_encode($last_modified);
    $query = 'INSERT INTO plans (data, creation, last_modified, id_user) VALUES (?, ?, ?, ?)';
    $stmt = $this->connection->prepare($query);
    if ($stmt) {
      $stmt->bind_param('ssss', $data, $creation_encoded, $last_mod_encoded, $user_id);
      if ($stmt->execute()) {
        $plan_created = true;
      }
      $stmt->close();
    }
  }
  return $plan_created;
}
function updatePlan($plan_id, $updates) {
  $plan_updated = false;

  $prepared_string = str_repeat('s', count($updates['values']));
  $query = 'UPDATE plans SET '.$updates['type'].' WHERE id=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt) {
    $stmt->bind_param($prepared_string, $updates['values']);
    if ($stmt->execute()) {
      $plan_updated = true;
    }
    $stmt->close();
  }
  return $plan_updated;
}
function getPlans($username) {
  $plan_information = [];
  $aux_arr = array();

  $user_id = $this->getUserId($username);
  $query = 'SELECT * FROM plans WHERE id_user=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt) {
    $stmt->bind_param('s', $user_id);
    if ($stmt->execute()) {
      $result = $stmt->get_result();
      if(mysqli_num_rows($result) > 0) {
        while ($data = $result->fetch_assoc()) {
          array_push($plan_information, $data);
        }
      }
    }
    $stmt->close();
  }
  return $plan_information;
}
function countUserPlans($username) {
  $plan_count = 0;

  $user_id = $this->getUserId($username);
  $query = 'SELECT * FROM plans WHERE id_user=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt) {
    $stmt->bind_param('s', $user_id);
    if ($stmt->execute()) {
      $result = $stmt->get_result();
      $plan_count = mysqli_num_rows($result);
    }
  }
  return $plan_count;
}
function addRecipe($recipe) {
  $recipe_added = false;
 
  $plan_id = $recipe['plan_id'];
 $day = $recipe['day'];
  $time = $recipe['time'];
  $recipe_data = $recipe['recipe'];
  $last_modified = json_encode(array(
    'date' => date('Y-m-d') ,
    'time' => date('h:i:sa')
  ));
  $plan = $this->getPlan($plan_id);
  $plan = json_decode(json_decode($plan, true), true);
  $plan['days'][$day]['times'][$time] = $recipe_data;
  $recipe_inserted = json_encode(json_encode($plan));
  $query = 'UPDATE plans SET data=?, last_modified=? WHERE id=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt){
    $stmt->bind_param("sss", $recipe_inserted, $last_modified, $plan_id);
    if ($stmt->execute())
      $recipe_added = true;
  }
  $stmt->close();
  return $recipe_added;
}
function getPlan($plan_id) {
  $plan = '';

  $query = 'SELECT data FROM plans WHERE id=?';
  $stmt = $this->connection->prepare($query);
  if ($stmt) {
    $stmt->bind_param('s', $plan_id);
    if ($stmt->execute()) {
      $result = $stmt->get_result();
      if (mysqli_num_rows($result) > 0){
        while ($data = $result->fetch_assoc())
          $plan = $data['data'];
      }
    }
  }
  $stmt->close(); 
  return $plan;
}
}
?>

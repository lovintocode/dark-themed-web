<?php
$servername = "db5005386872.hosting-data.io";
$database = "dbs4519684";
$username = "dbu654331";
$password = "healthstep01";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
mysqli_close($conn);

?>
<?php
$username = $_SESSION['username'];
?>

<div id="user-wrapper">
	<p><?php echo $username;?></p>
	<form action="" method="post">
		<input type="submit" name="logout" value="Log Out">
	</form>
</div>

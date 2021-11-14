<?php
require_once ROOT.'/php/bbdd/session.php';
?>


<?php
if (isset($_SESSION['username'])) {
	include ROOT.'/pages/user-screen.php';
}		
else {
	include ROOT.'/pages/credentials-screen.php';
}
?>
<?php
require_once ROOT.'/php/bbdd/session.php';

if (isset($_SESSION['username'])) {
	include ROOT.'/pages/user-panel.php';
} else {
	include ROOT.'/pages/credentials-screen.php';
}
?>

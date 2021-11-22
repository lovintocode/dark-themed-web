<link rel="stylesheet" type="text/css" href="css/session/general.css">
<?php
require_once 'php/bbdd/session.php';

if (isset($_SESSION['username'])) {
	include 'pages/subpages/session/user-panel.php';
} else {
	include 'pages/subpages/session/credentials-screen.php';
}
?>

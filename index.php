
<?php
require_once "_templates/header.php";
?>
<div id="preloader">
  <img src="img/icons/preloader.gif" alt="preloader">
</div>
<?php
  require_once "_templates/nav.php";
?>
<?php
  if (isset($_GET['page'])) {
    $page = $_GET['page'];
    switch ($page) {
      case 'home': require_once "pages/home.php";
      break;
      case 'contact': require_once "pages/contact.php";
      break;
    }
  }
?>
<?php
  require_once "_templates/footer.php";
?>

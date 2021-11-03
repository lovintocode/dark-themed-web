<?php
session_start();
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
      case 'recipes': require_once "pages/recipes.php";
      break;
    }
  } else {
    require_once "pages/home.php";
  }
?>
<?php
  require_once "_templates/footer.php";
?>

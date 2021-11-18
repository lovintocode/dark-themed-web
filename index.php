<?php
session_start();
require_once "config.php";
require_once ROOT."/_templates/header.php";
?>
<div id="preloader">
  <img src="img/icons/preloader.gif" alt="preloader">
</div>
<a href="index.php?page=session_layout" title="USER">
  <div id="session-user">
    <span>
      <?php
        if (isset($_SESSION['username']))
          echo $_SESSION['username'];
        else
          echo "Not logged";
      ?>
    </span>
    <i class="icon fas fa-user"></i>
  </div>
</a>
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
    case 'plan': require_once "pages/plan.php";
    break;
    case 'session_layout': require_once "pages/session-layout.php";
    break;
  }
} else {
  require_once "pages/home.php";
}
?>
<?php
require_once "_templates/footer.php";
?>

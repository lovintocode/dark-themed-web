<link rel="stylesheet" type="text/css" href="css/plan/general.css">
<div id="plan-wrapper">
  <?php
  if (isset($_SESSION['username'])){
    if (isset($_SESSION['plan']))
      require_once "pages/subpages/plan/plan-layout.php";
    else
      require_once "pages/subpages/plan/questions.php";
  } else {
    require_once "pages/subpages/plan/no-user.php";
  }
  ?>
</div>

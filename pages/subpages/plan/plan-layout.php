<?php
require_once 'php/plan-management/plan-management.php';
$plans = loadPlans($_SESSION['username']);
$plans_length = count($plans);
?>
<div id="plan-container">
  <?php
  if (empty($plans)) {
    echo '
    <div class="text-container">
    <span class="text">There are no plans created</span>
    <a id="create-plan" class="btn btn-primary">Create Plan</a>
    </div>
    ';
} else {
    ?>
    <div class="left-container">
      <?php
      loadPlanButtons($plans_length);
  }
  ?>
</div>
<div class="right-container">
</div>
<div class="modal micromodal-slide" id="show-recipe" aria-hidden="false">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close="">
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
            <header class="modal__header"><button class="modal__close" aria-label="Close modal" data-micromodal-close=""></button>
            </header>
            <main class="modal__content" id="modal-add-content">
            </main>
        </div>
    </div>
</div>
</div>

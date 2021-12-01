<?php
require_once 'php/plan-management/plan-management.php';
$plans = loadPlans($_SESSION['username']);
$plans_length = count($plans);
?>
<div id="plan-container"> 
  <div class="modal micromodal-slide" id="show-recipe" aria-hidden="false">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close="">
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
        <header class="modal__header"><button id="close-recipe" class="modal__close" aria-label="Close modal" data-micromodal-close=""></button></header>
        <main class="modal__content">
        </main>
      </div>
    </div>
  </div>
</div>

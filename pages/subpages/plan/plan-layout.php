<?php
require_once 'php/plan-management/plan-management.php';
$plans = loadPlans($_SESSION['username']);
?>
<div id="plan-container">
  <?php
  if (empty($plans)) {
    echo '
    <div class="text-container">
    <span class="text">There are no plans created</span>
    <a href="index.php?page=recipes" class="btn btn-primary">Go to Recipes</a>
    </div>
    ';
  } else {
    ?>
    <div class="left-container">
      <?php
      $count = 1;
      for($i = 0; $i < count($plans); $i++) {
        echo '<button id="plan'.$count.'" class="plan-btn">Plan '.$count.'</button>';
        $count++;
      }
      ?>
    </div>
    <div class="right-container">
      <?php
      $plan_count = 1;
      print_r(count($plans));
      for ($i = 0; $i < count($plans); $i++) {
        if ($i == 0){
          echo '<div id="plan'.$plan_count.'" class="plan plan-active">';
        }
        else{
          echo '<div id="plan'.$plan_count.'" class="plan">';
        }
        $plan_id = $plans[$i]['id'];
        $plan_data = json_decode($plans[$i]['data'], true);
        $plan_creation = $plans[$i]['creation'];
        $plan_last_modified = $plans[$i]['last_modified'];
        if ($plan_data != 'true') {
            // general container (creation, last_mod)
          if (array_key_exists('days', $plan_data)) {
              // days container
            echo '<div class="days-container">';
            foreach ($plan_data['days'] as $day_key => $day_value) {
              echo '<div class="day-time-container">';
              $total_calories = $day_value['total_calories'];
              echo '
              <button class="day '.$day_key.'">
              '.$day_key.'
              </button>
              ';
              if (array_key_exists('times', $day_value)) {
                echo '<div class="times-container '.$day_key.'">';

                foreach ($day_value['times'] as $time_key => $time_value) {
                        // get all data from recipe
                  echo '
                  <button class="btn btn-secondary time '.$time_key.'">
                  '.$time_key.'
                  </button>
                  ';
                          // loadModal($time_value);
                }
                echo '</div>';
              }
              echo '</div>';
            }
            echo '</div>';
          } else {
            echo '<div class="no-days-container"><span class="text">Your plan has no days</span><a href="index.php?recipes" class="btn btn-primary">Go to Recipes</a></div>';
          }
          echo '</div>';
        } else {
          echo '<div class="no-days-container"><span class="text">Your plan has no days</span><a href="index.php?recipes" class="btn btn-primary">Go to Recipes</a></div>';
          echo '</div>';  
        }
            $plan_count++;
        
      }
      echo '</div>';
    }
    ?>
  </div>
</div>

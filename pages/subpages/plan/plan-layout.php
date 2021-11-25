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
        if (!empty($plans)) {
            $count = 1;
          for ($i = 0; $i < count($plans); $i++) {
            echo '<div id="plan'.$count.'" class="plan">';
            $plan_id = $plans[$i]['id'];
            $plan_data = json_decode($plans[$i]['data'], true);
            $plan_creation = $plans[$i]['creation'];
            $plan_last_modified = $plans[$i]['last_modified'];
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
                  $id_counter = 1;
                echo '<div class="times-container '.$day_key.'-container">';

                  foreach ($day_value['times'] as $time_key => $time_value) {
                    $image = $time_value['img'];
                    $title = $time_value['title'];
                    $calories = $time_value['calories'];
                    $cuisine_type = $time_value['cuisine_type'];
                    $meal_type = $time_value['meal_type'];
                    $dish_type = $time_value['dish_type'];
                    $serves = $time_value['serves'];
                    $diet_labels = implode(',', $time_value['diet_labels']);
                    $health_labels = getHealthLabelsHtml($time_value['health_labels']);

                    $proteins = $time_value['nutritional_info']['protein']['total'];
                    $carbs['total'] = $time_value['nutritional_info']['carbs']['total'];
                    $carbs['fiber'] = $time_value['nutritional_info']['carbs']['fiber'];
                    $carbs['sugar'] = $time_value['nutritional_info']['carbs']['sugar'];
                    $carbs['sugar_added'] = $time_value['nutritional_info']['carbs']['sugar_added'];

                    $nutritional_info = $time_value['nutritional_info'];
                    $fat['total'] = $nutritional_info['fats']['total'];
                    $fat['trans'] = $nutritional_info['fats']['trans'];
                    $fat['saturated'] = $nutritional_info['fats']['saturated'];
                    $fat['monounsaturated'] = $nutritional_info['fats']['monounsaturated'];
                    $fat['polyunsaturated'] = $nutritional_info['fats']['polyunsaturated'];
                    $vitamins['a'] = $nutritional_info['vitamins']['a'];
                    $vitamins['c'] = $nutritional_info['vitamins']['a'];
                    $vitamins['b1'] = $nutritional_info['vitamins']['a'];
                    $vitamins['b2'] = $nutritional_info['vitamins']['a'];
                    $vitamins['b3'] = $nutritional_info['vitamins']['a'];
                    $vitamins['b6'] = $nutritional_info['vitamins']['a'];
                    $vitamins['b9'] = $nutritional_info['vitamins']['a'];
                    $vitamins['b12'] = $nutritional_info['vitamins']['a'];
                    $vitamins['d'] = $nutritional_info['vitamins']['a'];
                    $vitamins['e'] = $nutritional_info['vitamins']['a'];
                    $vitamins['k'] = $nutritional_info['vitamins']['a'];
                    $minerals['sodium'] = $nutritional_info['minerals']['sodium'];
                    $minerals['calcium'] = $nutritional_info['minerals']['calcium'];
                    $minerals['magnesium'] = $nutritional_info['minerals']['magnesium'];
                    $minerals['potassium'] = $nutritional_info['minerals']['potassium'];
                    $minerals['iron'] = $nutritional_info['minerals']['iron'];
                    $minerals['zinc'] = $nutritional_info['minerals']['zinc'];
                    $minerals['phosphorus'] = $nutritional_info['minerals']['phosphorus'];
                    echo '
                    <button class="btn btn-secondary time '.$time_key.'">
                    '.$time_key.'
                    </button>
                    ';
                    // get all data from recipe
                    echo '
                    <div class="modal micromodal-slide" id="modal-'.$id_counter.'" aria-hidden="true"><div class="modal__overlay" tabindex="-1" data-micromodal-close><div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title"><header class="modal__header"><button class="modal__close" aria-label="Close modal" data-micromodal-close></button></header><main class="modal__content" id="modal-'.$id_counter.'-content"><div class="image-title-container"><img class="image" src="'.$image.'" alt="'.$title.'"><h2 class="title">'.$title.'</h3></div><div class="general-info"><h3 class="subtitle">General Information</h2><ul class="general-item"><li class="list-item"><h4 class="list-title">Calories</h4><span>'.$calories.'</span></li><li class="list-item"><h4 class="list-title">Cusine Type</h4><span>'.$cuisine_type.'</span></li><li class="list-item"><h4 class="list-title">Meal Type</h4><span>'.$meal_type.'</span></li><li class="list-item"><h4 class="list-title">Dish Type</h4><span>'.$dish_type.'</span></li><li class="list-item"><h4 class="list-title">Serves</h4><span>'.$serves.'</span></li><li class="list-item"><h4 class="list-title">Diet Labels</h4><span>'.$diet_labels.'</span></li></ul></div>'.$health_labels.'<div class="nutritional-info"><h3 class="subtitle">Nutritional Information</h3><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Protein</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'.$proteins.'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Carbs</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'.$carbs['total'].'</span></li><li class="list-item"><span class="left">Fiber</span><span class="right">'.$carbs['fiber'].'</span></li><li class="list-item"><span class="left">Sugars</span><span class="right">'.$carbs['sugar'].'</span></li><li class="list-item"><span class="left">Sugars Added</span><span class="right">'.$carbs['sugar_added'].'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Fats</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Total</span><span class="right">'.$fat['total'].'</span></li><li class="list-item"><span class="left">Trans</span><span class="right">'.$fat['trans'].'</span></li><li class="list-item"><span class="left">Saturated</span><span class="right">'.$fat['saturated'].'</span></li><li class="list-item"><span class="left">Monounsaturated</span><span class="right">'.$fat['monounsaturated'].'</span></li><li class="list-item"><span class="left">Polyunsaturated</span><span class="right">'.$fat['polyunsaturated'].'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Vitamins</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">A</span><span class="right">'.$vitamins['a'].'</span></li><li class="list-item"><span class="left">C</span><span class="right">'.$vitamins['c'].'</span></li><li class="list-item"><span class="left">B1</span><span class="right">'.$vitamins['b1'].'</span></li><li class="list-item"><span class="left">B2</span><span class="right">'.$vitamins['b2'].'</span></li><li class="list-item"><span class="left">B3</span><span class="right">'.$vitamins['b3'].'</span></li><li class="list-item"><span class="left">B6</span><span class="right">'.$vitamins['b6'].'</span></li><li class="list-item"><span class="left">B9</span><span class="right">'.$vitamins['b9'].'</span></li><li class="list-item"><span class="left">B12</span><span class="right">'.$vitamins['b12'].'</span></li><li class="list-item"><span class="left">D</span><span class="right">'.$vitamins['d'].'</span></li><li class="list-item"><span class="left">E</span><span class="right">'.$vitamins['e'].'</span></li><li class="list-item"><span class="left">K</span><span class="right">'.$vitamins['k'].'</span></li></div></ul><ul class="nutritional-item"><div class="title-container"><h4 class="list-title">Minerals</h4><i class="fas fa-chevron-down icon"></i></div><div class="list-container"><li class="list-item"><span class="left">Sodium</span><span class="right">'.$minerals['sodium'].'</span></li><li class="list-item"><span class="left">Calcium</span><span class="right">'.$minerals['calcium'].'</span></li><li class="list-item"><span class="left">Magnesium</span><span class="right">'.$minerals['magnesium'].'</span></li><li class="list-item"><span class="left">Potassium</span><span class="right">'.$minerals['potassium'].'</span></li><li class="list-item"><span class="left">Iron</span><span class="right">'.$minerals['iron'].'</span></li><li class="list-item"><span class="left">Zinc</span><span class="right">'.$minerals['zinc'].'</span></li><li class="list-item"><span class="left">Phosphorus</span><span class="right">'.$minerals['phosphorus'].'</span></li></div></ul></div></main></div></div></div>
                    ';
                    $id_counter++;
                }
                echo '</div>';
            }
            echo '</div>';
        } 
            echo '</div>';

    } else {
          echo 'There are no days created';
        }
        echo '</div>';
    }
}
}
?>
</div>
</div>

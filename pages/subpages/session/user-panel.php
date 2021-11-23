<?php
$bbdd = new bbdd();
$user_data = $bbdd->getAllUserData($_SESSION['username']);
?>
<div id="user-wrapper">
  <div class="user-functions">
    <form action="" method="post">
      <input class="log-out" type="submit" name="logout" value="Log Out">
    </form>
    <a class="btn" href="index.php?page=plan" title="">Go to Plan</a>
  </div>
  <div class="box-containers">
    <div class="personal-info">
      <div class="left-col">
        <h3 class="subtitle">Personal Information</h3>
      </div>
      <div class="right-col">
        <ul class="list">
          <li class="list-item">
            <span class="attribute">Username</span>
            <span class="value"><?php echo $user_data['username'];?></span>
          </li>
          <li class="list-item">
            <span class="attribute">Email</span>
            <span class="value"><?php echo $user_data['email'];?></span>
          </li>
        </ul>
      </div>
    </div>
    <?php
    if (isset($_SESSION['plan'])) {
    ?>
    <div class="plan-info">
      <div class="left-col">
        <h3 class="subtitle">Plan Information</h3>
      </div>
      <div class="right-col">
        <ul class="list">
          <li class="list-item">
            <span class="attribute">BMR</span>
            <span class="value"><?php echo $user_data['bmr'];?></span>
          </li>
          <li class="list-item">
            <span class="attribute">Weight</span>
            <span class="value"><?php echo $user_data['weight'];?></span>
          </li>
          <li class="list-item">
            <span class="attribute">Height</span>
            <span class="value"><?php echo $user_data['height'];?></span>
          </li>
          <li class="list-item">
            <span class="attribute">Age</span>
            <span class="value"><?php echo $user_data['age'];?></span>
          </li>
          <li class="list-item">
            <span class="attribute">Activity</span>
            <span class="value"><?php echo $user_data['activity'];?></span>
          </li>
          <li class="list-item">
            <span class="attribute">Body Type</span>
            <span class="value"><?php echo $user_data['body_type'];?></span>
          </li>
          <li class="list-item">
            <span class="attribute">Objective</span>
            <span class="value"><?php echo $user_data['objective'];?></span>
          </li>
        </ul>
      </div>
    </div>
    <?php
    }
    ?>
  </div>
</div>

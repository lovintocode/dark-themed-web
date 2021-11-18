<div id="plan-wrapper">
  <?php
  if (isset($_SESSION['username'])){
    ?>
    <?php
    if (isset($_SESSION['plan'])) {
      ?>
      <div id="plan-container">
        <p>This is my evil plan</p>
      </div>
      <?php
    } else {
      ?>
      <div id="questions-container">
        <div class="question" id="question-activity">
          <p>soy una pregunta</p>
          <div class="select-wrapper">
            <div class="select">
              <div class="selection-box"><span id="answer-activity">Sedentary</span>
                <div class="arrow"></div>
              </div>
              <div class="custom-options">
                <span class="option-box selected">Sedentary</span>
                <span class="option-box">Slightly Active</span>
                <span class="option-box">Moderately Active</span>
                <span class="option-box">Active</span>
                <span class="option-box">Very Active</span>
              </div>
            </div>
          </div>
          <button type="button" class="trigger">Next</button>
        </div>
        <div class="question" id="question-body">
          <p>soy otra pregunta</p>
          <div class="select-wrapper">
            <div class="select">
              <div class="selection-box"><span id="answer-body">Ectomorph</span>
                <div class="arrow"></div>
              </div>
              <div class="custom-options">
                <span class="option-box selected">Ectomorph</span>
                <span class="option-box">Mesomorph</span>
                <span class="option-box">Endomorph</span>
              </div>
            </div>
          </div>
          <button type="button" class="trigger">Next</button>
        </div>
        <div class="question" id="question-objective">
          <p>soy la tercera pregunta</p>
          <div class="select-wrapper">
            <div class="select">
              <div class="selection-box"><span id="answer-objective">Maintain</span>
                <div class="arrow"></div>
              </div>
              <div class="custom-options">
                <span class="option-box selected">Maintain</span>
                <span class="option-box">Deficit</span>
                <span class="option-box">Surplus</span>
              </div>
            </div>
          </div>
          <button type="button" class="trigger">Next</button>
        </div>
        <div class="question" id="question-personal">
          <input type="text" placeholder="Weight" id="question-weight">
          <input type="text" placeholder="Height" id="question-height">
          <input type="text" placeholder="Age" id="question-age">
          <button type="button" class="trigger">Finish !</button>
        </div>
        <div class="test-end">
          <h2>You have finished your test</h2>
          <a href="" title="">Start my plan</a>
        </div>
      </div>
      <?php
    }
  } else {
    ?>
    <div id="no-user">
      <h2 class="subtitle">Please, you need to register before starting your plan</h2>
      <a class="btn" href="index.php?page=session_layout" title="Go to register">Register</a>
    </div>
    <?php
  }
  ?>
</div>

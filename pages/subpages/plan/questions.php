<div id="questions-container">
  <div class="question question-show" id="question-sex">
    <h2 class="subtitle">Are you male or female ?</h2>
    <div class="select-wrapper">
      <div class="select">
        <div class="selection-box"><span id="answer-sex">Male</span>
          <div class="arrow"></div>
        </div>
        <div class="custom-options">
          <span class="option-box selected">Male</span>
          <span class="option-box">Female</span>
        </div>
      </div>
    </div>
    <button type="button" class="trigger btn btn-secondary">Next</button>
  </div>
  <div class="question" id="question-activity">
    <h2 class="subtitle">You would describe your lifestyle as ...</h2>
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
    <button type="button" class="trigger btn btn-secondary">Next</button>
  </div>
  <div class="question" id="question-body">
    <h2 class="subtitle">Your body structure is like ...</h2>
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
    <button type="button" class="trigger btn btn-secondary" disabled>Next</button>
  </div>
  <div class="question" id="question-objective">
    <h2 class="subtitle">You would like to ...</h2>
    <div class="select-wrapper">
      <div class="select">
        <div class="selection-box"><span id="answer-objective">Maintain Weight</span>
          <div class="arrow"></div>
        </div>
        <div class="custom-options">
          <span class="option-box selected">Maintain Weight</span>
          <span class="option-box">Lose Weight</span>
          <span class="option-box">Gain Weight</span>
        </div>
      </div>
    </div>
    <button type="button" class="trigger btn btn-secondary" disabled>Next</button>
  </div>
  <div class="question" id="question-personal">
    <h2 class="subtitle">Add your personal measures</h2>
    <div class="measure-container">
      <label class="label" for="question-weight">Weight (Kg)</label>
      <input class="input" type="text" id="question-weight" value="75">
    </div>
    <div class="measure-container">
      <label class="label" for="question-height">Height (Cm)</label>
      <input class="input" type="text" id="question-height" value="172">
    </div>
    <div class="measure-container">
      <label class="label" for="question-age">Age (Years)</label>
      <input class="input" type="text" id="question-age" value="23">
    </div>
    <button type="button" class="trigger btn btn-secondary" disabled>Finish !</button>
  </div>
  <div class="test-end">
    <h2 class="subtitle">You have finished your plan registration</h2>
    <a class="btn btn-primary" id="register-plan">Start my plan</a>
  </div>
</div>

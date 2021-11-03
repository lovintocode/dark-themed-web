<div id="recipes-wrapper">
  <div id="recipes-filter">
    <div class="title-container">
      <h2 class="title">Filters</h2>
    </div>
    <div class="search-container">
      <i class="fas fa-search icon"></i>
      <input class="search" type="text" id="recipe-search" placeholder="Search for food">
    </div>
    <ul class="list">
      <li class="list-item">
        <h3 class="list-title">Cuisine Type</h3>
        <div class="select-wrapper">
          <div class="select">
            <div class="selection-box"><span id="cuisine_type">None</span>
              <div class="arrow"></div>
            </div>
            <div class="custom-options">
              <span class="option-box selected">None</span>
              <span class="option-box" data-value="American">American</span>
              <span class="option-box" data-value="Mexican">Mexican</span>
              <span class="option-box" data-value="Asian">Asian</span>
              <span class="option-box" data-value="Caribean">Caribean</span>
              <span class="option-box" data-value="British">British</span>
            </div>
          </div>
        </div>
      </li>
      <li class="list-item">
        <h3 class="list-title">Meal Types</h3>
        <div class="select-wrapper">
          <div class="select">
            <div class="selection-box"><span id="meal_type">None</span>
              <div class="arrow"></div>
            </div>
            <div class="custom-options">
              <span class="option-box selected">None</span>
              <span class="option-box" data-value="Breakfast">Breakfast</span>
              <span class="option-box" data-value="Lunch">Lunch</span>
              <span class="option-box" data-value="Dinner">Dinner</span>
              <span class="option-box" data-value="Snack">Snack</span>
            </div>
          </div>
        </div>
      </li>
      <li class="list-item">
        <h3 class="list-title">Diet Label</h3>
        <div class="select-wrapper">
          <div class="select">
            <div class="selection-box"><span id="diet_label">None</span>
              <div class="arrow"></div>
            </div>
            <div class="custom-options">
              <span class="option-box selected">None</span>
              <span class="option-box" data-value="balanced">Balanced</span>
              <span class="option-box" data-value="high-protein">High Protein</span>
              <span class="option-box" data-value="low-carb">Low Carb</span>
              <span class="option-box" data-value="low-fat">Low Fat</span>
              <span class="option-box" data-value="low-sodium">Low Sodium</span>
            </div>
          </div>
        </div>
      </li>
      <li class="list-item">
        <h3 class="list-title">Health Label</h3>
        <div class="select-wrapper">
          <div class="select">
            <div class="selection-box"><span id="health_label">None</span>
              <div class="arrow"></div>
            </div>
            <div class="custom-options">
              <span class="option-box selected">None</span>
              <span class="option-box" data-value="gluten-free">Gluten Free</span>
              <span class="option-box" data-value="low-sugar">Low Sugar</span>
              <span class="option-box" data-value="pecatarian">Pescatarian</span>
              <span class="option-box" data-value="vegetarian">Vegetarian</span>
              <span class="option-box" data-value="vegan">Vegan</span>
              <span class="option-box" data-value="soy-free">Soy Free</span>
              <span class="option-box" data-value="low-potassium">Low Potassium</span>
              <span class="option-box" data-value="alcohol-free">Alcohol Free</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <!-- Recipe results -->
  <div id="recipes-box">
    <div class="no-recipes-search">
      <p class="text">Introduce any food search and start discovering</p>
    </div>
  </div>
  <div id="next-page">
    <div class="next-page-container">
      <span class="prev-page" id="prev_page_url"><i class="fas fa-chevron-left"></i></span><span class="next-page" id="next_page_url"><i class="fas fa-chevron-right"></i></span>
    </div>
  </div>
</div>

<?php

function getRecipes($params) {
  $curl = curl_init();
  curl_setopt_array($curl, [
    CURLOPT_URL => "https://edamam-recipe-search.p.rapidapi.com/search?q=".$params,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
      "x-rapidapi-host: edamam-recipe-search.p.rapidapi.com",
      "x-rapidapi-key: 9535be05fdmsh7b77b2702b974aep1266b6jsnc0cf0a5bd5a8"
    ],
  ]);

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  if ($err) {
    echo "cURL Error #:" . $err;
  } else {
    return $response;
  }
}
function getRecipesData() {
  if(isset($_POST['ingredient']) && isset($_POST['cuisine_type']) && isset($_POST['meal_type']) && isset($_POST['dish_type']) && isset($_POST['health_label'])){
    $params = getParams();
    echo getRecipes($params);
  }
}
function getParams() {
  $params = '';
  $ingredient = trim($_POST['ingredient']);
  $cuisine_type = trim($_POST['cuisine_type']);
  $meal_type = trim($_POST['meal_type']);
  $dish_type = trim($_POST['dish_type']);
  $health_label = trim($_POST['health_label']);

  $params .= $ingredient;
  if ($cuisine_type != 'None')
    $params .= "&cuisineType=".$cuisine_type;
  if ($meal_type != 'None')
    $params .= '&mealType='.$meal_type;
  if ($dish_type != 'None')
    $params .= '&dishType='.$dish_type;
  if ($health_label != 'None') 
    $params .= '&Health='.$health_label;
  return $params;
}
?>
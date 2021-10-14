<?php

//echo getNutritionAPIData();
echo getFood();

function getRecipes() {
  $curl = curl_init();

  curl_setopt_array($curl, [
    CURLOPT_URL => "https://edamam-recipe-search.p.rapidapi.com/search?q=fruit",
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
function getFood() {
  $curl = curl_init();

  curl_setopt_array($curl, [
    CURLOPT_URL => "https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=apple&category=generic-foods",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => [
      "x-rapidapi-host: edamam-food-and-grocery-database.p.rapidapi.com",
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
?>

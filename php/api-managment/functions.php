<?php

function getRecipesData() {
  // On input or filtering
  if (isset($_POST['recipe_variables'])){
    $params = getParams();
    $concatenate_url = 'https://api.edamam.com/api/recipes/v2?type=public&q='.$params.'&app_id='.API_ID.'&app_key='.API_KEY;
    $data = getData($concatenate_url);
    $concatenate_url = json_encode($concatenate_url);
    encodeApiKey($data);
  }
  // On next page load
  if (isset($_POST['next_page_url'])) {
    $next_page_url = $_POST['next_page_url'];
  }
  // On prev page load
  if (isset($_POST['prev_page_url'])) {
    $prev_page_url = $_POST['prev_page_url'];
  }
}
// Extracts params from recipe object obtained
function getParams() {
  $params = '';
  $recipe_variables = $_POST['recipe_variables'];

  $params .= $recipe_variables['ingredient'];
  if ($recipe_variables['cuisine_type'] != '')
    $params .= "&cuisineType=".$recipe_variables['cuisine_type'];
  if ($recipe_variables['meal_type'] != '')
    $params .= '&mealType='.$recipe_variables['meal_type'];
  if ($recipe_variables['diet_label'] != '')
    $params .= '&diet='.$recipe_variables['diet_label'];
  if ($recipe_variables['health_label'] != '')
    $params .= '&health='.$recipe_variables['health_label'];
  return $params;
}
// Sends request to api and receives response with parameters specified in the url
function getData($url){
 $curl = curl_init();
 curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
 curl_setopt($curl, CURLOPT_URL, $url);
 $result = curl_exec($curl);
  if(!$result){die("Connection Failure");}
 curl_close($curl);
 return $result;
}
// 
function encodeApiKey($data) {
  $encoded_data = str_replace(API_KEY, '', $data);
  $encoded_data = str_replace(API_ID, '', $encoded_data);
  $added_
  echo $encoded_data;
}
// function decodeApiKey(url) {
  
// }
?>

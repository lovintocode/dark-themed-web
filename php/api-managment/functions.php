<?php

function getRecipesData() {
  // On next page load
  if (isset($_POST['next_page_url'])) {
    $next_page_url = $_POST['next_page_url'];
    $params = getParams();
    $uncoded_url = decodeApiCredentials($next_page_url);
    $api_response = getData($uncoded_url);
    manageApiResponse($api_response);
  }
  else if (isset($_POST['prev_page_url'])) {
    $prev_page_url = $_POST['prev_page_url'];
    $params = getParams();
    $uncoded_url = decodeApiCredentials($prev_page_url);
    $api_response = getData($uncoded_url);
    manageApiResponse($api_response);
  }
  else {
    $params = getParams();
    $first_load_url = 'https://api.edamam.com/api/recipes/v2?type=public&q='.$params.'&app_id='.API_ID.'&app_key='.API_KEY;
    $api_response = getData($first_load_url);
    manageApiResponse($api_response, $first_load_url);
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

function manageApiResponse($api_response, $first_load_url = '') {
  $encoded_api_data = encodeApiCredentials($api_response);
  $encoded_first_page = encodeApiCredentials($first_load_url);
  $json_api_data = array($encoded_api_data, $encoded_first_page);
  echo implode('arr-separation', $json_api_data);
}
function encodeApiCredentials($string) {
  return preg_replace('/('.API_KEY.'|'.API_ID.')/', '', $string);
}
https://api.edamam.com/api/recipes/v2?type=public&q=fish&app_id=&app_key=
function decodeApiCredentials($string) {
  $decoded_url = preg_replace('/app_key=/', 'app_key='.API_KEY, $string);
  return preg_replace('/app_id=/', '/app_id=/'.API_ID, $decoded_url);
}
?>

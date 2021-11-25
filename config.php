<?php
// Server config
ini_set('session.gc_maxlifetime', 86400);
session_set_cookie_params(86400);
session_start();
// Bbdd config
/*define('HOST', 'db5005386872.hosting-data.io');*/
define('HOST', 'localhost');
// define('USER', 'dbu654331');
define('USER', 'root');
// define('PASSWORD', 'healthstep01');
define('PASSWORD', '');
// define('DATABASE', 'dbs4519684');
define('DATABASE', 'healthstep');

// Recipes API config
define('API_URL', 'https://api.edamam.com/api/recipes/v2?type=public&q=');
define('API_KEY', '1f68ecaef9a1bfd1361d1a16279dc8e5');
define('API_ID', '2b83e99d');
?>

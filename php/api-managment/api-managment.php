<?php
header("Set-Cookie: cross-site-cookie=_ga; SameSite=None; Secure");
header("Set-Cookie: cross-site-cookie=G_ENABLED_IDPS; SameSite=None; Secure");
header("Set-Cookie: cross-site-cookie=historyCookie; SameSite=None; Secure");
header("Set-Cookie: cross-site-cookie=_uetvid; SameSite=None; Secure");
require_once "../config.php";
require_once "functions.php";

getRecipesData();

?>

<?php
  require_once ROOT.'/php/bbdd/session.php';
?>

<form action="" method="post">
  <input type="text" name="username" placeholder="Username">
  <input type="email" name="email" placeholder="Email">
  <input type="text" name="password" placeholder="Password">
  <input type="text" name="password_verify" placeholder="Re-Password">
  <input type="submit" name="register_user">
  <img width="200" height="200" src="/img/photos/card1.jpg" alt="">
</form>

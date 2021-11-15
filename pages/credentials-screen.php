<style>
  #credentials-wrapper {
    width: 100%;
    height: auto;
    transition: 1s;
  }
  #credentials-wrapper .box-containers {
    width: 85%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4em 0;
  }
  #credentials-wrapper .presentation-box {
    display: none;
  }
  #credentials-wrapper .credentials-box {
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  #credentials-wrapper .credentials-box .register-form, #credentials-wrapper .credentials-box .login-form {
    width: 100%;
    height: auto;
  }
  #credentials-wrapper .credentials-box .register-form {
    display: none;
  }
  @media only screen and (min-width: 992px) {
    #credentials-wrapper .presentation-box {
      display: block;
      width: 400px;
      height: 600px;
      background: url("img/photos/card1.jpg") no-repeat center center fixed;
      background-size: cover;
    }
  }
</style>
<div id="credentials-wrapper">
  <div class="box-containers">
    <div class="presentation-box">
      <h3>Welcome</h3>
      <ul class="list">
        <li class="list-item">Create your diet plan</li>
        <li class="list-item">Add your favourite recipes</li>
      </ul>
    </div>
    <div class="credentials-box">
      <div class="choose-box">
        <a href="#login-form" title="">
          Login
        </a>
        <a href="#register-form" title="">
          Register
        </a>
      </div>
      <form id="login-form" class="login-form" action="" method="post">
        <input type="text" name="username" placeholder="Username">
        <input type="text" name="password" placeholder="Password">
        <input type="submit" name="login_user">
      </form>
      <form id="register-form" class="register-form" action="" method="post">
        <input type="text" name="username" placeholder="Username">
        <input type="email" name="email" placeholder="Email">
        <input type="text" name="password" placeholder="Password">
        <input type="text" name="password_verify" placeholder="Re-Password">
        <input type="submit" name="register_user">
      </form>
    </div>
  </div>
</div>

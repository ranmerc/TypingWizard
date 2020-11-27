<?php

require("./Database/config.php");

$connectionString = Config::getConnectionString();
$connection = pg_connect($connectionString);

$USEREXISTS = 0;

function runQuery($query)
{
    GLOBAL $connection;
    $res = pg_query($connection, $query);
    return $res;
}

function userExists($userName)
{
  $query = "SELECT * from users where username='{$userName}'";
    $res = runQuery($query);
    $noOfRows = pg_num_rows($res);
    if($noOfRows == 0)
        return false;
    return true;
}

if(isset($_POST["signup"]))
{
    
    $username = htmlentities($_POST['username']);
    $password = $_POST['password'];
    $forgotQNo = $_POST['forgotPassQuestion'];
    $answer = strtolower(htmlentities($_POST['answer']));
    if(userExists($username))
    { 
        $USEREXISTS=1;
    }
    else
    {
        $query="INSERT INTO users VALUES('{$username}','{$password}',$forgotQNo,'$answer')";
        $res=runQuery($query);
        if(!$res)
            $USEREXISTS=3;
        else
            $USEREXISTS=2;
            setcookie("username",$userName,time()+3600*24,'/');
        header("Location:./frontPage.php");
    }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./Styles/login.css">
    <link rel="icon" href="Images/icon.png" type="image/gif" sizes="16x16">
    <title>Sign Up</title>
</head>

<body>
    <div class="login_container">
        <div class="login_greeting">
            <div class="welcome_title">Welcome To Typing Wizards</div>
            <div class="welcome_message">Sign Up to start using</div>
        </div>
        <div class="login_form">
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" class="form">
                
                <span class="sign_title">Sign Up</span>
              
                <span class="label">Username</span>
                
                <input type="text" name="username" class="input username">
                
                <?php  if($USEREXISTS==1): ?>
                    <span class="wrong">User already exists !</span>
                <?php   else : ?>
                    <span class="wrong">Invalid Username!</span>
                <?php endif ?>
                
                
                <span class="label">Password</span>
                <input type="password" name="password" class="input password">
                <span class="wrong">Invalid Password!</span>
                
                <span class="label">Security Question</span>
                <select name="forgotPassQuestion" class="select_menu">
                    <option value="1">What was your childhood nickname?</option>
                    <option value="2">What is your favorite game?</option>
                    <option value="3">Who is your childhood sports hero?</option>
                </select>

                <input type="text" name="answer" class="input forgotPassAnswer">
               
                <input type="submit" value="Sign Up" name="signup" class="signup_button">
                
            </form>
        </div>
    </div>
</body>
<script src="./Js/signup.js"></script>

</html>
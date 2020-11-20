<?php

    require("./Database/config.php");

    $connectionString = Config::getConnectionString();
    $connection = pg_connect($connectionString);



    $WRONG_PASSWORD = 0; 
    /*  0->Not set yet 
        1->not set  
        2->everyting perfect */
    
    $INVALID_USER = 0;  

    ob_start();
    if(isset($_COOKIE['username']))
        header("Location:./frontPage.php");

    function runQuery($query)
    {
        GLOBAL $connection;
        $res = pg_query($connection,$query);
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

    function checkPassword($userName, $password)
    {
        $query = "SELECT * from users where username='{$userName}'";

        $res = runQuery($query);

                
        $res = pg_fetch_assoc($res);

        if($res["password"] == $password)
            return true;
        else
            return false;
    }

    if(isset($_POST['login']))
    {
        $userName = htmlentities($_POST["username"]);
        $password = $_POST["password"];
        
        if(userExists($userName))
        {
            if(checkPassword($userName, $password))
            {
                setcookie("username", $userName, time() + 3600, '/');
                $WRONG_PASSWORD = 2;
                $INVALID_USER = 2;
                header("Location:./frontPage.php");
            }    
            else
            {
                $WRONG_PASSWORD = 1;             
            }          
        }
        else
        {
            $INVALID_USER = 1;
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
    <title>Login</title>
</head>

<body>
    <div class="login_container">
        <div class="login_greeting">
            <div class="welcome_title">Welcome To Typing Wizards</div>
            <div class="welcome_message">Login in to Continue</div>
        </div>
        <div class="login_form">
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" class="form">
                <span class="sign_title">Sign In</span>
                <span class="label">Username</span>
                <input type="text" name="username" value="<?php if(isset($_GET['username'])) 
                                                                       echo $_GET['username'];
                                                                else                
                                                                        echo ""; ?>" 
                                                          class="input username">

                <span class="wrong">Invalid Username!</span>
                
                <span class="label">Password</span>
                <input type="password" name="password" class="input password">

                <span class="wrong">Invalid Password!</span>
                

             
                <span class="forgot_password">
                <a href="forgotPassword.php">Forgot Password</a>
                </span>

                <input type="submit" value="Login" name="login" class="login_button" >
                
                <?php if($INVALID_USER==1 || $WRONG_PASSWORD==1 ): ?>
                    <span class="incorrect visible">Incorrect Username or Password! Try Again!</span>
                <?php else: ?>
                    <span class="incorrect">Incorrect Username or Password! Try Again!</span>
                <?php endif ?>
               
                <span class="signup_link"><a href="signUp.php">New User? Click Here</a></span>
            
            </form>
        </div>
    </div>
</body>

<!-- it was valid.js earlier here -->
<script src="./Js/login.js"></script>

</html>
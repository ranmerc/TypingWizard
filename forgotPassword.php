<?php

    require("./Database/config.php");

    $connectionString = Config::getConnectionString();
    $connection = pg_connect($connectionString);


    $USEREXIST = 0; 
    /*  0 means not selected;
        1   means user doesnot exist
        2   means user exist 
        3   means user exist wrong anser
        4   means show password and let user login */
    
    $userPassword = '';
    $forgotQuestion = '';
    $answer = '';
    $userName = '';

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


    if(isset($_POST['checkUser']))
    {
        $userGName = trim(htmlentities($_POST["username"])); 
        // username given by user
        if(userExists($userGName))
        {
          $USEREXIST = 2;

          GLOBAL $userName;
          $userName = $userGName;

          $query = "SELECT * from users where username='{$userName}'";
          $res = runQuery($query);
          $res = pg_fetch_assoc($res);

          $no = $res['forgotquestionno'];
          $query = "SELECT * FROM forgotpassquestions WHERE qno=$no";
          $res = runQuery($query);
          $res = pg_fetch_assoc($res);

          GLOBAL $forgotQuestion;
          $forgotQuestion = $res['question'];
         
        }
        else
        {
            $USEREXIST = 1;
        }
    }

    if(isset($_POST['continue'])) // will be set only if user exists
    {
        GLOBAL $userName;
        $userName = trim(htmlentities($_POST['username']));
       
        $query = "SELECT * from users where username='{$userName}'";
        $res = runQuery($query);
        $res = pg_fetch_assoc($res);

        GLOBAL $userPassword;
        $userPassword = $res['password'];

        $userAnswer = strtolower(htmlentities($_POST['answer']));
        
        if($userAnswer === $res['answer'])
        {
            $USEREXIST = 4;
            
        }
        else
        {
            $USEREXIST = 3;
    
        } 
    }

?>



<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./Styles/login.css">
    <title>Forgot Password</title>
</head>

<body>
    <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="POST" class="forgotPass_container">
        <div class="sign_title">
            Forgot Password
        </div>
    <?php 
    
        switch($USEREXIST)
        {
            case 0: // User just arrived to this page
    ?>
      <span class="label">Username</span>
      <input type="text" name="username" class="input username">
      <input type="submit" name="checkUser" value="Continue" class="login_button"> 

    <?php
            break;
            case 1: // User does not exist 
            
    ?>
        <span class="label">Username</span>
        <input type="text" value="<?php echo $userName; ?>" name="username"  class="input username">
        <span class="visible wrong">User does not exists</span>
        <input type="submit" name="checkUser" value="Continue" class="login_button"> 

    
    <?php break;

        case 2: // User Exists ,so show forgot question
    ?>
        <span class="label">Username</span>
        <input type="text" value="<?php echo $userName; ?>" name="username"  class="input username">
        <span class="label"><?php echo $forgotQuestion; ?></span>
        <input type="text" name="answer" class="input forgotPassAnswer">
        <input type="submit"  name="continue" value="Continue" class="login_button">

        
    <?php break;
     case 3: // User exists wrong answer
            
    ?>
        <span class="label">Username</span>
        <input type="text" value="<?php echo $userName; ?>" name="username"  class="input username">
        <span class="label"><?php echo $forgotQuestion; ?></span>
        <input type="text" name="answer" class="input forgotPassAnswer">
        <span class="wrong visible">Wrong Answer</span>
        <input type="submit"  name="continue" value="Continue" class="login_button">
        
     <?php break;
        case 4: // User entered correct answer so show password
     ?>
        <span class="label">Username</span>
        <input type="text" value="<?php echo $userName; ?>" name="username"  class="input username">
        <span class="label"><?php echo $forgotQuestion; ?></span>
        <span>Your Password Is <?php echo " : ".$userPassword; ?></span>
        <span class="signup_link"><a href="login.php?username=<?php echo $userName; ?>">Login with this password</a></span>
    
     <?php break;
        default:
            echo "error";
    }
     ?>
        </form>
</body>
<script src="./Js/forgotPass.js"></script>

</html>
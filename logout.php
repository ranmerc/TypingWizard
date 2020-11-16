<?php
    
    setcookie("username", "", time()-36000,"/");
    header("Location:login.php");
?>


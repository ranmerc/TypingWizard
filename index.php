<?php    
    
    if(isset($_COOKIE["username"]))
        header("Location:frontPage.php"); 
    else
        header("Location:login.php")

?>

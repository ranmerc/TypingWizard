<?php
    if(!isset($_COOKIE['username']))
    {
        header("Location:login.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Practice</title>
</head>
<body>
    <?php 
        include("./header.html");
        include("./footer.html");
    ?>
</body>
</html>
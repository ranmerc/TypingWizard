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
    <link rel="stylesheet" href="./Styles/games.css">
    <title>Games</title>
</head>
<body>
    <?php 
        include("./header.html");
        include("./footer.html");
    ?>
    <div id="container">
        <div id="bubble">
            <div class="cardTitle">
                Bubble Burst
            </div>
        </div>
        <div id="tetris">
            <div class="cardTitle">
                Word Tetris
            </div>
        </div>
    </div>
</body>
<script src="./Js/games.js"></script>
</html>
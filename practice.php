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
    <link rel="stylesheet" href="./Styles/practice.css">
    <title>Practice</title>
</head>
<body>
    <?php 
        include("./header.html");
        include("./footer.html");
    ?>
    <div id="container">
        <div id="test">
            <div class="cardTitle">
                Typing Test
            </div>
            <div class="cardAbout">
                Take a test on random words based on what you've learned till now. This will help you track your progress.
            </div>
        </div>
        <div id="challenge">
            <div class="cardTitle">
                Typing Challenge
            </div>
            <div class="cardAbout">
                Take up a challenge. Practice on paragraphs which will help you simulate real life situations where you can use touch typing.
            </div>
        </div>
    </div>
</body>
<script src="./Js/practice.js"></script>
</html>
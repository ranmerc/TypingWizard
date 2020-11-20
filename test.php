<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./Styles/test.css">
    <title>Typing Test</title>
</head>
<body>
    <?php
        include("./header.html");
        include("./footer.html");
    ?>
    <div id="container">
        <div class="stats">
            <div class="counter wpm">
                <div class="counterTitle">
                    Speed
                </div>
                <div class="counterValue">
                    140 WPM
                </div>
                <div class="change">
                    (+100.000)
                </div>
            </div>
            <div class="counter error">
                <div class="counterTitle">
                    Erorrs
                </div>
                <div class="counterValue">
                    10
                </div>   
                <div class="change">
                    (-100.000)
                </div>            
            </div>
        </div>
        <div id="para" class="inactive">
            
        </div>
        <div class="keyboard">
            <?php include("./keyboard.html"); ?>
        </div>
    </div>
</body>
<script src="./Js/test.js"></script>
</html>
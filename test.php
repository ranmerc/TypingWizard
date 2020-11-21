<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./Styles/test.css">
    <link rel="stylesheet" href="./Styles/keyboard.css">
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
                    NaN
                </div>
                <div class="change">
                    (NaN)
                </div>
            </div>
            <div class="counter error">
                <div class="counterTitle">
                    Erorrs
                </div>
                <div class="counterValue">
                    NaN
                </div>   
                <div class="change">
                    (NaN)
                </div>            
            </div>
        </div>
        <div id="para" class="inactive">
            
        </div>
        <?php include("./keyboard.html"); ?>
    </div>
</body>
<script src="./Js/test.js"></script>
</html>
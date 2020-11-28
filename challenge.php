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
    <title>Typing Challenge</title>
    <link rel="stylesheet" href="./Styles/challenge.css">
</head>
<body>
    <?php
        include("./header.html");
        include("./footer.html");
    ?>
    <div id="challengeContainer">
        <div id="challengeTitle">
            Typing Challenge
        </div>
        <div id="challengeName">
        </div>
        <div id="paraContainer">
            <div id="para">
            </div>
            <textarea type="text" id="challengeInput"></textarea>
        </div>
        <div id="selector">
            <div id="selectorTitle">
                Choose another story
            </div>
            <div id="list">
                <select id="dropdown">
                    <option value="The Lion and the Mouse">The Lion and the Mouse</option>
                    <option value="The Fox and the Grapes">The Fox and the Grapes</option>
                    <option value="The Charcoal-Burner and the Fuller">The Charcoal-Burner and the Fuller</option>
                    <option value="The Goose that Laid the Golden Eggs">The Goose that Laid the Golden Eggs</option>
                    <option value="The Cat and the Mice">The Cat and the Mice</option>
                    <option value="The Mischievous Dog">The Mischievous Dog</option>
                    <option value="The Mice in Council">The Mice in Council</option>
                    <option value="The Bat and the Weasels">The Bat and the Weasels</option>
                    <option value="The Dog and the Sow">The Dog and the Sow</option>
                    <option value="The Fox and the Crow">The Fox and the Crow</option>
                    <option value="The Horse and the Groom">The Horse and the Groom</option>
                    <option value="The Wolf and the Lamb">The Wolf and the Lamb</option>
                </select>
            </div>
        </div>
    </div>
    <div class="modalBlur"></div>
    <div id="modal">
        <span class="close">
            x
        </span>
        <div id="time">
            <div class="modalTitle" >
                Time Taken
            </div>
            <span id="minutes">
                59
            </span> Minutes
            <span id="seconds">
                59
            </span> Seconds 
        </div>   
        <div id="wpm">
            <div class="modalTitle">
                Words Per Minute
            </div>
            <div class="modalValue">
                999.999
            </div>
        </div>
        <div id="errors">
            <div class="modalTitle">
                Errors
            </div>    
            <div class="modalValue">
                99
            </div>
        </div>
    </div>
</body>
<script src="./Js/challenge.js"></script>
</html>
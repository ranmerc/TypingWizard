<?php
    if(!isset($_COOKIE['username']))
    {
        header("Location:login.php");
    }

?>

<html>
<head>
    <title>Typing Wizard</title>
    <link rel="stylesheet" href="./Styles/statistics.css">
</head>
<body>
    <div id="histogram">
    <canvas id="histogramCanvas"></canvas>
    <p>Test No. vs WPM</p>
    </div>
    
    <div id="linechart">
    <canvas id="lineChartCanvas"></canvas>
    <p>Test No. vs Error</p> 
    </div>
    
    <p></p>
</body>
<script src="./Js/statistics.js"></script>
</html>
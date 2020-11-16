<?php
    if(!isset($_COOKIE['username']))
    {
        header("Location:login.php");
    }
    $topSpeed = "";
    $averageSpeed = "";
    $averageError = "";
    $totalSamples = "";
    $lessonCompleted = "";
    require("./Database/config.php");
    $userName = $_COOKIE['username'];
    $connectionString = Config::getConnectionString();
    $connection = pg_connect($connectionString);
    if(!$connection)
        die("Database Connection error !");
    $query = "SELECT * FROM userstats WHERE username='{$userName}'";
    $res = pg_query($connection, $query);
    if(!$res)
        die("An error occured");
    while($row = pg_fetch_row($res)){
        $topSpeed = $row[1];
        $averageSpeed = $row[2];
        $averageError = $row[3];
        $totalSamples = $row[4];
    }
    $query = "SELECT * FROM lessonsCompleted WHERE username='{$userName}'";
    $res = pg_query($connection, $query);
    if(!$res)
        die("An error occured");
    while($row = pg_fetch_row($res)){
        $lessonCompleted = $row[1];
    }
?>

<html>
<head>
    <title>Statistics</title>
    <link rel="stylesheet" href="./Styles/statistics.css">
</head>
<body>
    <?php 
        include("./header.html");
        include("./footer.html");
    ?>
    <div id="main_container">
        <div id="left">
            <div id="greeting">
                <div id="title">
                    Your Stats
                </div>
                <div id="description">
                    This is a page with the detailed statistics about your learning progress. The more lessons you complete, the more detailed and accurate the statistics are. 
                </div>
            </div>
            <div id="charts">
                <div id="histogram">
                    <canvas id="histogramCanvas"></canvas>
                    <p>Test Number vs WPM</p>
                </div>
                    
                <div id="linechart">
                    <canvas id="lineChartCanvas"></canvas>
                    <p>Test Number vs Error</p> 
                </div>
            </div>
        </div>
        <div id="right">
            <div id="stats">
                <div class="stat">
                    <div class="statTitle">
                        Top Speed
                    </div>
                    <div class="statValue" id="topSpeed">
                        <?php if($topSpeed)
                                echo $topSpeed." WPM";
                            else 
                                echo "NaN";?>
                    </div>
                </div>
                <div class="stat">
                    <div class="statTitle">
                        Average Speed
                    </div>
                    <div class="statValue" id="averageSpeed">
                        <?php if($averageSpeed)
                                echo $averageSpeed." WPM";
                            else
                                echo "NaN";?>
                    </div>
                </div>
                <div class="stat">
                    <div class="statTitle">
                        Average Error
                    </div>
                    <div class="statValue" id="averageError">
                        <?php if($averageError)
                                echo $averageError." ";
                            else
                                echo "NaN";?>
                    </div>
                </div>
                <div class="stat">
                    <div class="statTitle">
                        Total Samples
                    </div>
                    <div class="statValue" id="totalSamples">
                        <?php if($totalSamples)
                                echo $totalSamples." ";
                            else  
                                echo "NaN" ?>
                    </div>
                </div>
                <div class="stat">
                    <div class="statTitle">
                        Lessons Completed
                    </div>
                    <div class="statValue" id="lessonsCompleted">
                        <?php if($lessonCompleted)
                                echo $lessonCompleted." ";
                            else
                                echo "NaN"; ?>
                    </div>
                </div>

            </div>
        </div>
    </div>
    
    <p></p>
</body>
<script src="./Js/statistics.js"></script>
</html>
<?php 
    require("./config.php");


    if(isset($_COOKIE['username']))
        $userName = $_COOKIE['username'];
    else
        $userName = 'learner';

    $connectionString = Config::getConnectionString();
    $connection = pg_connect($connectionString);

    if(!$connection)
        die("Database Connection error !");


    $query = "SELECT * FROM typingtestuser WHERE username='{$userName}'";

    $res = pg_query($connection, $query);

    if(!$res)
        die("An error occured");


    $countTests = pg_num_rows($res);
    $graph = array();

    $histogram = array();
    $lineChart = array();

    $histogram['count'] = $countTests;
    $lineChart['count'] = $countTests;


    $histogramData = array();
    $lineChartData = array();
    while($row = pg_fetch_assoc($res))
    {
        $histogramData[$row['testno']] = $row['wpm'];
        $lineChartData[$row['testno']] = $row['error'];

    }


    // Select MAX error and MAX WPM


    $query = "SELECT max(wpm) FROM typingtestuser WHERE username='{$userName}'";

    $res = pg_query($connection, $query);

    if(!$res)
        die("An error occured");

    $row = pg_fetch_assoc($res);
    $histogram['MAX_WPM'] = $row['max'];

    $query = "SELECT max(error) FROM typingtestuser WHERE username='{$userName}'";

    $res = pg_query($connection, $query);

    if(!$res)
        die("An error occured");

    $row = pg_fetch_assoc($res);
    $lineChart['MAX_ERROR'] = $row['max'];


    // Connecting Parts
    $histogram['histogramData'] = $histogramData;
    $lineChart['lineChartData'] = $lineChartData;

    $graph['histogram'] = $histogram;
    $graph['lineChart'] = $lineChart;

    echo json_encode($graph);
?>
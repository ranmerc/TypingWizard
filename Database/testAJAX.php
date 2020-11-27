<?php
    require("./config.php");
    $userName = $_COOKIE['username'];
    $connectionString = Config::getConnectionString();
    $connection = pg_connect($connectionString);
    if(!$connection)
        die("Database Connection error !");
    // input
    if($json = file_get_contents('php://input')){
        $obj = json_decode($json, true);
        var_dump($obj);
        $query = "INSERT INTO typingTestUser values({$obj["testNo"]}, '{$userName}', {$obj["wpm"]}, {$obj["errors"]})";
        $res = pg_query($connection, $query);
        if(!$res)
            die("An error occured");
        $query = "SELECT *from typingtestuser where username = '{$userName}'";
        $speedSum = 0;
        $errorSum = 0;
        $c = 0;
        $topSpeed = 0;
        $res = pg_query($connection, $query);
        while($row = pg_fetch_row($res)){
            if($row[2] > $topSpeed)
                $topSpeed = $row[2];
            $speedSum += $row[2];
            $errorSum += $row[3];
            ++$c;
        }
        $speedSum = round($speedSum/$c, 2);
        $errorSum = round($errorSum/$c, 2);
        $query = ("SELECT count(*) FROM userstats WHERE username='{$userName}'");
        $res = pg_query($connection, $query);
        if(!$res)
            die("An error occured");
        if(pg_fetch_row($res)[0] == 0)
            $query = "INSERT INTO userstats VALUES('{$userName}', {$topSpeed}, {$speedSum}, {$errorSum}, {$c})";
        else 
            $query = "UPDATE userstats set totalSamples={$c}, averagespeed={$speedSum}, averageerror={$errorSum}, topspeed={$topSpeed}  where username = '{$userName}'";
        $res = pg_query($connection, $query);
        if(!$res)
            die("An error occured");
        die();
    }
    // output
    $ret = array("lessonCompleted" => "1.1.1", "averageSpeed" => 0, "averageError" => 0, "totalSamples" => 0, "lastWPM" => 0, "lastError" => 0);
    $query = "SELECT lessonid FROM lessonsCompleted WHERE username='{$userName}'";
    $res = pg_query($connection, $query);
    if(!$res)
        die("An error occured");
    function compare($curr, $max){
        $carr = explode(".", $curr);
        $marr = explode(".", $max);
        if($carr[0] > $marr[0])
            return $curr;
        if($carr[0] < $marr[0])
            return $max;
        if($carr[1] < $marr[1])
            return $max;
        if($carr[1] > $marr[1])
            return $curr;
        if($carr[2] < $marr[2])
            return $max;
        if($carr[2] > $marr[2])
            return $curr;
    }
    $max = '0.0.0';
    while($row = pg_fetch_row($res)){
        $max = compare($max, $row[0]);
    }
    $ret["lessonCompleted"] = $max;
    $query = "SELECT * FROM userstats WHERE username='{$userName}'";
    $res = pg_query($connection, $query);
    if(!$res)
        die("An error occured");
    while($row = pg_fetch_row($res)){
        $ret["averageSpeed"] = $row[2];
        $ret["averageError"] = $row[3];
        $ret["totalSamples"] = $row[4];
    }
    $query = "SELECT wpm,error FROM typingtestuser WHERE testno = (SELECT max(testno) FROM typingtestuser WHERE username='{$userName}')";
    $res = pg_query($connection, $query);
    if(!$res)
        die("An error occured");
    while($row = pg_fetch_row($res)){
        $ret["lastWPM"] = $row[0];
        $ret["lastError"] = $row[1];
    }
    echo json_encode($ret);
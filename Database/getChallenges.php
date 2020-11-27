<?php
    require("./config.php");
    $connectionString = Config::getConnectionString();
    $connection = pg_connect($connectionString);
    if(!$connection)
        die("Database Connection error !");
    $query = "SELECT * FROM typingchallenges";
    $res = pg_query($connection, $query);
    if(!$res)
        die("An error occured");
    $ret = array();
    while($row = pg_fetch_row($res)){
        $ret[$row[1]] = $row[2];
    }
    echo json_encode($ret);
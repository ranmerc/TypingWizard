<?php

    require("./config.php");
    $username="";
    if(isset($_COOKIE['username']))
    	$username=$_COOKIE['username'];
    else
    {
    	header("Location:../login.php");
    }

    $connection=Config::getConnectionString();
    $connection=pg_connect($connection);
    $arr=[];
    $lessonid=[];
    $max = '0.0.0';
    $j=0;
    $query="select lessonid from lessonsCompleted where username='{$username}'";
    $res=pg_query($connection,$query);
    while($row=pg_fetch_assoc($res))
    {
        $lessonid[$j]=$row['lessonid'];
        $j++;
    }

    for($i = 0; $i < count($lessonid); ++$i){
        $max = compare($lessonid[$i],$max);
    }
    // echo $max;
    function compare($curr, $max)
    {
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
    $arr[0]=$max;

    $query="select count(lessonid) from lessonsCompleted where username='{$username}'";
    $res=pg_query($connection,$query);
    $row=pg_fetch_assoc($res);
    $arr[1]=$row['count'];//totalLessonIdsInLessonsCompleted

    $query="select count(lessonid) from lessons";
    $res=pg_query($connection,$query);
    $row=pg_fetch_assoc($res);
    $arr['totalLessonIds']=$row['count'];

    echo json_encode($arr);
?>
<?php
    require("./config.php");

    if(isset($_POST['lessonid']))
    {
        $lessonid=$_POST['lessonid'];
    }
    else
        $lessonid='1.1';

    $connection=Config::getConnectionString();
    $connection=pg_connect($connection);
        

    $query="SELECT * FROM lessons WHERE lessonid LIKE '".$lessonid.".%'";
    $res=pg_query($connection,$query);

    $arr=array();
    $i=0;
    while($row=pg_fetch_assoc($res))
    {
        $arr[$i]=$row['mockpara'];
        $i++;
    }
    $arr['count']=$i;
    echo json_encode($arr);
?>
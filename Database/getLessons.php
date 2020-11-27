<?php
    require("./config.php");

    if(isset($_POST['lessonid']))
    {
        $lessonid=$_POST['lessonid'];
    }

    

    $connection=Config::getConnectionString();
    $connection=pg_connect($connection);
        

    $query="SELECT * FROM lessons WHERE lessonid LIKE '".$lessonid.".%'";  
    $res=pg_query($connection,$query);

    $arr=array();
    $i=0;
    $lessonName="";//added by me
    while($row=pg_fetch_assoc($res))
    {
        $arr[$i]=$row['mockpara'];
        $lessonName=$row['lessonname'];//added
        $i++;
    }
    $arr['count']=$i;
    $arr['lessonName']=$lessonName;
    echo json_encode($arr);
?>
<?php
	require("./config.php");
	$username="";
    if(isset($_COOKIE['username']))
    	$username=$_COOKIE['username'];
    else
    {
    	header("Location:../login.php");
    }
    $Id="";
    if(isset($_POST['lessonId']))
    {
        $Id=$_POST['lessonId'];
        echo $Id;
    }
    else
    	echo "no lesson id";
    
    $connection=Config::getConnectionString();
    $connection=pg_connect($connection);
    $str="";
    $query="insert into lessonscompleted values('{$username}','{$Id}');";
    $res=pg_query($connection,$query);
?>
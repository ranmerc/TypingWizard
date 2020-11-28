<?php
	require("./config.php");
    $username="";
    if(isset($_COOKIE['username']))
    	$username=$_COOKIE['username'];
    else
    {
    	header("Location:../login.php");
    }

    $lessonsCompletedId=[];
    $lessonid=[];
    $j=0;
    $i=0;

    $connection=Config::getConnectionString();
    $connection=pg_connect($connection);
    $query="select lessonid from lessonsCompleted where username='{$username}'";
    $res=pg_query($connection,$query);
    while($row=pg_fetch_assoc($res))
    {
        $lessonsCompletedId[$j]=$row['lessonid'];
        $j++;
    }

    $query="select lessonid from lessons";
    $res=pg_query($connection,$query);
    while($row=pg_fetch_assoc($res))
    {
        $lessonid[$i]=$row['lessonid'];
        $i++;
    }

    function compare($curr, $max){
        $carr = explode(".", $curr);
        $marr = explode(".", $max);
        if($carr[0] > $marr[0])
            return 1;

        if($carr[0] < $marr[0])
            return -1;

        if($carr[1] < $marr[1])
            return -1;

        if($carr[1] > $marr[1])
            return 1;

        if($carr[2] < $marr[2])
            return -1;

        if($carr[2] > $marr[2])
            return 1;

        return 0;
    }
usort($lessonsCompletedId, "compare");
usort($lessonid, "compare");
$saveLessonid;

for ($i=0; $i <count($lessonsCompletedId) ; $i++) 
{ 
	if($lessonsCompletedId[$i]!=$lessonid[$i])
	{
		$saveLessonid=$lessonid[$i];
		break;
	}
}

echo json_encode($saveLessonid);
?>
<?php
    require("./config.php");

    if(isset($_POST['lessonid']))
    {
        $lessonNo=$_POST['lessonid'];
    }
    else
        $lessonNo='1';
    $connection=Config::getConnectionString();
    $connection=pg_connect($connection);

    $sublesson=1;
    $html="";

    while(true)
    {
        $query="SELECT * FROM lessons WHERE lessonid LIKE '{$lessonNo}.{$sublesson}%'";
        $res=pg_query($connection,$query);
        if(pg_num_rows($res)==0)
            break;
        $row=pg_fetch_assoc($res);
        $html.="<p class=\"lesson_name\" data-lesson_id=\"{$lessonNo}.{$sublesson}\">{$row['lessonname']}</p>";
        $sublesson++;
    }

    echo $html;
?>
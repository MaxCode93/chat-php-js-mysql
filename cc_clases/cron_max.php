<?php
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1 
--CronMax v1.0 (5/8/17 6:50PM)
--Powered By Maxwell
--Email:carlosmaxwell93@gmail.com
*/

/* CronMax de tareas de limpieza(se ejecuta cada ves que un usuario entra al chat) */
session_start();
include("config.php");
$date = date('d-m-y');
$get_files=mysql_query("SELECT * FROM $tb_files WHERE fexpira='$date'");
while($files = mysql_fetch_assoc($get_files)) {
   unlink($files['fref']);
   rmdir($files['usfdir']);	  
}
$q=mysql_query("DELETE FROM $tb_files WHERE fexpira='$date'");

/* CronMax de tareas de limpieza(se ejecuta cada ves que un usuario entra al chat) */
$get_filesh=mysql_query("SELECT * FROM $tb_files2 WHERE fexpira='$date'");
while($filesh = mysql_fetch_assoc($get_filesh)) {
   unlink($files['fref']);
   rmdir($files['usfdir']);
}
$qh=mysql_query("DELETE FROM $tb_files2 WHERE fexpira='$date'");
 ?>
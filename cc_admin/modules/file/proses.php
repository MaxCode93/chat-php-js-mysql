<!-- 
-- LiveMessenger
-- @Package LiveMessenger v17.8.1
-- Powered By Maxwell
-- Email:carlosmaxwell93@gmail.com
--->
<?php
if (empty($_SESSION['lvlogin'])){
    echo "<meta http-equiv='refresh' content='0; url=../lvadm.php'>";
}
require '../../../cc_clases/config.php';
extract($_POST);
switch ($_GET['accion']) {
case 'delete_file':
$fref = $_GET['fref'];
$get_file=mysql_query("SELECT * FROM $tb_files WHERE fref='$fref'");
while($file = mysql_fetch_assoc($get_file)) {
unlink('../../'.$file['fref']);
rmdir('../../'.$file['usfdir']);
$q=mysql_query("DELETE FROM $tb_files WHERE fref='$fref'");
$q2=mysql_query("DELETE FROM $tb_files2 WHERE fref='$fref'");
header("location: ../../main.php?module=file&alert=1");
}
header("location: ../../main.php?module=file&alert=1");
break;	
case 'delete_all':
$get_file=mysql_query("SELECT * FROM $tb_files");
while($file = mysql_fetch_assoc($get_file)) {
unlink('../../'.$file['fref']);
rmdir('../../'.$file['usfdir']);
$q=mysql_query("TRUNCATE $tb_files");
$q2=mysql_query("TRUNCATE $tb_files2");
 header("location: ../../main.php?module=file&alert=2");
}
header("location: ../../main.php?module=file&alert=3");
break;
}
 ?>
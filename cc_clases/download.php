<?php
/* 
LiveMessenger
@Package LiveMessenger v18.8.1
Email:carlosmaxwell93@gmail.com
Powered By Maxwell
*/
session_start();
include("config.php");
$au=$_GET['au'];
$u0=substr(md5("*"),0,5);
$u1=substr(md5($_SESSION['user']),0,5);
$u2=substr($au,5);
if ($u1==$u2 || $u0==$u2){$tx="SELECT * FROM $tb_files WHERE uauth LIKE '%$au%'";
$q=mysql_query($tx);
if ($rw=mysql_fetch_array($q))
{
$realname = $rw['fref'];
if(!$fdl=@fopen($realname,'r'))
{
die("Cannot Open File!");
}
else
{
header("Cache-Control: ");
header("Pragma: ");
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"".$rw['fname']."\"");
header("Content-length:".(string)(filesize($realname)));
sleep(1);
fpassthru($fdl);
}
}
else
{
echo "El fichero no existe...";
}
}
else
{
echo "Acceso denegado...";
}
?>
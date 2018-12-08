<?php 
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Email:carlosmaxwell93@gmail.com
--Powered By Maxwell
*/

extract($_REQUEST);
include('config.php');
switch($act)
{
case 'look_profile':$tx="SELECT * FROM $tb_friend2 WHERE me='$user' AND dest='$im'";
$q=mysql_query($tx);
$friends=mysql_num_rows($q);
if ($friends!=1) $friend=0;
else $friend=1;
$tx="SELECT * FROM $tb_users WHERE user='$user'";
$q=mysql_query($tx);
$r=mysql_fetch_array($q);
extract($r);
$ar=split(',',$ip);
$ip2=sprintf('%u', ip2long(trim($ar[1])));
$data="user=$user&sex=$sex&cou=$cou&stt=$stt&ttim=$ttim&ip=$ip2&age=$age&mail=$mail&fb=$fb&ac=$ac&it=$it&thumb=$thumb&friend=$friend";
echo $data;
break;
}
?>
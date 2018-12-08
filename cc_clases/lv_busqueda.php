<?php 
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Email:carlosmaxwell93@gmail.com
--Powered By Maxwell
*/

include('config.php');
session_start();
extract($_REQUEST);
switch($act)
{
case 'google':$sql="SELECT * FROM $tb_users WHERE user like '%$search%' AND pass!='NOPASS' ORDER BY user LIMIT 0,5";
$q=mysql_query($sql);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':';';
$result.=$rw['id']."|".$rw['thumb']."|".$rw['user']."|".$rw['sex'];
}
echo $result;
break;
case 'google_more':$sql="SELECT * FROM $tb_users WHERE user like '%$search%' AND pass!='NOPASS' ORDER BY user LIMIT 0,300";
$q=mysql_query($sql);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':';';
$result.=$rw['id']."|".$rw['thumb']."|".$rw['user']."|".$rw['sex'];
}
echo $result;
break;
}
?>
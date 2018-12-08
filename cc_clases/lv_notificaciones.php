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
case 'notify':$tx="SELECT * FROM $tb_notify WHERE dest='$user' ORDER by arrival DESC LIMIT 0,5";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':'||';$result.=$rw['id']."|".$rw['from']."|".$rw['thumb']."|".$rw['mess']."|".$rw['time'];
}
echo $result;
$tx="UPDATE $tb_notify SET look=1 WHERE dest='$user' and look=0 ";
mysql_query($tx);
break;
case 'notify_look_mas':$tx="SELECT * FROM $tb_notify WHERE dest='$user' ORDER BY arrival DESC LIMIT 0,300";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':'||';$result.=$rw['id']."|".$rw['from']."|".$rw['thumb']."|".$rw['mess']."|".$rw['time'];
}
echo $result;
break;
case 'delete_notify':$tx="DELETE FROM $tb_notify WHERE id=$notifi AND dest='$user'";
mysql_query($tx);
break;
}
?>
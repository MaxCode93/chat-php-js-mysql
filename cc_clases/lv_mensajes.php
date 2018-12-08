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
case 'menssenger':$tx="SELECT * FROM $tb_mess WHERE dest='$user' ORDER by arrival DESC LIMIT 0,5";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':'||';
$result.=$rw['id']."|".$rw['from']."|".$rw['thumb']."|".$rw['mess']."|".$rw['time']."|".$rw['look'];
}
echo $result;$tx="UPDATE $tb_mess SET look=1 WHERE dest='$user' and look=0 ";
mysql_query($tx);
break;
case 'menssenger_look_more':$tx="SELECT * FROM $tb_mess WHERE dest='$user' ORDER by arrival DESC ";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':'||';
$result.=$rw['id']."|".$rw['from']."|".$rw['thumb']."|".$rw['mess']."|".$rw['time']."|".$rw['look'];
}
echo $result;
$tx="UPDATE $tb_mess SET look=1 WHERE dest='$user' and look=0 ";
mysql_query($tx);
break;
case 'delete_mesenger':$sql="DELETE FROM $tb_mess WHERE id=$mensaje AND dest='$user'";
mysql_query($sql);
break;
case 'open_mensseger':$tx="SELECT * FROM $tb_friend2 WHERE me='$user' ";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':'|';
$result.=$rw['from'].",".$rw['dest'];
}
echo "$result";
break;
}
?>
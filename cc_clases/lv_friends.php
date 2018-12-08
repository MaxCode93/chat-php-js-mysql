<?php 
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Email:carlosmaxwell93@gmail.com
--Powered By Maxwell
*/

include('config.php');
extract($_REQUEST);
switch($act)
{
case 'pendient':$tx="SELECT * FROM $tb_friend WHERE dest='$user' ORDER BY time DESC LIMIT 0,5";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':';';$result.=$rw['id'].",".$rw['from'].",".$rw['us_id'].",".$rw['thumb'];
}
echo $result;
break;
case 'pendient_mas':$tx="SELECT * FROM $tb_friend WHERE dest='$user' ORDER BY time DESC LIMIT 0,300";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':';';$result.=$rw['id'].",".$rw['from'].",".$rw['us_id'].",".$rw['thumb'];
}
echo $result;
break;
case 'look_buddy_list':$tx="SELECT * FROM $tb_friend2 WHERE me='$user'";
$q=mysql_query($tx);
$cantfriends=mysql_num_rows($q);
while($rw=mysql_fetch_array($q))
{
$list.=($list=='')?'':';';
$list.=$rw['dest']."-".$rw['thumb'];
}
echo $list.','.$cantfriends.','.$user;
break;
case 'transf':$tx="SELECT * FROM $tb_users WHERE user!='$user' AND pass!='NOPASS' ORDER BY user";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q))
{
$result.=($result=='')?'':';';$result.=$rw['id'].",".$rw['user'];
}
echo $result;
break;
}
?>
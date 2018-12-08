<?php
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Powered By Maxwell
--Email:carlosmaxwell93@gmail.com
--avatar.php
*/
session_start();
extract($_POST);
include "resize.php"; 
include "config.php"; 
include "lv_main.php"; 
$imp="parent.up_upload();";
$f=basename($_FILES['fphoto']['name']);
$uploadfile=strtolower("../cc_data/recive/$f");
move_uploaded_file($_FILES['fphoto']['tmp_name'], $uploadfile);
$inf=pathinfo($uploadfile);
$ext=$inf['extension'];
$newname=$uploadfile;
$fisname=$uploadfile;
$newname=$fisname;
switch($act)
{
case "profile":$newname=newfile("../cc_data/44x42",$ext);
$x = new resize($fisname);
$thumname="../cc_data/44x42/th-$newname.$ext";
$x->create($thumname,46,46);
list($width, $height, $type, $attr) = getimagesize($fisname);
$maxwidth=195;
if ($width>$maxwidth)
{
$height=$height*($maxwidth/$width);
$width=$maxwidth;
}
$thumname="../cc_data/prfl/pf-$newname.$ext";
$x->create($thumname,$width,$height);
resizeto($uploadfile,640,$ext,$newname);
@unlink($uploadfile);
$ftodefault="00000.png";
$get_user=mysql_query("SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ");
while($fvieja = mysql_fetch_assoc($get_user)) {
if($fvieja['thumb'] != $ftodefault){
unlink('../cc_data/44x42/th-'.$fvieja['thumb']);
unlink('../cc_data/prfl/pf-'.$fvieja['thumb']);	
}
}
mysql_query("UPDATE $tb_users SET thumb='$newname.$ext' WHERE user='".$_SESSION['user']."' ");
mysql_query("UPDATE $tb_friend2 SET thumb='$newname.$ext' WHERE dest='".$_SESSION['user']."' ");
mysql_query("UPDATE $tb_mess SET thumb='$newname.$ext' WHERE `from`='".$_SESSION['user']."' ");
mysql_query("UPDATE $tb_notify SET thumb='$newname.$ext' WHERE `from`='".$_SESSION['user']."' ");
mysql_query("UPDATE $tb_friend SET thumb='$newname.$ext' WHERE `from`='".$_SESSION['user']."' ");
reloaddata('',$_SESSION['user'],'chgthumb');
break;
}
function resizeto($uploadfile,$maxfilesize,$ext,$nwname)
{
list($width, $height, $type, $attr) = getimagesize($uploadfile);
$max=($width>$height)?$width:$height;
if ($max>$maxfilesize)
{
$newwidth=($width/$max)*$maxfilesize;
$newheight=($height/$max)*$maxfilesize;
$x=new resize($uploadfile);
$x->create($fisname,$newwidth,$newheight);
@unlink($uploadfile);
}
else
{
rename($uploadfile,$fisname);
}
return $fisname;
}
function newfile($path,$ext)
{
if (!is_dir($path)) return '';
do
{
$fil=strtolower(dechex(rand(65536,1048575)));
}
while(is_file("$path/$fil.$ext"));
return $fil;
}
?>

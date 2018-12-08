<?php
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Email:carlosmaxwell93@gmail.com
--Powered By Maxwell
*/ 
extract($_REQUEST);
switch($act)
{
case 'download':
$img=split("\.",$thumb);
$ext=strtolower($img[count($img)-1]);
if(!$fdl=@fopen('../cc_data/prfl/pf-'.$thumb,'r'))
{
die("No se encuentra la imagen!");
}
else
{
header("Cache-Control: ");
header("Pragma: ");
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=\"".$nameuser.".".$ext."\"");
header("Content-length:".(string)(filesize('../cc_data/prfl/pf-'.$img)));
sleep(1);
fpassthru($fdl);
}
break;
}
?>
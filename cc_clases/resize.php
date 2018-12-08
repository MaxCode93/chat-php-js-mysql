<?php 
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Email:carlosmaxwell93@gmail.com
--Powered By Maxwell
*/

class resize 
{
protected $image;
function resize($image) 
{
$this->image = $image;
}
function create($filename,$nw,$nh)
{
$pt=split("\.",$filename);
$ne=strtolower($pt[count($pt)-1]);
$fp = pathinfo($this->image);
list($w, $h, $type, $attr) = getimagesize($this->image);
$types = array(1 => 'gif',2 => 'jpg',3 => 'png');
$ext=$types[$type];
switch($ext)
{
case "gif": $source=imagecreatefromgif($this->image);
break;
case "jpg": $source=imagecreatefromjpeg($this->image);
break;
case "png": $source=imagecreatefrompng($this->image);
break;
default:   die('No es compatible el tipo de imagen(gif, jpg y png');
}
$thumb = imagecreatetruecolor($nw, $nh);
$tmp_w=($w/$nw);
$tmp_h=($h/$nh);
$min=($tmp_w<$tmp_h)?$tmp_w:$tmp_h;
$fw=intval($nw*$min);
$fh=intval($nh*$min);
$ix=intval(($w-$fw)/2);
$iy=intval(($h-$fh)/2);
imagecopyresampled($thumb, $source, 0, 0, $ix, $iy, $nw, $nh, $fw, $fh);
$mx = array(array(-1,-1,-1),array(-1,16,-1),array(-1,-1,-1));
imageconvolution($thumb, $mx, 8, 0);
switch($ne)
{
case "png": imagepng( $thumb,$filename);
break;
case "gif": imagegif( $thumb,$filename);
break;default: 	imagejpeg($thumb,$filename,100);
}
imagedestroy($thumb);
imagedestroy($source);
}
}
?>
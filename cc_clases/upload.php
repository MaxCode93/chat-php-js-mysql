<?php 
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1 
--Powered By Maxwell
--Email:carlosmaxwell93@gmail.com
--upload.php(Actualizado 30/8/18 10:14AM)
*/

session_start();
echo "<script>";
include("config.php");
$tfil = $_FILES["asfiles"];
$user = $_SESSION['user'];
$date = date('d-m-y'); 
$date1 = date('m');
$date2 = $date1 + 1;
$date3 = date('-y');
$cero = 0; 
if($date2 == 13){
$date3 = date('-y') - 1;
$date2 = 1;
}
if($date2 >= 10){
$cero = null; 	
}
$datev = date('d-').$cero.$date2.$date3;
$siz=$tfil['size'];
$new = $tfil['name'];
$_POST['size']=$siz;
$ext = pathinfo($new, PATHINFO_EXTENSION);
$valid_extensions = array('jpeg', 'jpg', 'png'); // valid extensions
$exte = strtolower(pathinfo($new, PATHINFO_EXTENSION));
$maxsiz = 1000000;
$sql = "SELECT * FROM $tb_files WHERE fprop='$user'";
$result = mysql_query($sql);
$maxfiles = mysql_num_rows($result);
$alfabeto ="abcdefghijklmnopqrstuvwxyz1234567890";
	$code = "";
	for($i=0;$i<12;$i++){
	    $code .= $alfabeto[rand(0,strlen($alfabeto)-1)];
	}
$code= $code;
$dir="../cc_data/files/";
$cufdir=mkdir($dir.$user."_".$code, 0777, true);
$fusdir=$dir.$user."_".$code;
if($maxfiles >= 10) 
	{
	echo "parent.errorfilemax('$new');\r\n";	
}
		else{
	// check's valid format
if(in_array($exte, $valid_extensions) and $maxsiz >= $siz) 
	{					
$tprt = pathinfo($tfil['tmp_name']);
do
{
$new_name = $fusdir."/".$tprt['basename'];
}
while (is_file($new_name));
if(move_uploaded_file($tfil['tmp_name'], $new_name))
{
mysql_query("INSERT INTO $tb_files (usid,fname,fsize,fref,fprop,usfdir,fecha,fexpira,ext) VALUES (".$_SESSION['me'].",'$new',$siz,'$new_name','$user','$fusdir','$date','$datev','$ext')");
mysql_query("INSERT INTO $tb_files2 (usid,fref,fecha,fexpira,ext) VALUES (".$_SESSION['me'].",'$new_name','$date','$datev','$ext')");
echo "parent.filerecived('$new','$siz');\r\n";
}

	} 
	else 
	{
		echo "parent.errormess('$new');\r\n";
	}
	}
	
echo "</script>";
 ?>


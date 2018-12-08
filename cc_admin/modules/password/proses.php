<!-- 
-- LiveMessenger
-- Package LiveMessenger v17.8.1
-- Powered By Maxwell
-- Email:carlosmaxwell93@gmail.com
--->
<?php 
require '../../../cc_clases/config.php';
extract($_POST);
session_start();
if(!isset($_SESSION["lvlogin"]) || $_SESSION["lvlogin"]==null){
header('Location: ../lvadm.php');
            }else{
switch ($_GET['accion']) {
case 'root':
            $antpasc=base64_encode($_POST["antpass"]);			
            $newpass=base64_encode($_POST['newpass']);
            $sql1= mysql_query("select * from $tb_config");
            while ($r=mysql_fetch_assoc($sql1)) {
            if($antpasc==$r['chat_root_pass'] ){
	        $sql = mysql_query("UPDATE $tb_config SET chat_root_pass='$newpass'");
header("location: ../../main.php?module=password&alert=1");
            }else{
header("location: ../../main.php?module=password&alert=2");
            }
            }	
break;	

 
}
}
?>
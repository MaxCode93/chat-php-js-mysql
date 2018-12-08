<!-- 
-- LiveMessenger
-- Package LiveMessenger v17.8.1
-- Powered By Maxwell
-- Email:carlosmaxwell93@gmail.com
-- Acciones Generales
--->
<?php 
require '../../../cc_clases/config.php';
extract($_POST);
session_start();
if(!isset($_SESSION["lvlogin"]) || $_SESSION["lvlogin"]==null){
header('Location: ../lvadm.php');
            }else{
switch ($_GET['accion']) {
case 'unban':
			$user = $_GET['user'];
            $query = "DELETE FROM $tb_ban WHERE user = '$user'"; 
            $status = mysql_query($query);
            if ($status) {
                     header("location:../../main.php?module=home&alert=1");
            } else {
header("location:../../main.php?module=home&alert=1");            }
break;
}
}
?>
<!-- 
-- LiveMessenger
-- Package LiveMessenger v17.8.1
-- Powered By Maxwell
-- Email:carlosmaxwell93@gmail.com
-- On/Off Modo Mantenimiento 
--->
<?php 
require '../../../cc_clases/config.php';
extract($_POST);
switch ($_GET['accion']) {
case 'close':
if($_POST['accion']!='' )
{
  if($_SESSION["lvlogin"]=root){
$accion = $_POST['accion'];
$motiv1 = $_POST['motivo'];
mysql_query("UPDATE $tb_vars SET value = $accion WHERE var = 'close' ");
mysql_query("UPDATE $tb_vars SET value = '$motiv1' WHERE var = 'reason' ");
$sql=mysql_query("TRUNCATE $tb_online");
header("location:../../main.php?module=ajustes&alert=1");
}
}
else header("../../main.php?module=ajustes&alert=1");
break;
case 'ajge':	
            $name=$_POST['name_add'];	
            $tit=$_POST['tit_add'];	
            $des=$_POST['des_add'];	
            $own=$_POST['own_add'];	
            $sql = "UPDATE $tb_config SET chat_name='$name', chat_title='$tit', chat_des='$des', chat_owner='$own'";
            if($sql){
	        $result = mysql_query($sql);
            }
            else{
header("location:../../main.php?module=ajustes&alert=2");
            }
header("location:../../main.php?module=ajustes&alert=1");
break;	
	
}	
?>
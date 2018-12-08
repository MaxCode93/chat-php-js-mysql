
<!-- 
-- LiveMessenger
-- @Package LiveMessenger v18.8.2
-- Powered By Maxwell
-- Email:carlosmaxwell93@gmail.com
--->

<?php
if(!empty($_POST)){
	if(isset($_POST["muser"])){
		if($_POST["muser"]!=""){
			include "../cc_clases/config.php";
			$ruser=$_POST["muser"];
			$sql1= mysql_query("select * from $tb_users where user='$ruser'");
			
if (mysql_num_rows($sql1)>0)
{
	session_start();
	 $_SESSION["login"]=$ruser;
			print "<script>window.location='../lvadm.php?page=userpass';</script>";	
} else {
print "<script>window.location='../lvadm.php?login=noadmin';</script>";	
}
}
}
}
?>

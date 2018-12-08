<!-- 
-- LiveMessenger
-- @Package LiveMessenger v18.8.1
-- Powered By Maxwell
-- Email:carlosmaxwell93@gmail.com
--->
<?php

if(!empty($_POST)){
	if(isset($_POST["mpass"])){
		if($_POST["mpass"]!=""){
			include "../cc_clases/config.php";
			session_start();
			$rpass=$_POST["mpass"];
			$ruser=$_SESSION["login"];
			$panel=0;
			$sql1= mysql_query("select * from $tb_users where user='$ruser' and pass=password('$rpass') ");
			while ($r=mysql_fetch_assoc($sql1)) {
				$panel=$r["acp"];
				break;
			}
			if($panel==0 ){
				$logs = fopen("../cc_data/log/accesfail.txt","a+"); 
                $ip=$_SERVER['REMOTE_ADDR']; 
                $fecha=date("d/m/y  h:i-> "); 
                fwrite($logs, $fecha. "Login fallido de ". $_POST["muser"]. " desde ". "[". $ip. "]" . " Error: No Admin" . PHP_EOL); 
                fclose($logs);
				session_start();
				$_SESSION["lvlogin"]=null;
				print "<script>window.location='../lvadm.php?login=noadmin';</script>";
			}else{
				session_start();
				$_SESSION["lvlogin"]=$ruser;
			    $_SESSION["actual"]=$ruser;			
            	$logs=fopen("../cc_data/log/admlogacces.txt","a+"); 
                $ip=$_SERVER['REMOTE_ADDR']; 
                $fecha=date("d/m/y  h:i-> "); 
                fwrite($logs, $fecha. "Accede ". $_SESSION['lvlogin']. " desde ". "[". $ip. "]" . PHP_EOL); 
                fclose($logs);
				print "<script>window.location='main.php?module=home';</script>";
							
			}
			  }
			  else {print "<script>window.location='../lvadm.php?login=noadmin';</script>";
			  session_start();
				$_SESSION["lvlogin"]=null;
	  }
	}
}



?>


<?php
session_start();


require_once "../../../cc_clases/config.php";


if (empty($_SESSION['lvlogin'])){
	echo "<meta http-equiv='refresh' content='0; url=../lvadm.php'>";
}

else {

	if ($_GET['act']=='insert') {
		if (isset($_POST['Guardar'])) {
	
			$username  = mysql_real_escape_string(trim($_POST['username']));
			$password  = md5(mysqli_real_escape_string($mysqli, trim($_POST['password'])));
			$permisos_acceso = mysqli_real_escape_string($mysqli, trim($_POST['permisos_acceso']));

            $query = mysqli_query($mysqli, "INSERT INTO info_users(user,pass,priv)
                                            VALUES('$username','$password','$permisos_acceso')")
                                            or die('error: '.mysqli_error($mysqli));    

          
            if ($query) {
                header("location: ../../main.php?module=user&alert=1");
            }
		}	
	}
	
	elseif ($_GET['act']=='update') {
		if (isset($_POST['Guardar'])) {
			if (isset($_POST['id_user'])) {
				$id_user            = mysql_real_escape_string(trim($_POST['id_user']));
				$username           = mysql_real_escape_string(trim($_POST['username']));
				$pass               = mysql_real_escape_string(trim($_POST['new_pass']));
				$horas              = $_POST['horas'];
				$horas2             = floor($horas * 3600);
				$att                = mysql_real_escape_string(trim($_POST['att']));
				$stt                = mysql_real_escape_string(trim($_POST['stt']));
				$priv               = mysql_real_escape_string(trim($_POST['priv']));
				$adm                = mysql_real_escape_string(trim($_POST['adm']));
				$hb                 = mysql_real_escape_string(trim($_POST['hb']));				
				$acp                = mysql_real_escape_string(trim($_POST['acp']));
				$max                = mysql_real_escape_string(trim($_POST['max']));
				$adj                = mysql_real_escape_string(trim($_POST['adjunto']));
			

				if (empty($_POST['new_pass'])) {
					
                    $query = mysql_query("UPDATE info_users SET user 	= '$username',
                    													ttim 	= '$horas2',
                    													att     = '$att',
                    													stt   = '$stt',
																		adm   = '$adm',
																		acp   = '$acp',
																		max   = '$max',
																		adjunto   = '$adj',
																		hb   = '$hb',
																		priv     = '$priv'
                                                                  WHERE id 	= '$id_user'")
                                                    or die('error: '.mysql_error);

                
                    if ($query) {
						$logs = fopen("../../../cc_data/log/admlog.txt","a+"); 
						$ip=$_SERVER['REMOTE_ADDR']; 
						$fecha=date("d/m/y  h:i-> "); 
						fwrite($logs, $fecha. $_SESSION['lvlogin']. "[". $ip. "]" ." modifica a " . $username. PHP_EOL); 
						fclose($logs); 
                  
                        header("location: ../../main.php?module=user&alert=2");
                    }
				}
				
				else {
			

			                    $query = mysql_query("UPDATE info_users SET user 	= '$username',
								                                        pass =password('$pass'),
                    													ttim 	= '$horas*3600',
                    													att     = '$att',
                    													stt     = '$stt',
																		adm   = '$adm',
																		acp   = '$acp',
																		max   = '$max',
																		adjunto   = '$adj',
																		hb   = '$hb'
                                                                  WHERE id 	= '$id_user'")
			                                                    or die('error : '.mysqli_error);

			                    if ($query) {
			                    $logs = fopen("../../../cc_data/log/admlog.txt","a+"); 
						        $ip=$_SERVER['REMOTE_ADDR']; 
						        $fecha=date("d/m/y  h:i-> "); 
						        fwrite($logs, $fecha. $_SESSION['lvlogin']. "[". $ip. "]" ." modifica a " . $username. PHP_EOL); 
						        fclose($logs);
			                        header("location: ../../main.php?module=user&alert=2");
			                    }


				}

			}
		}
	}


elseif ($_GET['photo']=='del') {
		if (isset($_GET['id'])) {
			$id_user = $_GET['id'];
	$query = mysql_query("SELECT * FROM info_users WHERE id = '$id_user'")
                                            or die('error: '.mysql_error);
$dir="../../../cc_data/44x42/th-";
$dir2="../../../cc_data/prfl/pf-";
while ($data = mysql_fetch_assoc($query) ) {		
		if ($data['thumb']=='00000.png'){
			 header("location: ../../main.php?module=user");
			}else{
           $query2 = mysql_query("UPDATE info_users SET thumb  = '00000.png'
                                                          WHERE id = '$id_user'");
		  unlink($dir.$data['thumb']);
		  unlink($dir2.$data['thumb']);
		$query3 = mysql_query("delete from info_online where me  = '$id_user'");

if ($query2) {
 $logs = fopen("../../../cc_data/log/admlog.txt","a+"); 
						$ip=$_SERVER['REMOTE_ADDR']; 
						$fecha=date("d/m/y  h:i-> "); 
						fwrite($logs, $fecha. $_SESSION['lvlogin']. "[". $ip. "]" ." elimina la foto de perfil de " . $username. PHP_EOL); 
						fclose($logs);             
header("location: ../../main.php?module=user&alert=8");
            }
}
  }
		}
	}
	

    elseif ($_GET['act']=='delete') {
        if (isset($_GET['user'])) {
            $user = $_GET['user'];
    
            // Consulta para eliminar datos
			if ($user !=Maxwell && $user !=admin) {
			$query =mysql_query("DELETE FROM info_users WHERE user = '$user'"); 
			$q=mysql_query("DELETE FROM info_online WHERE user = '$user'"); 
            $status = mysql_query($query);
            // Ejecutar consulta
            if ($query) {
                // Si se elimina correctamente
				$logs = fopen("../../../cc_data/log/admlog.txt","a+"); 
						$ip=$_SERVER['REMOTE_ADDR']; 
						$fecha=date("d/m/y  h:i-> "); 
						fwrite($logs, $fecha. $_SESSION['lvlogin']. "[". $ip. "]" ." elimina a " . $user. PHP_EOL); 
						fclose($logs);
                header("location: ../../main.php?module=user&alert=4");
            }
        }else header("location: ../../main.php?module=user&alert=3");
    }		
}

}
	
?>
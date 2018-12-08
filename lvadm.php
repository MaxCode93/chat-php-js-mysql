<!-- 
-- LiveMessenger 
-- @Package LiveMessenger v18.8.1 
-- Powered By Maxwell 
-- Email:carlosmaxwell93@gmail.com 
---> 
<?php
session_start(); 
include("cc_clases/config_master.php");
include("cc_clases/config.php");
if($_SESSION["lvlogin"] ==null){
	 }else{
	 print "<script>window.location='cc_admin/';</script>";
	}

if($_POST['action'] == 'root') {
if($_POST["rpass"]!=""){
			$passr=base64_encode($_POST["rpass"]);
			$sql1= mysql_query("select * from $tb_config");
			while ($r=mysql_fetch_assoc($sql1)) {
			if($passr==$r['chat_root_pass'] ){
				session_start();
				$_SESSION["lvlogin"]=root;
				$_SESSION["actual"]=admin;
				$logs=fopen("cc_data/log/admlogacces.txt","a+"); 
                $ip=$_SERVER['REMOTE_ADDR']; 
                $fecha=date("d/m/y  h:i-> "); 
                fwrite($logs, $fecha. "Accede Root desde ". "[". $ip. "]" . PHP_EOL); 
                fclose($logs); 
				print "<script>window.location='cc_admin/main.php?module=home';</script>";
				}else{
				$logs = fopen("cc_data/log/accesfail.txt","a+"); 
                $ip=$_SERVER['REMOTE_ADDR']; 
                $fecha=date("d/m/y  h:i-> "); 
                fwrite($logs, $fecha. "Login fallido de Root desde ". "[". $ip. "]"." Error: Password Incorrecto" . PHP_EOL); 
                fclose($logs);
			print "<script>window.location='lvadm.php?page=root&alert=1';</script>";
		}
			  }}else {print "<script>window.location='lvadm.php?page=root&alert=1';</script>";
	 }
}	
?>
<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="UTF-8">
  <title><?php echo $chat_name; ?> | Administración</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
  <link rel="shortcut icon" href=".../../cc_recursos/logo.png" />
 <link rel="stylesheet" href="cc_admin/assets/css/style2.css">
<link href=".../../cc_scripts/css/icons.css" rel="stylesheet" type="text/css">
</head>

<body>
 <div class="cont">

        
  <div class="demo">
	  		<?php switch ($_GET['page']) { case 'root':  ?>
    <div class="aaaaa">
	
	<form class="form-login" action="lvadm.php" method="POST">

<div class="login__form">
	 	 	 <img class="redondo" id="thumb-pr" src="cc_admin/images/user/user-default.png" style="position: relative;
top: -5px;width:85px;height:81px;border-radius: 40px;"/>
        <div class="login__row">
		
          <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
          </svg>
		  <input type="hidden" name="action" value="root">
          <input type="password" class="login__input pass" name="rpass" placeholder="Password" id="mpass" name="mpass"/>
        </div>
        <button type="submit" class="login__submit">Acceder</button>
        <a title="Regresar" style="text-align: right; padding-top: 10px;" href="lvadm.php"><i class="glyphicon glyphicon-log-out"></i></a>
		<p class="login__signup"> <?php echo $chat_name; ?> Admin</p>
		<p class="login__signup"> Powered by <?php print $chat_owner;?></p>
				<?php  
      if (empty($_GET['alert'])) {
        echo "";
      } 
        elseif ($_GET['alert'] == 1) {
        echo "
                   <h4 class='login__signup' style='color:#FF3366;top: 10px;position: relative;'>  <i class='icon fa fa-times-circle'></i> Login Falló!</h4>
                <p class='login__signup' style='color:#FF3366;top: 10px;position: relative;'>Contraseña incorrecta</p>              
				";
      }
      ?>
      </div>
	  </form>
	  
    </div>
<?php break; 
default  
?>
<form class="form-login" name="login" action="cc_admin/vuser.php" method="POST">
<div class="login__form" id="particles-js">
	 	 <img class="redondo" id="thumb-pr" src="cc_admin/images/user/user-default.png" style="position: relative;
top: -5px;width:85px;height:81px;border-radius: 40px;"/>
        <div class="login__row">
          <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
          </svg>
		  <input type="hidden" id="action" name="action" value="login">
          <input type="text" class="login__input name" placeholder="Usuario" id="muser" name="muser" required autofocus/>
        </div>
        <button type="submit" class="login__submit">Continuar</button>
        <a title="Root" style="text-align: right; padding-top: 10px;" href="lvadm.php?page=root"><i class="glyphicon glyphicon-log-in"></i></a>
		<p class="login__signup"> <?php echo $chat_name; ?> Admin</p>
		<p class="login__signup"> Powered by <?php print $chat_owner;?></p>
		<p></p>
<?php if($_GET['login'] == 'error') { echo '<p class="login__input name" role="alert">Se requiere su password !!</p>'; } elseif($_GET['login'] == 'noadmin') { echo '<h4 class="login__signup" style="color:#FF3366;top: 10px;position: relative;" role="alert">Login Fallo!!</h4> <p class="login__signup" style="color:#FF3366;top: 10px;position: relative;" role="alert">Error de acceso!!</p>'; }?>
      </div>

	   </form>
<?php break; 
case 'userpass': 
	$luser=$_SESSION["login"];
	$sql0= mysql_query("select * from $tb_users where user='$luser'");
$data  = mysql_fetch_assoc($sql0);
?>
<form class="form-login" name="login" action="cc_admin/login.php" method="POST">
<div class="login__form" id="particles-js">
	 <img class="redondo" id="thumb-pr" src="cc_data/44x42/th-<?php echo $data['thumb']; ?>" style="position: relative;
top: -5px;width:85px;height:81px;border-radius: 40px;"/>
        <div class="login__row">
		
          <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
          </svg>
          <input type="password" class="login__input pass" placeholder="Ingrese su Password" id="mpass" name="mpass" autofocus/>
        </div>
        <button type="submit" class="login__submit">Acceder</button>
        <a title="Root" style="text-align: right; padding-top: 10px;" href="lvadm.php?page=root"><i class="glyphicon glyphicon-log-in"></i></a>
		<p class="login__signup"> <?php echo $chat_name; ?> Admin</p>
		<p class="login__signup"> Powered by <?php print $chat_owner;?></p>
		<p></p>
<?php if($_GET['login'] == 'error') { echo '<br><p style="color:#FF3366;" class="login__input name" role="alert">Se requiere su password !!</p>'; } elseif($_GET['login'] == 'noadmin') { echo '<h4 class="login__signup" style="color:#FF3366;top: 10px;position: relative;" role="alert">Login Fallo!!</h4> <p class="login__signup" style="color:#FF3366;top: 10px;position: relative;" role="alert">Error de identificación !!</p>'; }?>
      </div>

	   </form>
<?php break; } ?>	   
  </div>
</div>
<script src='cc_admin/assets/js/jquery.min.js'></script>

</body>

</html>

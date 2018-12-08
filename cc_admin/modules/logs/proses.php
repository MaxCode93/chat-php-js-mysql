<?php
session_start();

// Llamar el archivo de conexion a la base de datos
require_once "../../../cc_clases/config.php";
// función para comprobar el estado del usuario conectado
// si el usuario no está conectado, cambie a la página de inicio de sesión y envie mensaje en pantalla = 1
if (empty($_SESSION['lvlogin'])){
    echo "<meta http-equiv='refresh' content='0; url=../lvadm.php'>";
}
// si el usuario ya ha iniciado sesión, a continuación, ejecutar el comando para actualizar y borrar
else {
switch ($_GET['accion']) {
case 'clear_enteruser':
			$file='../../../cc_data/log/enteruser.txt';
            @unlink($file);
            $crear = fopen('../../../cc_data/log/enteruser.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs&alert=1");
            } else {
header("location:../../main.php?module=logs&alert=2");
            }
break;
case 'clear_priv':
			$file='../../../cc_data/log/priv.txt';
            @unlink($file);
            $crear = fopen('../../../cc_data/log/priv.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs1&alert=1");
            }else {
header("location:../../main.php?module=logs1&alert=2");
            }
break;
case 'clear_estrellas':
			$file='../../../cc_data/log/estrellas.txt';
            @unlink($file);
            $crear = fopen('../cc_data/log/estrellas.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs1&alert=1");
            } else {
header("location:../../main.php?module=logs1&alert=2");
            }
break;
case 'clear_stt':
			$file='../../../cc_data/log/stt.txt';
            @unlink($file);
            $crear = fopen('../../../cc_data/log/stt.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs1&alert=1");
            } else {
header("location:../../main.php?module=logs&1alert=2");
            }
break;
case 'clear_topic':
			$file='../../../cc_data/log/topic.txt';
            @unlink($file);
            $crear = fopen('../../../cc_data/log/topic.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs&alert=1");
            } else {
header("location:../../main.php?module=logs&alert=2");
            }
break;	
case 'clear_adm':
			$file='../../../cc_data/log/admlog.txt';
            @unlink($file);
            $crear = fopen('../../../cc_data/log/admlog.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs2&alert=1");
            } else {
header("location:../../main.php?module=logs2&alert=2");
            }
break;
case 'clear_adm_acces':
			$file='../../../cc_data/log/admlogacces.txt';
            @unlink($file);
            $crear = fopen('../../../cc_data/log/admlogacces.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs2&alert=1");
            } else {
header("location:../../main.php?module=logs2&alert=2");
            }
break;
case 'clear_error_log':
			$file='../../../cc_data/log/error_log.txt';
            @unlink($file);
            $crear = fopen('../../../cc_data/log/error_log.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs2&alert=1");
            } else {
header("location:../../main.php?module=logs2&alert=2");
            }
break;
case 'clear_error_acces':
			$file='../../../cc_data/log/accesfail.txt';
            @unlink($file);
            $crear = fopen('../cc_data/log/accesfail.txt', 'w');
            if ($crear) {
header("location:../../main.php?module=logs2&alert=1");
            } else {
header("location:../../main.php?module=logs2&alert=2");
            }
break;
 
}
       
}       
?>
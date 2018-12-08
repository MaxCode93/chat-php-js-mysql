<?php
/* 
-- LiveMessenger 
-- @Package LiveMessenger v18.8.1
-- Powered By Maxwell
-- Email:carlosmaxwell93@gmail.com
-- config.php
*/
//Inicializa Variables de las Tablas(No cambiar nada)
    $pr="info_"; // Para uso del Panel Admin
    $tb_ban="info_ban";
    $tb_vars="info_vars"; 
    $tb_mess="info_mess";
    $tb_mess2="info_mess2";
    $tb_files="info_files"; 
    $tb_files2="info_files2"; 
    $tb_stats="info_stats"; 
    $tb_users="info_users";
    $tb_anounce="info_anu";
    $tb_online="info_online";
    $tb_friend="info_friend";
    $tb_friend2="info_friend2";
    $tb_notify="info_notif";
    $tb_config="info_config";

    // Conexion a la Base de Datos(Configurar Segun Servidor :))                                                   
    $mysql_user = "root"; // Usuario de la Base de Datos                                               
    $mysql_pass = ""; // Contrase�a del Usuario de la Base de Datos
    $mysql_host = "localhost"; // Host 
    $mysql_base = "chat"; // Base de Datos para el Sitio
    $mysqlconect = @mysql_connect($mysql_host,$mysql_user,$mysql_pass);

   // Error de conexion
if (!$mysqlconect) 
    die('  <head>
    <link rel="shortcut icon" href="cc_recursos/logo.png">
    <title>Error Fatal - Error de Configuración</title>
    <link href=".../../cc_scripts/css/chat.css" rel="stylesheet" type="text/css">
	<div style="background: rgba(23, 97, 159, 0.93) none repeat scroll 0% 0%;text-align: center;border-radius: 20px;" >
    <h2>Error <font color="#1571D3"></font></h2>
    <p>
    config.php no esta configuardo adecuadamente(host, usuario o password son incorrectos). 
    </p><br>
	    </div>
		   </head>
   ');
	
$select_db = mysql_select_db($mysql_base); //Seleccionar DB 
    // Error seleccionando la bd
if (!$select_db) 
	die('  <head>
    <link rel="shortcut icon" href="cc_recursos/logo.png">
    <title>Error Fatal - Error de Conección</title>
    <link href=".../../cc_scripts/css/chat.css" rel="stylesheet" type="text/css">
	<div style="background: rgba(23, 97, 159, 0.93) none repeat scroll 0% 0%;text-align: center;border-radius: 20px;" >
    <h2>Error <font color="#1571D3"></font></h2>
    <p>
    La base de datos no existe o el nombre no es correcto en config.php, configurelo adecuadamente. 
    </p><br>
	    </div>
		   </head>
   ');
   ?>
<?php
/* Agrega conexion a la base de datos*/
require_once "../cc_clases/config.php";
include('../cc_clases/config_master.php');
/* llama a la funcion que contiene los formatos de fecha */


session_start();

//función para comprobar el estado del usuario conectado
// si el usuario no está conectado, cambie a la página de inicio de sesión y envie mensaje en pantalla = 1
if (empty($_SESSION['lvlogin'])){
	echo "<meta http-equiv='refresh' content='0; url=index.php?alert=1'>";
}
// si el usuario ya ha iniciado sesión, a continuación, ejecutar el script para llamar el contenido del archivo de paginación
else {
	// Si el contenido es home llamar la vista correspondiente
	if ($_GET['module'] == 'home') {
		include "modules/home/view.php";
	}
	
	if ($_GET['module'] == 'about') {
		include "modules/about/view.php";
	}

	// Si el contenido es about llamar la vista correspondiente
	elseif ($_GET['module'] == 'ajustes') {
		include "modules/ajustes/view.php";
	}
	// -----------------------------------------------------------------------------
	
	// Si el contenido es portfolio llamar la vista correspondiente
	elseif ($_GET['module'] == 'user') {
		include "modules/user/view.php";
	}

	// Si el contenido es form_portfolio llamar la vista correspondiente
	elseif ($_GET['module'] == 'form_user') {
		include "modules/user/form.php";
	}
	// -----------------------------------------------------------------------------

	// Si el contenido es message llamar la vista correspondiente
	elseif ($_GET['module'] == 'message') {
		include "modules/message/view.php";
	}

	// Si el contenido es form_message llamar la vista correspondiente
	elseif ($_GET['module'] == 'form_message') {
		include "modules/message/form.php";
	}
	// -----------------------------------------------------------------------------

	// Si el contenido es password llamar la vista correspondiente
	elseif ($_GET['module'] == 'password') {
		include "modules/password/view.php";
	}
	// -----------------------------------------------------------------------------
	
	// Si el contenido es portfolio llamar la vista correspondiente
	elseif ($_GET['module'] == 'file') {
		include "modules/file/view.php";
	}

	// Si el contenido es form_portfolio llamar la vista correspondiente
	elseif ($_GET['module'] == 'form_file') {
		include "modules/file/form.php";
	}
	
	// Si el contenido es portfolio llamar la vista correspondiente
	elseif ($_GET['module'] == 'logs') {
		include "modules/logs/view.php";
	}
	
	elseif ($_GET['module'] == 'logs1') {
		include "modules/logs/view1.php";
	}
	
	elseif ($_GET['module'] == 'logs2') {
		include "modules/logs/view2.php";
	}
	// Si el contenido es form_portfolio llamar la vista correspondiente
	elseif ($_GET['module'] == 'form_logs') {
		include "modules/logs/form.php";
	}
}
?>
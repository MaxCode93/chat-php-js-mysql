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
    if ($_GET['act']=='delete') {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
    
            // Consulta para eliminar datos
            $query = mysql_query("DELETE FROM info_mess2 WHERE id='$id'")
                                            or die('Hubo un error en la consulta de eliminación : '.mysql_error);

            // Ejecutar consulta
            if ($query) {
                // Si se elimina correctamente
                header("location: ../../main.php?module=message&alert=1");
            }
        }
    }
	    elseif ($_GET['act']=='delete_all') {
    
            // Consulta para eliminar datos
            $query = mysql_query("TRUNCATE	info_mess2")
                                            or die('Hubo un error en la consulta de eliminación : '.mysql_error);

            // Ejecutar consulta
            if ($query) {
                // Si se elimina correctamente
                header("location: ../../main.php?module=message&alert=2");
            }
        
    }
       
}       
?>
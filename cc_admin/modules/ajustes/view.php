
  <!-- Content Header (Page header) -->
  
  <section class="content-header">
  
    <h1>
      <h4 class="mb"> <i class="fa fa-cogs fa-fw"></i> Ajustes del Sitio</h4>
    </h1>
    <ol class="breadcrumb">
      <li><a href="?module=home"><i class="fa fa-home"></i> Inicio</a></li>
    </ol>
  </section>
  
  <!-- Main content -->
  <section class="content">
  <?php  
    if (empty($_GET['alert'])) {
      echo "";
    } 
    elseif ($_GET['alert'] == 1) {
       echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Bien hecho!</h4>
              Configuracion del sitio actualizada.
            </div>";
	  }
    ?>

<div class="box box-primary">
    <div style="text-align: center" class="content">
        <div style="margin-right: 150px; margin-left: 150px">
        <form role="form" name="name_add" target="_self" action="modules/ajustes/proses.php?accion=ajge" method="POST"> <tr> <td height="41" colspan="2" align="center" valign="top"> <table width="100%" bgcolor="#FFFFFF" style='border:#CCCCCC solid 1px; z-index:257;'> <tr align="center"> <label for="name_add" class="box-header with-border"><i class="fa fa-cogs fa-fw"></i> Ajustes Generales del Sitio</label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nombre <input type="text" style="width:190px;height:25px"   name = "name_add" id="name_add" value="<?php print $chat_name; ?>" ><br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Titulo <input type="text" style="width:190px;height:25px"   name = "tit_add" id="tit_add" value="<?php print $chat_title;?>" ><br><br> Descripcion&nbsp;<input type="text" style="width:190px;height:25px"   name = "des_add" id="des_add" value="<?php print $chat_des; ?>" ><br><br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Owner <input type="text" style="width:190px;height:25px" name = "own_add" id="own_add" value="<?php print $chat_owner; ?>" ><br><br> <br><br> <?php if($_SESSION["lvlogin"] ==root){ echo '<button title="Guarda la configuración" type="submit" class="btn btn-primary btn-submit" onclick = "validate()">Cambiar</button>'; }else{ echo '<button title="Guarda la configuración" type="submit" class="btn btn-primary btn-submit btn-danger" onclick = "validate()" disabled>Solo Root</button>'; } ?> <p id = "em"></p></td></tr> <tr> <tr align="center"><td width="50"></td> <td colspan="2"> <tr>&nbsp;</table> </form> </div> <tr> <form align="center" name="conect-desconect" target="ukm9" action="modules/ajustes/proses.php?accion=close" method="POST"> <tr align="center"><td height="41" colspan="2" valign="top"> <table width="100%" bgcolor="#FFFFFF" style='border:#CCCCCC solid 0px; z-index:257;' align="center"> <tr align="center"> <td align="center"> </td> <label for="name_add" class="box-header with-border">Modo Mantenimiento:</label>Activar el Modo: <select name="accion"> <option value="0">Si</option> <option value="1">No</option> </select><br><br><td colspan="0"> <?php if($_SESSION["lvlogin"] ==root){ echo '<input type="submit" class="btn btn-primary btn-submit" onclick="correcto_mmto();" name="conectar" value="Enviar">'; }else{ echo '<input type="submit" class="btn btn-primary btn-submit btn-danger" name="conectar" value="Solo Root" disabled>'; } ?><br><br> </td></tr>  <tr>&nbsp;</td> <tr>&nbsp;</table></form>
         </div>

        <br>
      </div>
	  
    </div>
  </section><!-- /.content -->
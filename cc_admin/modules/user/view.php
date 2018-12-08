

<section class="content-header">
  <h1>
    <i class="fa fa-user icon-title"></i> Gestión de Usuarios

  </h1>

</section>

<!-- Main content -->
<section class="content">
  <div class="row">
    <div class="col-md-12">

    <?php  

    if (empty($_GET['alert'])) {
      echo "";
    } 

    elseif ($_GET['alert'] == 1) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Exito!</h4>
              Los nuevos datos de usuario se ha registrado correcamente.
            </div>";
    }

    elseif ($_GET['alert'] == 2) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Exito!</h4>
           Los datos del usuario han sido cambiados satisfactoriamente.
            </div>";
    }

    elseif ($_GET['alert'] == 3) {
      echo "<div class='alert alert-danger alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-times-circle'></i> Error!</h4>
            Este usuario no se puede eliminar.
            </div>";
    }
 
    elseif ($_GET['alert'] == 4) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Exito!</h4>
             Usuario Eliminado Correctamente.
            </div>";
    }
   
    elseif ($_GET['alert'] == 5) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Exito!</h4>
             Usuarios Eliminados. Usuario admin: admin | Password: admin
            </div>";
    }

    elseif ($_GET['alert'] == 6) {
      echo "<div class='alert alert-danger alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-times-circle'></i> Error!</h4>
            Asegúrese de que la imagen no es más de 1 MB.
            </div>";
    }
 
    elseif ($_GET['alert'] == 7) {
      echo "<div class='alert alert-danger alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-times-circle'></i> Error!</h4>
             Asegúrese de que el tipo de archivo subido sea  *.JPG, *.JPEG, *.PNG.
            </div>";
    }
	
	elseif ($_GET['alert'] == 8) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Exito!</h4>
            Foto Eliminada Correctamente.
            </div>";
    }
	    
	elseif ($_GET['alert'] == 9) {
      echo "<div class='alert alert-danger alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-times-circle'></i> Error!</h4>
             Error, foto de perfil predeterminada.
            </div>";
    }
    ?>

      <div class="box box-primary">
        <div class="box-body">
     
          <table id="dataTables1" class="table table-bordered table-striped table-hover">
       
            <thead>
              <tr>
                <th class="center">No.</th>
                <th class="center">Usuario</th>
				<th class="center">IP</th>
                <th class="center">Correo</th>
                <th class="center">Estatus</th>
				<th class="center">Registro</th>
                <th class="center">Acciones</th>
              </tr>
            </thead>


                        <tbody>
            <?php  
            $no = 1;
      
            $query = mysql_query("SELECT * FROM info_users where reg='1' ORDER BY user ASC")
                                            or die('error: '.mysqli_error);


            while ($data = mysql_fetch_assoc($query)) { 
             
			 $ip = substr("$data[ip]", 27);
              echo "<tr>
                      <td width='50' class='center'>$no</td>";

                      if ($data['thumb']=="") { ?>
                        <td class='left'><img class='img-user' src='images/user/user-default.png' style="height: 50px;width: 53px;">  <?php print $data[user];?></td>
                      <?php
                      } else { ?>
                        <td class='left'><img class='img-user' src='../cc_data/prfl/pf-<?php echo $data['thumb']; ?>' style="height: 50px;width: 53px;"> <?php print $data[user]; ?> </td>
                      <?php
                      }

              echo "  <td>$ip</td>
                      <td>$data[mail]</td>";
                      if ($data['stt']=="1")
						  echo "<td>Registrado</td>";
					  else if ($data['stt']=="2")
						  echo "<td>Usuario Nivel 1</td>";
					  else if ($data['stt']=="3")
						  echo "<td>Usuario Nivel 2</td>";
					  else if ($data['stt']=="4")
						  echo "<td>Usuario Estrella</td>";
					  else if ($data['stt']=="5")
						  echo "<td>CiberChica</td>";
					  else if ($data['stt']=="6")
						  echo "<td>CiberChico</td>";
					  else if ($data['stt']=="7")
						  echo "<td>Supervisor</td>";
					  else if ($data['stt']=="8")
						  echo "<td>Princesa</td>";
					   else if ($data['stt']=="9")
						  echo "<td>Admin</td>";
					   else if ($data['stt']=="10")
						  echo "<td>Admin SalaPublica</td>";
					   else if ($data['stt']=="11")
						  echo "<td>Super Admin</td>";
               echo "  <td>$data[freg]</td>";
                      echo "<td class='center'>";
            ?>
						   <a data-toggle='tooltip' data-placement='top' title='Editar Datos' style='margin-right:5px' class='btn btn-primary btn-sm' href='?module=form_user&form=edit&id=<?php echo $data['id'];?>'>
                              <i style='color:#fff' class='glyphicon glyphicon-edit'></i>
                          </a>
						  <a data-toggle="tooltip" data-placement="top" title="Eliminar" class="btn btn-danger btn-sm" href="modules/user/proses.php?act=delete&user=<?php echo $data['user'];?>" onclick="return confirm('¿Está seguro de que desea eliminar el usuario <?php echo $data['user']; ?> ?');">
                              <i style="color:#fff" class="glyphicon glyphicon-trash"></i>
                          </a>
            <?php
              echo "    </div>
                      </td>
                    </tr>";
              $no++;
            }
            ?>
            </tbody>
          </table>
        </div>
          <!-- /.box-body -->
      </div><!-- /.box -->
    </div><!--/.col -->
  </div>   <!-- /.row -->
</section><!-- /.content
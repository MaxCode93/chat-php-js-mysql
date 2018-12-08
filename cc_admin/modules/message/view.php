<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    <i class="fa fa-envelope-o icon-title"></i> Mensajes
	    <a class="btn btn-danger btn-social pull-right" href="modules/message/proses.php?act=delete_all" onclick="return confirm('¿Está seguro de que desea eliminar todos los mensajes del chat?');" title="Eliminar Todos!" data-toggle="tooltip">
      <i class="fa fa-trash"></i> Eliminar Todos!
    </a>
  </h1>

</section>

<!-- Main content -->
<section class="content">
  <div class="row">
    <div class="col-md-12">

    <?php  
    // funciones para mostrar mensajes
    if (empty($_GET['alert'])) {
      echo "";
    } 
    // Mostrar mensaje de éxito "mensaje ha sido eliminado"
    elseif ($_GET['alert'] == 1) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Bien hecho!</h4>
              El mensaje se ha eliminado correctamente.
            </div>";
    }
	    elseif ($_GET['alert'] == 2) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Bien hecho!</h4>
              Mensajes borrados correctamente.
            </div>";
    }
    ?>

      <div class="box box-primary">
        <div class="box-body">
          <!-- tampilan tabel pesan -->
          <table id="dataTables1" class="table table-bordered table-striped table-hover">
            <!-- tampilan tabel header -->
            <thead>
              <tr>
                <th class="center">No.</th>
                <th align="left">De</th>
                <th align="left">Para</th>
                <th align="left">Mensaje</th>
				<th align="left">Accion</th>
     
              </tr>
            </thead>
            <tbody>
            <?php  
            $no = 1;
            // Consultar tabla de mensajes
            $query = mysql_query("SELECT * FROM info_mess2 ORDER BY id DESC")
                                            or die('Hubo un error en la consulta de datos: '.mysql_error);

            // Los datos que se muestran
            while ($data = mysql_fetch_assoc($query)) { 
             
              
              echo "<tr style='background:$warna'>
                      <td width='40' class='center'>$no</td>
                      <td width='150'>$data[mfrom]</td>
                      <td width='120'>$data[mdest]</td>
                      <td width='300'>$data[mmess]</td>
                      
                      <td class='center' width='80'>
                        ";
            ?>
                          <a data-toggle="tooltip" data-placement="top" title="Eliminar" class="btn btn-danger btn-sm" href="modules/message/proses.php?act=delete&id=<?php echo $data['id'];?>" onclick="return confirm('¿Está seguro de que desea eliminar este mensaje de <?php echo $data['mfrom']; ?>?');">
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
        </div><!-- /.box-body -->
      </div><!-- /.box -->
    </div><!--/.col -->
  </div>   <!-- /.row -->
</section><!-- /.content
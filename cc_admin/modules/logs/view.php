<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    <i class="fa fa-file icon-title"></i> Reportes
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
              Registros Borrados Correctamente.
            </div>";
    }
	    elseif ($_GET['alert'] == 2) {
      echo "<div class='alert alert-danger alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-times-circle'></i> Error!</h4>
              Error vaciando registros.
            </div>";
    }
    ?>

      <div class="box box-primary">
        <div class="box-body">
          <!-- tampilan tabel pesan -->
          <table id="dataTables1" class="table table-bordered table-striped table-hover">
            <!-- tampilan tabel header --><p>
    <i class="fa fa-file icon-title"></i> Entrada
  </p>
<div class="box-body">
<textarea name="enteruser" style="width:600px;height:150px" type="text" id="enteruser"><?=$enteruser=(@file_get_contents('../cc_data/log/enteruser.txt'));?> </textarea>
<a style="position: relative; top: -65px;" data-toggle="tooltip" data-placement="top" title="Vaciar" class="btn btn-danger btn-sm" href="modules/logs/proses.php?accion=clear_enteruser" onclick="return confirm('¿Está seguro de que desea vaciar los registros ?');">
<i style="color:#fff" class="glyphicon glyphicon-trash"></i>
</a>
</div>

 <!-- tampilan tabel header -->
 <p>
    <i class="fa fa-file icon-title"></i> Topic
  </p>
<div class="box-body">
<textarea name="enteruser" style="width:600px;height:150px" type="text" id="enteruser"><?=$enteruser=(@file_get_contents('../cc_data/log/topic.txt'));?> </textarea>
<a style="position: relative; top: -65px;" data-toggle="tooltip" data-placement="top" title="Vaciar" class="btn btn-danger btn-sm" href="modules/logs/proses.php?accion=clear_topic" onclick="return confirm('¿Está seguro de que desea vaciar los registros?');">
<i style="color:#fff" class="glyphicon glyphicon-trash"></i>
</a>
</div>
          </table>
        </div><!-- /.box-body -->
      </div><!-- /.box -->
    </div><!--/.col -->
  </div>   <!-- /.row -->
</section><!-- /.content
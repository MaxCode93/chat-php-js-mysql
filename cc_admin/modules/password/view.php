
<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    <i class="fa fa-lock icon-title"></i> Cambiar contraseña
  </h1>
  <ol class="breadcrumb">
    <li><a href="?module=home"><i class="fa fa-home"></i> Inicio</a></li>
    <li class="active">Cambiar Contraseña</li>
  </ol>
</section>

<!-- Main content -->
<section class="content">
  <div class="row">
    <div class="col-md-12">

    <?php  
    if (empty($_GET['alert'])) {
      echo "";
    } 
    elseif ($_GET['alert'] == 2) {
      echo "<div class='alert alert-danger alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-times-circle'></i> Error!</h4>
              Su contraseña antigua es incorrecta.
            </div>";
    }
    elseif ($_GET['alert'] == 1) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Bien hecho!</h4>
              La contraseña se ha cambiado correctamente.
            </div>";
    }
    ?>

      <!-- form ubah password -->
      <div class="box box-primary">
        <!-- form start -->
        <form role="form" class="form-horizontal" method="POST" action="modules/password/proses.php?accion=root">
          <div class="box-body">

            <div class="form-group">
              <label class="col-sm-2 control-label">Contraseña actual</label>
              <div class="col-sm-5">
                <input type="password" class="form-control" name="antpass" autocomplete="off" required>
              </div>
            </div>

            <div class="form-group">
              <label class="col-sm-2 control-label">Nueva contraseña</label>
              <div class="col-sm-5">
                <input type="password" class="form-control" name="newpass" autocomplete="off" required>
              </div>
            </div>

          </div><!-- /.box-body -->
          
          <div class="box-footer bg-btn-action">
            <div class="form-group">
              <div class="col-sm-offset-2 col-sm-10">
                <input type="submit" class="btn btn-primary btn-submit" name="save" value="Guardar">
              </div>
            </div>
          </div>
        </form>
      </div><!-- /.box -->
    </div><!--/.col -->
  </div>   <!-- /.row -->
</section><!-- /.content -->
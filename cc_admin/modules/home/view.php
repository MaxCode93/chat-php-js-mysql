  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      <i class="fa fa-home icon-title"></i> Inicio
    </h1>
    <ol class="breadcrumb">
      <li><a href="?module=home"><i class="fa fa-home"></i> Inicio</a></li>
    </ol>
  </section>
  
  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-lg-12 col-xs-12">
	  <?php  

    if (empty($_GET['alert'])) {
      echo "";
    } 

    elseif ($_GET['alert'] == 1) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Exito!</h4>
              Usuario desbaneado correctamente.
            </div>";
    }
?>
        <div class="alert alert-info alert-dismissable">
          <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
          <p style="font-size:15px">
            <i class="icon fa fa-user"></i> Bienvenido <strong><?php echo $_SESSION['lvlogin']; ?>.</strong> Esta es la pagina de inicio donde se muestran las estadísticas del sitio.
          </p>        
        </div>

      </div>  
    </div>
   	 <h1>
      <i class="glyphicon glyphicon-list icon-title"></i> Estadísticas del Sitio
    </h1>
    <!-- Small boxes (Stat box) -->
    <div class="row">

      <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div style="background-color:#00c0ef;color:#fff" class="small-box">
          <div class="inner">
            <h3><?php $sql = "SELECT * FROM $tb_users";$result = mysql_query($sql);$tusers = mysql_num_rows($result);print $tusers;?></h3>
            <p>Usuarios</p>
          </div>
          <div class="icon">
            <i class="fa fa-users"></i>
          </div>
            <a href="?module=user" class="small-box-footer" title="Ver" data-toggle="tooltip"><i class="fa fa-eye"></i></a>
          
        </div>

      </div>
	  		 <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div style="background-color:#00a65a;color:#fff" class="small-box">
          <div class="inner">
            <h3><?php $sql = "SELECT * FROM $tb_anounce";$result = mysql_query($sql);$tusers = mysql_num_rows($result);print $tusers;?></h3>
            <p>Anuncios</p>
          </div>
          <div class="icon">
            <i class="fa fa-desktop"></i>
          </div>
		 <a href="?module=anuncios" class="small-box-footer" title="Ver" data-toggle="tooltip"><i class="fa fa-eye"></i></a>

        </div>
		
      </div>
	  		 <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div style="background-color:#dd4b39;color:#fff" class="small-box">
          <div class="inner">
            <h3><?php $sql = "SELECT * FROM $tb_mess2";$result = mysql_query($sql);$tusers = mysql_num_rows($result);print $tusers;?></h3>
            <p>Mensajes</p>
          </div>
          <div class="icon">
            <i class="fa fa-envelope"></i>
          </div>
		  <a href="?module=message" class="small-box-footer" title="Ver" data-toggle="tooltip"><i class="fa fa-eye"></i></a>
        </div>
      </div>
	  	  		 <div class="col-lg-3 col-xs-6">
        <!-- small box -->
        <div style="background-color:rgb(210, 200, 8);color:#fff" class="small-box">
          <div class="inner">
            <h3><?php $sql = "SELECT * FROM $tb_files";
			$result = mysql_query($sql);
			$tusers = mysql_num_rows($result);
			print $tusers;
			?> 
			</h3>
           <p>Archivos </p>          </div>
          <div class="icon">
            <i class="fa fa-file"></i>
          </div>
		  <a href="?module=file" class="small-box-footer" title="Ver" data-toggle="tooltip"><i class="fa fa-eye"></i></a>
        </div>
      </div>
	  <!-- ./col -->
<!-- ./col -->
<div class="small-box"> </div> <div style="overflow:hidden;top:100px;"> <h4>Historial de Cambios<font color="#1571D3"> </font></h4> <textarea name="cambios" id="cambios" style="width: 758px; height: 221px;cursor:pointer;"><?=$cambios=(@file_get_contents('version.log'))?></textarea> </div>
    </div><!-- /.row -->
  </section><!-- /.content -->
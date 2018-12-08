<!-- Content Header (Page header) -->
<section class="content-header">
  <h1>
    <i class="fa fa-file icon-title"></i> Archivos  <?php $result2 = mysql_query("SELECT SUM(fsize) as total FROM $tb_files");
$row = mysql_fetch_array($result2, MYSQL_ASSOC);

if($row["total"] >= 1048576){
			 $peso = $row["total"]/1048576;
			 $t=MB;
		     }
			 else {
		     $peso = $row["total"]/1024;
			 $t=KB;
			 }
			 $arr = round($peso,2);
?>
	    <a class="btn btn-danger btn-social pull-right" href="modules/file/proses.php?accion=delete_all" onclick="return confirm('¿Está seguro de que desea eliminar todos los archivos del chat?');" title="Eliminar Todos!" data-toggle="tooltip">
      <i class="fa fa-trash"></i> Eliminar Todos!
    </a>
  </h1>
<?php echo $arr.$t." de espacio usado en disco";?>
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
    elseif ($_GET['alert'] == 1) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Bien hecho!</h4>
              El archivo se ha eliminado correctamente.
            </div>";
    }
	    elseif ($_GET['alert'] == 2) {
      echo "<div class='alert alert-success alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-check-circle'></i> Bien hecho!</h4>
              Archivos borrados correctamente.
            </div>";
    }
	elseif ($_GET['alert'] == 3) {
      echo "<div class='alert alert-danger alert-dismissable'>
              <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>
              <h4>  <i class='icon fa fa-times-circle'></i> Eliminar!</h4>
              Se han eliminado todos los ficheros.
            </div>";
    }
    ?>

      <div class="box box-primary">
	      <div class="box-body">

          <table id="dataTables1" class="table table-bordered table-striped table-hover">

            <thead>
              <tr>
                <th class="center">No.</th>
          <?php  if($_SESSION["lvlogin"] ==root){
				echo '<th align="left" data-toggle="tooltip" data-placement="top">Fichero</th>';}
				else{
					echo '<th align="left" data-toggle="tooltip" data-placement="top">Fichero</th>';}
          ?>
				<th align="left">Propietario</th>
				<th align="left">Subido</th>
				<th align="left">Expira</th>
				<th align="left">Accion</th>
     
              </tr>
            </thead>
            <tbody>
            <?php  
            $no = 1;
            // Consultar tabla de mensajes
            $query = mysql_query("SELECT * FROM info_files ORDER BY id DESC")
                                            or die('Hubo un error en la consulta de datos: '.mysql_error);
            // Los datos que se muestran
            while ($data = mysql_fetch_assoc($query)) { 
			if($data['ext']== png){
				$ext= "img.png";
			}elseif($data['ext']== ini){
				$ext= "txt.png";
			}elseif($data['ext']== txt){
				$ext= "txt.png";
			}elseif($data['ext']== jpg){
				$ext= "img.png";
			}elseif($data['ext']== gif){
				$ext= "img.png";
			}elseif($data['ext']== rar){
				$ext= "zip.png";
			}elseif($data['ext']== zip){
				$ext= "zip.png";
			}elseif($data['ext']== JPEG){
				$ext= "img.png";
			}elseif($data['ext']== exe){
				$ext= "otro.png";
			}elseif($data['ext']== flv){
				$ext= "flash.png";
			}elseif($data['ext']== ppt){
				$ext= "ppt.png";
			}elseif($data['ext']== doc){
				$ext= "word.png";
			}elseif($data['ext']== xls){
				$ext= "excel.png";
			}elseif($data['ext']== apk){
				$ext= "apk.png";
			}elseif($data['ext']== pdf){
				$ext= "pdf.png";
			}elseif($data['ext']== mp3){
				$ext= "mp3.png";
			}elseif($data['ext']== avi or $data['ext']== mp4 or $data['ext']== mpg or $data['ext']== mpeg){
				$ext= "video.png";
			}
			else
				$ext= "otro.png";
			
			
			if($data[fsize] >= 1048576){
			 $peso = $data[fsize]/1048576;
			 $t=MB;
		     }
			 else {
		     $peso = $data[fsize]/1024;
			 $t=KB;
			 }
			 $arr = round($peso,2);
              echo "<tr style='background:$warna'>
                      <td width='40' class='center'>$no</td>";
                     if($_SESSION["lvlogin"] ==root){
						 if ($data['prev'] == null){ 
						 echo '<td><img class="redondo" data-toggle="tooltip" data-placement="top" title="'.$arr.$t.' " align="center" src="images/ext/'.$ext.'" width="50" height="50">&nbsp'.$data['fname'].'</td>'; }else{
						 echo '<td><img class="redondo" data-toggle="tooltip" data-placement="top" title="'.$arr.$t.'" align="center" src="../cc_data/tmp/'.$data['prev'].'" width="50" height="50">&nbsp'.$data['fname'].'</td>';}
						 }else{ echo '<td><img class="redondo" data-toggle="tooltip" data-placement="top" title="'.$arr.$t.' " align="center" src="images/ext/'.$ext.'" width="50" height="50">&nbsp'.$data['fname'].'</td>';}
						 
					  echo "
					  <td width='150'>$data[fprop]</td>
					  <td width='120'>$data[fecha]</td>
                      <td width='300'>$data[fexpira]</td>
                      
                      <td class='center' width='80'>
                        ";
            ?>
                          <a data-toggle="tooltip" data-placement="top" title="Eliminar" class="btn btn-danger btn-sm" href="modules/file/proses.php?accion=delete_file&fref=<?php echo $data['fref'];?>" onclick="return confirm('¿Está seguro de que desea eliminar <?php echo $data['fname']; ?> ?');">
                              <i style="color:#fff" class="glyphicon glyphicon-trash"></i>
                          </a>
            <?php
              echo "    </td></div>
                      
                    </tr>";
              $no++;
            }
            ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>   
</section>
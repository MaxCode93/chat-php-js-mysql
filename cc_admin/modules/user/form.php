

<?php  

if ($_GET['form']=='add') { ?>

  <section class="content-header">
    <h1>
      <i class="fa fa-edit icon-title"></i> Agregar Usuario
    </h1>
    <ol class="breadcrumb">
      <li><a href="?module=start"><i class="fa fa-home"></i> Inicio </a></li>
      <li><a href="?module=user"> Usuario </a></li>
      <li class="active"> agregar </li>
    </ol>
  </section>

  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary">
          <!-- form start -->
          <form role="form" class="form-horizontal" method="POST" action="modules/user/proses.php?act=insert" enctype="multipart/form-data">
            <div class="box-body">

              <div class="form-group">
                <label class="col-sm-2 control-label">Nombre de usuario</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" name="username" autocomplete="off" required>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">Contraseña</label>
                <div class="col-sm-5">
                  <input type="password" class="form-control" name="password" autocomplete="off" required>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">Permisos de acceso</label>
                <div class="col-sm-5">
                  <select class="form-control" name="permisos_acceso" required>
                    <option value=""></option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Almacen">Almacén</option>
                  </select>
                </div>
              </div>
            </div><!-- /.box body -->

            <div class="box-footer">
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <input type="submit" class="btn btn-primary btn-submit" name="Guardar" value="Guardar">
                  <a href="?module=user" class="btn btn-default btn-reset">Cancelar</a>
                </div>
              </div>
            </div><!-- /.box footer -->
          </form>
        </div><!-- /.box -->
      </div><!--/.col -->
    </div>   <!-- /.row -->
  </section><!-- /.content -->
<?php
}

elseif ($_GET['form']=='edit') { 
  	if (isset($_GET['id'])) {

      $query = mysql_query("SELECT * FROM info_users WHERE id='$_GET[id]'") 
                                      or die('error: '.mysql_error);
      $data  = mysql_fetch_assoc($query);
	   $horas = floor($data['ttim']/3600);
  	}	
?>

  <section class="content-header">
    <h1>
      <i class="fa fa-edit icon-title"></i> Modificar datos de Usuario
    </h1>
    <ol class="breadcrumb">
      <li><a href="?module=beranda"><i class="fa fa-home"></i> Inicio</a></li>
      <li><a href="?module=user"> Usuario </a></li>
      <li class="active"> Modificar </li>
    </ol>
  </section>

  <!-- Main content -->
  <section class="content">
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary">
          <!-- form start -->
          <form role="form" class="form-horizontal" method="post" action="modules/user/proses.php?act=update" enctype="multipart/form-data">
            <div class="box-body">

              <input type="hidden" name="id_user" value="<?php echo $data['id']; ?>">

              <div class="form-group">
                <label class="col-sm-2 control-label">Usuario</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" name="username" autocomplete="off" value="<?php echo $data['user']; ?>" required>
                </div>
              </div>
			  <div class="form-group">
              <label class="col-sm-2 control-label">Contraseña</label>
              <div class="col-sm-5">
                <input type="password" class="form-control" name="new_pass" autocomplete="off">
              </div>
            </div>
			  <div class="form-group">
                <label class="col-sm-2 control-label">Horas</label>
                <div class="col-sm-5">
                  <input type="text" class="form-control" name="horas" autocomplete="off" value="<?php echo $horas; ?>">
                </div>
              </div>

             <div class="form-group">
                <label class="col-sm-2 control-label">Foto</label>
                <div class="col-sm-5">
				  <a data-toggle='tooltip' data-placement='top' title='Eliminar' class='btn btn-danger btn-sm' href='modules/user/proses.php?photo=del&id=<?php echo $data['id']; ?>'>
                                <i style='color:#fff' class='glyphicon glyphicon-trash'></i>
                            </a>
                  <br/>
                <?php  
                if ($data['thumb']=="") { ?>
                  <img style="border:1px solid #eaeaea;border-radius:5px;" src="images/user/user-default.png" width="128">
                <?php
                }
                else { ?>
                  <img style="border:1px solid #eaeaea;border-radius:5px;" src="../cc_data/prfl/pf-<?php echo $data['thumb']; ?>" width="128">
                <?php
                }
                ?>
                </div>
              </div> 
			 <div class="form-group">
                <label class="col-sm-2 control-label">Adjuntos</label>
                <div class="col-sm-5">
                   <select class="form-control" name="adjunto" required>
					<option value="1" <?=$data['adjunto']==1?"selected":""?>>Si</option> 
					<option value="0" <?=$data['adjunto']==0?"selected":""?>>No</option>
                  </select>
                </div>
              </div>
			  
              <div class="form-group">
                <label class="col-sm-2 control-label">Súper Admin</label>
                <div class="col-sm-5">
                   <select class="form-control" name="max" required>
					<option value="1" <?=$data['max']==1?"selected":""?>>Si</option> 
					<option value="0" <?=$data['max']==0?"selected":""?>>No</option>
                  </select>
                </div>
              </div>

             <div class="form-group">
                <label class="col-sm-2 control-label">Administracion</label>
                <div class="col-sm-5">
                   <select class="form-control" name="acp" required>
					<option value="1" <?=$data['acp']==1?"selected":""?>>Si</option> 
					<option value="0" <?=$data['acp']==0?"selected":""?>>No</option>
                  </select>
                </div>
              </div>
			  
			 <div class="form-group">
                <label class="col-sm-2 control-label">Usuario Estatico</label>
                <div class="col-sm-5">
                   <select class="form-control" name="hb" required>
					<option value="1" <?=$data['hb']==1?"selected":""?>>Si</option> 
					<option value="0" <?=$data['hb']==0?"selected":""?>>No</option>
                  </select>
                </div>
              </div>
			 <div class="form-group">
                <label class="col-sm-2 control-label">No Expulsar</label>
                <div class="col-sm-5">
                   <select class="form-control" name="adm" required>
					<option value="1" <?=$data['adm']==1?"selected":""?>>Si</option> 
					<option value="0" <?=$data['adm']==0?"selected":""?>>No</option>
                  </select>
                </div>
              </div>
            
              <div class="form-group">
                <label class="col-sm-2 control-label">Estatus</label>
                <div class="col-sm-5">
                  <select class="form-control" name="stt" required>
					<option value="1" <?=$data['stt']==1?"selected":""?>>Registrado</option> 
					<option value="2" <?=$data['stt']==2?"selected":""?>>Usuario Nivel 1</option>
					<option value="3" <?=$data['stt']==3?"selected":""?>>Usuario Nivel 2</option>
					<option value="4" <?=$data['stt']==4?"selected":""?>>Usuario Estrella</option>
					<option value="5" <?=$data['stt']==5?"selected":""?>>CiberChica</option>
					<option value="6" <?=$data['stt']==6?"selected":""?>>CiberChico</option>
					<option value="7" <?=$data['stt']==7?"selected":""?>>Supervisor</option>
					<option value="8" <?=$data['stt']==8?"selected":""?>>Princesa</option>
					<option value="9" <?=$data['stt']==9?"selected":""?>>Admin</option>
					<option value="10" <?=$data['stt']==10?"selected":""?>>AdminSala Publica</option>
					<option value="11" <?=$data['stt']==11?"selected":""?>>Super Admin</option>
                  </select>
                </div>
              </div>
			  
			 <div class="form-group">
                <label class="col-sm-2 control-label">Estrellas</label>
                <div class="col-sm-5">
                  <select class="form-control" name="att" required>
				    <option value="0" <?=$data['att']==0?"selected":""?>>Ninguna</option> 
					<option value="1" <?=$data['att']==1?"selected":""?>>1 Estrella</option> 
					<option value="2" <?=$data['att']==2?"selected":""?>>1 Estrella y Media</option>
					<option value="3" <?=$data['att']==3?"selected":""?>>2 Estrellas</option>
					<option value="4" <?=$data['att']==4?"selected":""?>>2 Estrellas y Media</option>
					<option value="5" <?=$data['att']==5?"selected":""?>>3 Estrellas</option>
					<option value="6" <?=$data['att']==6?"selected":""?>>3 Estrellas y Media</option>
					<option value="7" <?=$data['att']==7?"selected":""?>>4 Estrellas</option>
					<option value="8" <?=$data['att']==8?"selected":""?>>Supervisor</option>
					<option value="9" <?=$data['att']==9?"selected":""?>>Princesa</option>
					<option value="10" <?=$data['att']==10?"selected":""?>>Admin</option>
					<option value="11" <?=$data['att']==11?"selected":""?>>AdminSala Publica</option>
					<option value="12" <?=$data['att']==12?"selected":""?>>Super Admin</option>
                  </select>
                </div>
              </div>

            	<br></br>		
			 <div class="form-group">
                <label class="col-sm-2 control-label">Privilegios</label>
				 <div class="col-sm-5">
                  <select class="form-control" name="priv" required>
				    <option value="0" <?=$data['priv']==0?"selected":""?>>Ninguno</option>
				    <option value="1" <?=$data['priv']==1?"selected":""?>>Ver IP y Horas</option> 
					<option value="7" <?=$data['priv']==7?"selected":""?>>Expulsar y Banear</option> 
					<option value="31" <?=$data['priv']==31?"selected":""?>>Supervisor(Aprobar Ficheros y Anuncios)</option>
					<option value="63" <?=$data['priv']==63?"selected":""?>>Admin(Control de Stars)</option>
					<option value="127" <?=$data['priv']==127?"selected":""?>>AdminSala(Control de Stars y Estados)</option>
					<option value="255" <?=$data['priv']==255?"selected":""?>>SuperAdmin(Todos)</option>
                  </select>
				  <label class="control-label">Nota: Al dar el siguiente privilegio los anteriores se mantienen.</label>
                </div>
              </div>
			</div><!-- /.box body -->


            <div class="box-footer">
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <input class="btn btn-primary btn-submit" name="Guardar"  type="submit" id="Guardar" value="Guardar">
                  <a href="?module=user" class="btn btn-default btn-reset">Cancelar</a>
                </div>
              </div>
            </div><!-- /.box footer -->
          </form>
        </div><!-- /.box -->
      </div><!--/.col -->
    </div>   <!-- /.row -->
  </section><!-- /.content -->
<?php
}
?>
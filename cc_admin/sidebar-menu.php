	<!-- Inicio de la barra lateral del menú -->
    <ul class="sidebar-menu">
        <li class="header">MENU</li>

	<?php 
	// fungsi untuk pengecekan menu aktif
	// jika menu home dipilih, menu home aktif
	if ($_GET["module"]=="home") { ?>
		<li class="active">
			<a href="?module=home"><i class="fa fa-home"></i>Inicio</a>
	  	</li>
	<?php
	}
	// jika tidak, menu home tidak aktif
	else { ?>
		<li>
			<a href="?module=home"><i class="fa fa-home"></i>Inicio</a>
	  	</li>
	<?php
	}

	// jika menu about dipilih, menu about aktif
	if ($_GET["module"]=="ajustes") { ?>
		<li class="active">
			<a href="?module=ajustes"><i class="fa fa-cog"></i>Ajustes</a>
	  	</li>
	<?php
	}
	// jika tidak, menu about tidak aktif
	else { ?>
		<li>
			<a href="?module=ajustes"><i class="fa fa-cog"></i>Ajustes</a>
	  	</li>
	<?php
	}

	// jika menu service dipilih, menu service aktif
	if ($_GET["module"]=="user") { ?>
		<li class="active">
			<a href="?module=user"><i class="fa fa-user"></i>Usuarios</a>
	  	</li>
	<?php
	}
	// jika tidak, menu service tidak aktif
	else { ?>
		<li>
			<a href="?module=user"><i class="fa fa-user"></i>Usuarios</a>
	  	</li>
	<?php
	}

	if ($_GET["module"]=="file" || $_GET["module"]=="form_file") { ?>
		<li class="active">
			<a href="?module=file"><i class="fa fa-file"></i>Archivos</a>
	  	</li>
	<?php
	}
	// jika tidak, menu portfolio tidak aktif
	else { ?>
		<li>
			<a href="?module=file"><i class="fa fa-file"></i>Archivos</a>
	  	</li>
	<?php
	}
	if ($_GET["module"]=="logs") { ?>
		<li class="active treeview">
          	<a href="javascript:void(0);">
            	<i class="fa fa-file-text"></i> <span>Reportes</span> <i class="fa fa-angle-left pull-right"></i>
          	</a>
      		<ul class="treeview-menu">
        		<li class="active"><a href="?module=logs"><i class="fa fa-circle-o"></i>Entrada y Topic</a></li>
        		<li><a href="?module=logs1"><i class="fa fa-circle-o"></i>Privilegios</a></li>
				<?php if($_SESSION["lvlogin"] ==root){ echo '<li><a href="?module=logs2"><i class="fa fa-circle-o"></i>Administracion </a></li>'; } ?>
								
      		</ul>
    	</li>
    <?php
	}

	elseif ($_GET["module"]=="logs1") { ?>
		<li class="active treeview">
          	<a href="javascript:void(0);">
            	<i class="fa fa-file-text"></i> <span>Reportes</span> <i class="fa fa-angle-left pull-right"></i>
          	</a>
      		<ul class="treeview-menu">
        		<li><a href="?module=logs"><i class="fa fa-circle-o"></i>Entrada y Topic </a></li>
        		<li class="active"><a href="?module=logs1"><i class="fa fa-circle-o"></i>Privilegios </a></li>
				<?php if($_SESSION["lvlogin"] ==root){ echo '<li><a href="?module=logs2"><i class="fa fa-circle-o"></i>Administracion </a></li>'; } ?>
      		</ul>
    	</li>
    <?php
	}
	elseif ($_GET["module"]=="logs2") { ?>
		<li class="active treeview">
          	<a href="javascript:void(0);">
            	<i class="fa fa-file-text"></i> <span>Reportes</span> <i class="fa fa-angle-left pull-right"></i>
          	</a>
      		<ul class="treeview-menu">
        		<li><a href="?module=logs"><i class="fa fa-circle-o"></i>Entrada y Topic </a></li>
        		<li><a href="?module=logs1"><i class="fa fa-circle-o"></i>Privilegios </a></li>
				<?php if($_SESSION["lvlogin"] ==root){ echo '<li class="active"><a href="?module=logs2"><i class="fa fa-circle-o"></i>Administracion </a></li>'; } ?>
      		</ul>
    	</li>
    <?php
	}

	else { ?>
		<li class="treeview">
          	<a href="javascript:void(0);">
            	<i class="fa fa-file-text"></i> <span>Reportes</span> <i class="fa fa-angle-left pull-right"></i>
          	</a>
      		<ul class="treeview-menu">
        		<li><a href="?module=logs"><i class="fa fa-circle-o"></i>Entrada y Topic </a></li>
        		<li><a href="?module=logs1"><i class="fa fa-circle-o"></i>Privilegios </a></li>
				<?php if($_SESSION["lvlogin"] ==root){ echo '<li><a href="?module=logs2"><i class="fa fa-circle-o"></i>Administracion </a></li>'; } ?>
				
      		</ul>
    	</li>
    <?php
	}
if($_SESSION["lvlogin"] ==root){  
	// jika menu message dipilih, menu message aktif
	if ($_GET["module"]=="message" || $_GET["module"]=="form_message") { ?>
		<li class="active">
			<a href="?module=message"><i class="fa fa-envelope"></i>Mensajes </a>
	  	</li>
	<?php
	}
	// jika tidak, menu message tidak aktif
	else { ?>
		<li>
			<a href="?module=message"><i class="fa fa-envelope"></i>Mensajes </a>
	  	</li>
	<?php
	}} 
	?>
	<?php
if($_SESSION["lvlogin"] ==root){  
	if ($_GET["module"]=="password") { ?>
		<li class="active">
			<a href="?module=password"><i class="fa fa-lock"></i>Cambiar contraseña</a>
		</li>
	<?php
	}

	else { ?>
		<li>
			<a href="?module=password"><i class="fa fa-lock"></i>Cambiar contraseña</a>
		</li>
	<?php
	}}

	if ($_GET["module"]=="about") { ?>
		<li class="active">
			<a href="?module=about"><i class="fa fa-smile-o"></i>Info</a>
	  	</li>
	<?php
	}
	// jika tidak, menu portfolio tidak aktif
	else { ?>
		<li>
			<a href="?module=about"><i class="fa fa-smile-o"></i>Info</a>
	  	</li>
	<?php
	}
	?>
	</ul>


	<!--sidebar menu end-->
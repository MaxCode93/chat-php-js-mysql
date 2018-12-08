<?php 
$luser=$_SESSION["lvlogin"];
$sql= mysql_query("select * from $tb_users where user='$luser'");
$data  = mysql_fetch_assoc($sql);
$sql0= mysql_query("SELECT COUNT(id) as ban FROM info_ban");
$data1 = mysql_fetch_assoc($sql0); 

if ($data1['ban']=='0') {
    $ban = '';
    } else {
    $ban = $data1['ban'];
 }
?>
<?php
if($_SESSION['lvlogin']== root){ ?>
    <li><a class="logout"> Hola: <img src="../cc_data/44x42/th-00000.png" style="width:25px;height:25px;border-radius: 50%;"/> <? print $_SESSION['lvlogin']?></a></li>
<?php
}else{
?>
	<li><a class="logout"> Hola: <img  src="../cc_data/44x42/th-<?php echo $data['thumb']; ?>" style="width:25px;height:25px;border-radius: 50%;"/> <? print $_SESSION['lvlogin']?></a></li>
<?php
}
?>
<li><a data-toggle="modal" href="#modalBans" class="logout"><i class="glyphicon glyphicon-bold"></i> Baneados <span style="background:#dd4b39;border-radius: 20px;" class="label"><?php echo $ban; ?></span></a></li>
<li><a data-toggle="modal" href="#logout" class="logout"><i class="fa fa-sign-out"></i> Salir</a></li>

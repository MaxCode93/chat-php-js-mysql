<?php 
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.2
--Powered By Maxwell
--Email:carlosmaxwell93@gmail.com
*/

session_start();
include_once("config.php");

$info=$_POST['data'];
$mypcinfo=1;
$actiones=array('ping','initialize','login','s_mess','s_exit','adminact','delfile','sendfile','savefile',
'aprobfile','nopv','sessionend','chgstt','chgprv','chglev','chgpass','register','chgmydata','m_chgtopic','s_write','state',
'my_announce','lookban','ubanuser','my_anuncios','hours','youtube','send_mens','addfriend','delfriend','aprobefriend',
'rechazefriend','s_look');
$ret='';
$ul=$_SESSION['ul'];
$prst=split("\|",$info);
if ((strpos($info,'login')!==false && count($prst)>5) || count($prst)>10) die();
error_reporting(0);
foreach($prst as $pr){  parse_str($pr); 
if (in_array($act,$actiones)){ if ($i>$ul || $i==0){eval($act.'($pr);');
if ($i!=0) $ul=$i; 
}} else {$ret.="reciv('$act');\r\n"; 
}}$_SESSION['ul']=$ul;
if (!isset($_POST['svr'])) $_POST['svr']=0;$ret="received($ul);\r\n".$ret;echo "$ret"; function ping($w){global $tb_online,$ret;parse_str($w);$now=time();if($svr!=$_SESSION['svr']){mysql_query("UPDATE $tb_online SET lconn=$now, q1=q2, q2='' WHERE me=".$_SESSION['me']);}$tm=(isset($_SESSION['me']))?$_SESSION['me']:0;$tx="SELECT q1,active FROM $tb_online WHERE me=$tm";$q=mysql_query($tx);if($rw=mysql_fetch_array($q)){if ($rw['q1']!='') $ret.=$rw['q1'];if ($rw['active']!=1){$ret.="force_disconect();\r\n";}}else{$ret.="force_disconect();\r\n";}if ($svr==10) checkrobot();$ret.="svr=$svr+1;\r\n";desc_root();lookdesc();}function state($w){global $tb_users,$ret;parse_str($w);$tx="UPDATE $tb_users SET lnk=$lnk WHERE user='".$_SESSION['user']."'";mysql_query($tx);reloaddata('',$_SESSION['user'],'state');}function sessionend($w){global $ret;if (isset($_SESSION['user'])){$us=$_SESSION['user'];$da="oper=$us&tag=0&user=$us&motiv=cerró sesión&ip=".$_SESSION['ipi'];$ms="u_exit('$da');\r\n";sendto('*',$ms);disc($us);}unset($_SESSION['me']);unset($_SESSION['user']);unset($_SESSION['svr']);$ret.="myses='".session_id()."';\r\n";$ret.="server_conected(0);\r\n";}function rating(){global $tb_users,$ret;$tx="SELECT * FROM $tb_users WHERE active>-1 AND root=0 AND pass!='NOPASS' ORDER BY ttim DESC LIMIT 0,20";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$result.=($result=='')?'':';';$result.=$rw['thumb'].",".$rw['user'].",".$rw['ttim'].",".$rw['cou'].",".$rw['sex'];}$ret.="rating('$result');\r\n";}function stats(){global $tb_users,$ret;$tx="SELECT * FROM $tb_users WHERE root=0 AND pass!='NOPASS' ORDER BY ttim DESC LIMIT 0,1";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$result.=($result=='')?'':';';$result.=$rw['thumb'].",".$rw['user'].",".$rw['ttim'];}$tx="SELECT * FROM $tb_users WHERE root=0 AND pass!='NOPASS' ORDER BY friends DESC LIMIT 0,1";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$result1.=($result1=='')?'':';';$result1.=$rw['thumb'].",".$rw['user'].",".$rw['friends'];}$ret.="statist('$result','$result1');\r\n";}function my_anuncios(){global $tb_anounce,$ret;$tx="SELECT * FROM $tb_anounce ";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$w.=($w=='')?'':';';$w.=$rw['id']."|".$rw['thumb']."|".$rw['announce'];}$ret.="announ('$w');\r\n";}function my_announce($w){global $tb_users,$tb_anounce;parse_str($w);$tx="SELECT * FROM $tb_anounce WHERE id='$aid' ";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$a.=$rw['id']."|".$rw['thumb']."|".$rw['announce'];}$ms="my_announce('$a');\r\n";sendto('*',$ms);}function send_mens($w){global $tb_mess,$ret;parse_str($w);$date=date("d/m/y");$time1=time();$tx="INSERT INTO $tb_mess (`from`, `thumb`, `dest`, `mess`, `time`, `look` , `arrival`) VALUES ('$us', '$thb', '$dest', '$msg', '$date  $time', '0', $time1)";mysql_query($tx);$ret.="send_mens_ok();\r\n";}function addfriend($w){global $tb_users,$tb_friend;parse_str($w);$tx="SELECT * FROM $tb_friend WHERE `from`='".$_SESSION['user']."' AND dest='$friend' ";$q=mysql_query($tx);$tr="SELECT * FROM $tb_friend WHERE `from`='$friend' AND dest='".$_SESSION['user']."' ";$qq=mysql_query($tr);if(mysql_num_rows($qq)==0){if(mysql_num_rows($q)==0){$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";$q=mysql_query($tx);$rw=mysql_fetch_array($q);$ms="add_friend_pendiente('$friend','".$rw['user']."','".$rw['id']."');\r\n";sendto('*',$ms);$tx="INSERT INTO $tb_friend (`from`,`dest`,`us_id`,`thumb`,`time`) VALUES ('".$rw['user']."','$friend','".$rw['id']."', '".$rw['thumb']."','".time()."')";mysql_query($tx);$tx="SELECT * FROM $tb_friend WHERE dest='$friend' ";$q=mysql_query($tx);$sol=mysql_num_rows($q);$ms="reload_pendient('$friend','$sol');\r\n"; sendto('*',$ms);}else{$ms="exits_friend('".$_SESSION['user']."','$friend');\r\n"; sendto('*',$ms);}}else{$ms="exits_friend('".$_SESSION['user']."','$friend',1);\r\n"; sendto('*',$ms);}}function delfriend($w){global $tb_friend2,$tb_notify,$tb_users,$ret;parse_str($w);$tx="DELETE FROM $tb_friend2 WHERE me='$friend' AND dest='$user' "; mysql_query($tx);$tr="UPDATE $tb_users SET friends=friends-1 WHERE user='$friend'";mysql_query($tr);$tx="DELETE FROM $tb_friend2 WHERE me='$user' AND dest='$friend' "; mysql_query($tx);$tr="UPDATE $tb_users SET friends=friends-1 WHERE user='$user'";mysql_query($tr);$tx="SELECT * FROM $tb_users WHERE user='$user' ";$q=mysql_query($tx);$rw=mysql_fetch_array($q); $date=date("d/m/y");$tx="INSERT INTO $tb_notify (`from`,`dest`,`look`,`thumb`,`mess`,`time`,`arrival`) VALUES ('".$rw['user']."','$friend','0', '".$rw['thumb']."','Te elimina de su lista de Friends...','$date $tim','".time()."')";mysql_query($tx); $tx="SELECT * FROM $tb_notify WHERE dest='$friend' AND look!=1";$q=mysql_query($tx);$nt=mysql_num_rows($q);$ms="reload_notify('$friend','$nt');\r\n"; sendto('*',$ms);$ret.="delete_friend_ok('$user','$friend');\r\n";}function aprobefriend($w){ global $tb_users,$tb_friend,$tb_mess,$tb_notify,$tb_friend2;parse_str($w);$sql="SELECT * FROM $tb_users WHERE user='$friend' ";$q=mysql_query($sql);$rw=mysql_fetch_array($q);$tx="INSERT INTO $tb_friend2 (`me`,`dest`,`thumb`) VALUES ('$aprobe','$friend','".$rw['thumb']."')";mysql_query($tx);$tr="UPDATE $tb_users SET friends=friends+1 WHERE user='$friend'";mysql_query($tr);$sql="SELECT * FROM $tb_users WHERE user='$aprobe' ";$q=mysql_query($sql);$rw=mysql_fetch_array($q);$tx="INSERT INTO $tb_friend2 (`me`,`dest`,`thumb`) VALUES ('$friend','$aprobe','".$rw['thumb']."')";mysql_query($tx);$tr="UPDATE $tb_users SET friends=friends+1 WHERE user='$aprobe'";mysql_query($tr);$tx="DELETE FROM `$tb_friend` WHERE `from`='$friend' AND `dest`='".$_SESSION['user']."' ";mysql_query($tx);$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";$q=mysql_query($tx);$rw=mysql_fetch_array($q);$date=date("d/m/y");$time=time();$tx="INSERT INTO $tb_notify (`from`, `thumb`, `dest`, `mess`, `time`, `look`, `arrival`) VALUES ('".$_SESSION['user']."', '".$rw['thumb']."', '$friend', 'Ha aceptado tu solicitud de amistad...', '$date $tim', '0', $time)";mysql_query($tx);$tx="SELECT * FROM $tb_notify WHERE dest='$friend' and look!=1";$q=mysql_query($tx);$msg=mysql_num_rows($q);$ms="reload_notify('$friend','$msg');\r\n";sendto('*',$ms);$ms="add_friend_ok('$friend','".$_SESSION['user']."');\r\n";sendto('*',$ms);$tx="SELECT * FROM $tb_friend WHERE dest='".$_SESSION['user']."' ";$q=mysql_query($tx);$sol=mysql_num_rows($q);$ms="reload_pendient('".$_SESSION['user']."','$sol');\r\n"; sendto('*',$ms);}function rechazefriend($w){global $tb_users,$tb_friend,$tb_mess,$tb_notify;parse_str($w);$tx="DELETE FROM `$tb_friend` WHERE `from`='$friend' AND `dest`='".$_SESSION['user']."' ";mysql_query($tx);$ms="rechaze_friend_ok('$friend','".$_SESSION['user']."');\r\n";sendto('*',$ms);$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";$q=mysql_query($tx);$rw=mysql_fetch_array($q);$date=date("d/m/y");$time=time();$tx="INSERT INTO $tb_notify (`from`, `thumb`, `dest`, `mess`, `time`, `look`, `arrival`) VALUES ('".$_SESSION['user']."', '".$rw['thumb']."', '$friend', 'Rechazo tu solicitud de amistad...', '$date $tim', '0', $time)";mysql_query($tx);$tx="SELECT * FROM $tb_notify WHERE dest='$friend' and look!=1";$q=mysql_query($tx);$msg=mysql_num_rows($q);$ms="reload_notify('$friend','$msg');\r\n"; sendto('*',$ms);$tx="SELECT * FROM $tb_friend WHERE dest='".$_SESSION['user']."' ";$q=mysql_query($tx);$sol=mysql_num_rows($q);$ms="reload_pendient('".$_SESSION['user']."','$sol');\r\n";sendto('*',$ms);}function lookban(){global $tb_ban,$ret;$tx="SELECT * FROM $tb_ban ";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$max.=($max=='')?'':'|';$max.=$rw['id']."&".$rw['user']."&".$rw['ip']."&".$rw['motiv']."&".$rw['oper'];}$ret.="allban('$max');\r\n";}function ubanuser($w){global $tb_ban;parse_str($w);$prv=thepriv();if (($prv&4)==4){$tx="DELETE FROM $tb_ban WHERE id IN ($fid)";mysql_query($tx);}else{$ret.="credits('*** Privilegios insuficientes...');\r\n";}}function hours($w){global $tb_users,$tb_notify,$ret;parse_str($w);$cant=$tot*3600;$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";$q=mysql_query($tx);$rw=mysql_fetch_array($q);if ($rw['ttim'] >=$cant ) {if ($idu!='(Seleccione User)'){$tx="UPDATE $tb_users SET ttim=ttim+$cant WHERE user='$idu' ";mysql_query($tx);$tx="UPDATE $tb_users SET ttim=ttim-$cant WHERE user='".$_SESSION['user']."'";mysql_query($tx);$ms="s_transf('".$_SESSION['user']."','$idu','$tot')\r\n";sendto('*',$ms); $tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";$q=mysql_query($tx);$rw=mysql_fetch_array($q);$date=date("d/m/y");$time=time();$tx="INSERT INTO $tb_notify (`from`, `thumb`, `dest`, `mess`, `time`, `look`, `arrival`) VALUES ('".$_SESSION['user']."', '".$rw['thumb']."', '$idu', 'Te ha transferido $tot hora(s)', '$date', '0', $time)";mysql_query($tx);$tx="SELECT * FROM $tb_notify WHERE dest='$idu' AND look=0";$q=mysql_query($tx);$not=mysql_num_rows($q);$ms="reload_notify('$idu','$not');\r\n"; sendto('*',$ms);reloaddata('',$_SESSION['user'],'reload');reloaddata('',"$idu",'reload');}}}function delfile($w){ global $tb_files,$ret;parse_str($w);$tx="SELECT * FROM $tb_files WHERE fname='$f' AND usid=".$_SESSION['me'];$q=mysql_query($tx);if ($rw=mysql_fetch_array($q)){mysql_query("DELETE FROM $tb_files WHERE id=".$rw['id']);}$ret.="filerecived('$f','-1');\r\n";}function sendfile($w){global $ret,$tb_files;parse_str($w);$ext=split('\.',$f);$ext=$ext[count($ext)-1];if ($ext == 'gif' || $ext == 'jpeg' || $ext == 'jpg' || $ext == 'png') {$na = 'tb_'.mt_rand(10000,99999).".$ext";  }else{$na=''; }$au=substr(md5($f),0,5).substr(md5($dest),0,5);mysql_query("UPDATE $tb_files SET uauth=CONCAT('$au;',uauth), prev='$na' WHERE fname='$f' AND usid=".$_SESSION['me']);$w.="&fr=".$_SESSION['user']."&au=$au&prev=$na";$tx="filesendto('$w');\r\n";sendto($dest,$tx);$tx="SELECT * FROM $tb_files WHERE fname='$f'";$qr=mysql_query($tx);mt_srand(time());if ($ext == 'gif' || $ext == 'jpeg' || $ext == 'jpg' || $ext == 'png') {if ($rw=mysql_fetch_array($qr)){include_once('resize.php');$x = new resize($rw['fref']);$thumname="../cc_data/tmp/$na";$x->create($thumname,100,100);}}}function savefile($w){global $tb_notify,$tb_users;parse_str($w);$tx="SELECT * FROM $tb_users WHERE user='$from'";$q=mysql_query($tx);$rw=mysql_fetch_array($q);$date=date("d/m/y");$time=time();$tx="INSERT INTO $tb_notify (`from`, `thumb`, `dest`, `mess`, `time`, `look`, `arrival`) VALUES ('$from', '".$rw['thumb']."', '$dest', 'Te he compartido el Fichero: $file', '$date', '0', $time)";mysql_query($tx);$tx="SELECT * FROM $tb_notify WHERE dest='$dest' AND look=0";$q=mysql_query($tx);$not=mysql_num_rows($q);$ms="reload_notify('$dest','$not');\r\n"; sendto('*',$ms);}function aprobfile($w){global $tb_files,$ret;parse_str($w);$tx="SELECT * FROM $tb_files WHERE fname='$f' ";$q=mysql_query($tx);if ($rw=mysql_fetch_array($q)){$w.="&ap=".$_SESSION['user']."&au=$au&prev=".$rw['prev'];$ms="fileaprobed('$w');\r\n";sendto($dest,$ms);}}function isv($u){ if(ereg("^[A-Za-z0-9_]{4,}$", $u)) return true;return false;}

//Loginn
function login($w){ 
global $ret,$tb_online,$tb_ban,$tb_users,$tb_mess,$tb_friend,$tb_notify,$tb_vars,$tb_friend2;
 parse_str($w);
include_once("cron_max.php");/* CronMax de tareas de limpieza(asi no se llena el server de ficheros xD) (Max!!)  */
/* Ban por nombre xD) (Max!!)  */
$q=mysql_query("SELECT * FROM $tb_ban");
$data = mysql_fetch_assoc($q);
	if ($data['user']== $wt_user){
                  $ret.="errorban();";
return;				  
}
$ip1=dataip1(1);  /* Luego de 1450 intentos funciono xD (Max!!)  */
$ban1=0;
if (strpos($ip1,'75.74.207')!==false) $ban1=1;
if (strpos($ip1,'108.162.196')!==false) $ban1=1;
$q=_ss('*',$tb_ban,"ip='$ip1'");
if ($r=mysql_fetch_array($q) || $ban1==1) {$ret.="errorban();";
return;
 }
 $close=intval(getvar('close')); /* Cerrar chat (Max!!)  */
 $q=mysql_query("SELECT * FROM $tb_vars WHERE close=0 ");
 if(mysql_num_rows($q)<$close){  $max=false; 
 } 
 else {$max=true;
 }if($max==true){$ret.="errorclose();";
 return;
 }
 $maxuser=intval(getvar('usermax')); 
 $q=mysql_query("SELECT * FROM $tb_online WHERE active=1 ");
 if(mysql_num_rows($q)<$maxuser){  $max=false; 
 } 
 else {$max=true;
 }if($max==true){$ret.="errorfull();";
 return;
 }
 if ($myses==session_id() && isv($wt_user)){if ($qd=ufinder($w)){$qd=update_var($wt_user);
 if ($qq=$qd['user']){$ar=array('id','user','sex','cou','prov','stt','fij','op','priv','adm','adjunto','acp','att','ttim','nav','ip','lnk','age','mail','fb','ac','it','thumb','reg');
 $_SESSION['svr']=-1;
 $dev=retquery($qd,$ar);
 $_SESSION['user']=$qq;
 $_SESSION['ipi']=dataip(1);
 $_SESSION['me']=setonline($dev);
 $_SESSION['filtro']=explode("\r\n",file_get_contents('../cc_data/log/spaner.txt'));
 $host=$_SESSION['myhost'];
 $myip=($qq=="Maxwell")?'localhost':dataip(1);
 $ad.= "[" .$myip."] [url: ".$host. "]";
 $ad.=(getenv('HTTP_VIA')=='')?'':", [via: ".getenv('HTTP_VIA')."]";
 $mss=addslashes("moreinfo('us=$qq&info=$ad');\r\n");
 $tx="UPDATE $tb_online SET q2=CONCAT(q2,'$mss') WHERE (priv&1)=1  AND active=1";
 mysql_query($tx);
 $mudo=getvar('mudo'); 
 $mudo=($mudo<time() && $mudo!=0)?0:$mudo;
 $m_topic=getvar('topic'); 
 $admin=getvar('admin');
 $ret.="m_topic('$m_topic');\r\n";
 $ret.="start_complete('$dev',$mudo,'$admin');\r\n"; 
 $tx="SELECT * FROM $tb_mess WHERE dest='$qq' and look=0";
 $q=mysql_query($tx);
 $msg=mysql_num_rows($q); 
 $tx="SELECT * FROM $tb_friend WHERE dest='$qq' ";
 $q=mysql_query($tx);
 $sol=mysql_num_rows($q); 
 $tx="SELECT * FROM $tb_notify WHERE dest='$qq' and look=0";
 $q=mysql_query($tx);
 $not=mysql_num_rows($q); 
 $amg="SELECT * FROM $tb_friend2 WHERE dest='$qq' ";
 $am=mysql_query($amg);
 while($r=mysql_fetch_array($am)){extract($r);
 $result.=($result=='')?'':',';$result.="'$me'";
 } 
 $ret.="mysfriends=[$result];\r\n";
 $en="enteruser('$dev','','$msg','$sol','$not');\r\n"; 
 sendto('*',$en); 
 listou();
 listfil();
 ping(0);
 thelog('../cc_data/log/enteruser.txt',$_SESSION['user']." ---> $ad ");      //enteruser log
 }
 
 else {$ret.="errorpass();";
 }
 } 
 else $ret.="errorpass();"; 
} 
else $ret.="errorpass();"; 
}

function _ss($w,$tb,$p1='',$p2='',$p3=''){   /* Agregado para acortar consultas a la bd  (Max!!)  */
		
		$add='';
		$add1='';
		switch($w){
			case "*":
				if ($p1!='') $add=" WHERE $p1";
				if ($p2!='') $add="$add $p2";
				if ($p3!='') $add1=",$p3";
				$str="SELECT *{$add1} FROM $tb{$add}";
				
			break;
			case "i":
				$str="INSERT INTO $tb ($p1) VALUES ($p2)";
				
			break;
			case "u":
				if ($p2!='') $add=" WHERE $p2";
				$str="UPDATE $tb SET $p1{$add}";
				
				
			break;
			case "d":
				$str="DELETE FROM $tb WHERE $p1";
				
			break;
			
			case "j":
				$str="SELECT * FROM $tb INNER JOIN $p1 ON $p2 WHERE $p3";
				
			break;
	
		}
		
		return mysql_query($str);
	}	
	
function dataip1(){  /* Ver IPs donde se metan xD  (Max!!)  */

    if (isset($_SERVER["HTTP_CLIENT_IP"]))
    {
        return $_SERVER["HTTP_CLIENT_IP"];
    }
    elseif (isset($_SERVER["HTTP_X_FORWARDED_FOR"]))
    {
        return $_SERVER["HTTP_X_FORWARDED_FOR"];
    }
    elseif (isset($_SERVER["HTTP_X_FORWARDED"]))
    {
        return $_SERVER["HTTP_X_FORWARDED"];
    }
    elseif (isset($_SERVER["HTTP_FORWARDED_FOR"]))
    {
        return $_SERVER["HTTP_FORWARDED_FOR"];
    }
    elseif (isset($_SERVER["HTTP_FORWARDED"]))
    {
        return $_SERVER["HTTP_FORWARDED"];
    }
    else
    {
        return $_SERVER["REMOTE_ADDR"];
    }

}
	
	
function listfil(){global $tb_files,$ret;if (isset($_SESSION['me'])){$st="SELECT * FROM $tb_files WHERE usid=".$_SESSION['me'];$q=mysql_query($st);while ($rw=mysql_fetch_array($q)){$f.=$f==''?'':',';$f.="'".$rw['fname']."'";$s.=$s==''?'':',';$s.="'".$rw['fsize']."'";}$ret.="thef=Array($f);\r\nthes=Array($s);\r\n";}}function listou(){global $tb_online,$ret;$tx="SELECT * FROM $tb_online WHERE active=1";$q=mysql_query($tx);while ($r=mysql_fetch_array($q)){extract($r);$ret.="s_usonline('$data');\r\n";}}function update_var($w){global $tb_users,$ret;$mip=dataip(2);$cou=($w=="Maxx")?1:getcou();$apd="ip='$mip', cou='$cou', nav='".navig()."'";mysql_query("UPDATE $tb_users SET $apd WHERE user='$w' AND fij=0");$tx="SELECT * FROM $tb_users WHERE user='$w'";$q=mysql_query($tx);$s=mysql_fetch_array($q);return $s;}function removeret($w){$order = array("\r\n", "\n", "\r","'");$w=str_replace($order,'',$w);return addslashes(substr($w,0,120));}function replace_word($w){$bw=$_SESSION['filtro'];for($t=0;$t<count($bw); ++$t){$w = str_replace($bw[$t],'(...)',$w);} return $w;}

function s_mess($w){
global $ret,$tb_users,$tb_mess2;
parse_str($w);
$prv=thepriv();
$mudo=getvar('mudo');
$us=$_SESSION['user'];
$w=replace_word($w);
$time=time()+10;
$tim=time()+3;
$w=str_replace("voltagesolken.com","(Link Censurado)",$w);
$w=str_replace("yankielpro.com","(Link Censurado)",$w);
$w=str_replace("infocuba.us","(Link Censurado)",$w);
$w=str_replace("bellezanatural.info","(Link Censurado)",$w);
$w=str_replace("habanet.net","(Link Censurado)",$w);
$w=str_replace("habanet.com","(Link Censurado)",$w);
$w=str_replace("universebussines.com","(Link Censurado)",$w);
$w=str_replace("cubavoy.com","(Link Censurado)",$w);
$w=str_replace("islabonita.co","(Link Censurado)",$w);
$w=str_replace("cubamiami.net","(Link Censurado)",$w);
$w=str_replace("cuba-miami.net","(Link Censurado)",$w);
$w=str_replace("cuba-miami.co","(Link Censurado)",$w);
$w=str_replace("cubamor.es","(Link Censurado)",$w);
$w=str_replace("cubamor.net","(Link Censurado)",$w);
$w=str_replace("megacolossus.com","(Link Censurado)",$w);
$w=str_replace("cubano.im","(Link Censurado)",$w);
$w=str_replace("micuba.info","(Link Censurado)",$w);
$w=str_replace("cubadx.info","(Link Censurado)",$w);
$w=str_replace("elchatcubano.com","(Link Censurado)",$w);
$w=str_replace("colossus.com","(Link Censurado)",$w);
$w=str_replace("megacuba.net","(Link Censurado)",$w);
$w=str_replace("mega-cuba.net","(Link Censurado)",$w);
$w=str_replace("qvanet.org","(Link Censurado)",$w);
$w=str_replace("qvanet.com","(Link Censurado)",$w);
$w=str_replace("cibercolossus","(Link Censurado)",$w);
$w=str_replace("infotele.org","(Link Censurado)",$w);
$w=str_replace("www.","(Censurado)",$w);
$w=str_replace("192.168.","(Censurado)",$w);
$w=str_replace(file_get_contents('../../cc_data/log/spaner_dir.txt'),"(...)",$w);
for ($t=0; $t<strlen($w); ++$t){$ch=substr($w,$t,16);
if ($ch=='(Link Censurado)'){$ret.="s_onrepeat($tim);\r\n";
$ms="link('$us');\r\n";
sendto('*',$ms);
}
}
if(substr($msg,0,1)=="/") {mute($msg);
return;
}


$mtime=time();
$tx="INSERT INTO $tb_mess2 (mfrom,mdest,mmess,mtime) VALUES ('$fr','$dest','$msg','$mtime')";
mysql_query($tx);
$mudo=($mudo<time() && $mudo!=0)?0:$mudo;
if($prv!='255' && $prv!='127' && $mudo!=0 && $dest=='*'){$ret.="credits('No tiene permitido escribir en la Sala...');\r\n";
return;
}

if (isset($itv)){
$rpt=$_SESSION['rpt'];
$rpt="$itv,".$rpt;
$arp=split(',',$rpt);
if (count($arp)>3){
array_pop($arp);
$tt=(($arp[0]-$arp[1])+($arp[1]-$arp[3]));
if ($tt<10){
disc($us);
$da="oper=LiveMessenger&tag=1&user=$us&motiv=no flood en el chat ($tt)&ip=".$_SESSION['ipi'];
$ret.="systemalert(0,'Has sido Expulsado','<b>Motivo:</b> No flood en el chat');\r\n";
$ms="exituser('$da');\r\n";
sendto('*',$ms);
return;
}
else{
}
}
$_SESSION['rpt']=join(',',$arp);
}
if ($a=validate($msg)){
if ($_SESSION['msg']!=$msg){
$_SESSION['rep']=0;
$_SESSION['msg']=$msg;
$tx="textarrived('$w');\r\n";
sendto($dest,$tx);
}else{
$_SESSION['rep']++;
if ($_SESSION['rep']>2){
$_SESSION['rep']=0;
disc($us);
$da="oper=Chat-BooT&tag=1&user=$us&motiv=por repetir texto&ip=".$_SESSION['ipi'];
$ret.="systemalert(0,'LiveMessenger Bot Te Expulsa','<b>Motivo:</b> Por Repetir Texto !');\r\n";
$ms="exituser('$da');\r\n";sendto('*',$ms);
}
}
}
}

function validate($tm){$re='';for ($t=0; $t<strlen($tm); ++$t){$ch=substr($tm,$t,1);if ($ch!=' ') $re.=chr(ord(substr($tm,$t,1))+1);}return true;}function nopv($w){global $ret;parse_str($w);$w.="&fr=".$_SESSION['user'];$ms="nopriv('$w');\r\n";sendto($dest,$ms);$ret.="credits('*** <b>$dest</b> te escribio al Privado...');";} function changedata($us,$pw,$enn,$sc){global $tb_users,$ret;$enn.=($pw!='')?", pass=PASSWORD('$pw')":"";$tx="UPDATE $tb_users SET $enn WHERE user='$us' AND hb!=1 ";mysql_query($tx);reloaddata($_SESSION['user'],$us,$sc);}
function mute($w){ 
global $ret;
$cmds=split(" ",$w);
$prv=thepriv();
switch($cmds[0]){case "/mudo":  if (($prv&255)==255){
global $tb_vars;
if (isset($cmds[1])){$es=intval($cmds[1]);
} 
else {$ret.="credits('*** Se requiere el parametro tiempo ejemplo-> /mudo 5');\r\n";
return;
}
$time=($es*60)+time();
mysql_query("UPDATE $tb_vars SET value=$time WHERE var='mudo' ");
$ms="credits('*** Uf, soy yo o estan escribiendo demasiado *** <b>".$_SESSION['user']."</b> pone muda la Sala Pública por $es minuto(s)... ');\r\n";
sendto('*',$ms);
return;
}
break;
default:$ret.="credits('*** Privilegios insuficientes. Solo Super admin"."');\r\n";
thelog('../cc_data/log/error_log.txt'," Error: Privilegios Insuficientes User: ".$_SESSION['user']);
}
}

function reloaddata($op,$us,$sc){ global $tb_users,$tb_online,$ret;$ar=array('id','user','sex','cou','prov','stt','fij','priv','adm','att','ttim','nav','ip','lnk','max','age','mail','fb','ac','it','thumb','reg');$now=time();$tx="SELECT *,($now-lconn)+ttim AS mtim FROM $tb_users WHERE user='$us'";$q=mysql_query($tx);if ($rw=mysql_fetch_array($q)){if ($rw['active']==1){$inf=retquery($rw,$ar);$max=$inf; $max.=($op!='')?"&oper=$op":'';$ms="$sc('$max');\r\n";sendto('*',$ms);mysql_query("UPDATE $tb_online SET data='$inf' WHERE me=".$rw['id']);}}}function s_exit($w){parse_str($w);if ($us=$_SESSION['user']){switch($q){case 1:$op='cerró el navegador';break;case 2:$op='cerró sesión';break;}$da="oper=".$_SESSION['user']."&tag=0&user=$us&motiv=$op&thumb=$thumb&ip=".$_SESSION['ipi'];$ms="u_exit('$da');\r\n";sendto('*',$ms);disc($us);unset($_SESSION['me']);unset($_SESSION['user']);unset($_SESSION['svr']);initialize('');}}

//Privilegios y Estrellas

function chgstt($w){ 
global $ret,$tb_users,$tb_notify;
parse_str($w);
$prv=thepriv();
if (($prv&64)==64){$enn="stt=$thestt";
changedata($seluser,'',$enn,'chgst');

$stts = Array('No-Registrado', 'Registrado', 'Usuario Nivel 1', 'Usuario Nivel 2','Usuario Estrella','CiberChica','CiberChico','Supervisor', 'Princesa', 'Admin', 'Admin-SalaPublica');

$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";
$q=mysql_query($tx);
$rw=mysql_fetch_array($q);
$date=date("d/m/y");
$time=time();
$tx="INSERT INTO $tb_notify (`from`, `thumb`, `dest`, `mess`, `time`, `look`, 
`arrival`) VALUES ('".$_SESSION['user']."', '".$rw['thumb']."',
'$seluser', '".$_SESSION['user']." te cambia a estado: $stts[$thestt]...', '$date', '0', $time)";
mysql_query($tx);
$tx="SELECT * FROM $tb_notify WHERE dest='$seluser' AND look=0";
$q=mysql_query($tx);$not=mysql_num_rows($q);$ms="reload_notify('$seluser','$not');\r\n"; sendto('*',$ms);
}
else{$ret.="credits('*** Privilegios insuficientes ...');\r\n";
thelog('../cc_data/log/error_log.txt',$_SESSION['user']." -> Error modificando estado a $seluser ");
}thelog('../cc_data/log/stt.txt',$_SESSION['user']." -> cambia modo [$stts[$thestt]] a $seluser ");
}

function chgprv($w){ 
global $ret,$tb_users,$tb_notify;
parse_str($w);
$prv=thepriv();
if (($prv&128)==128){$enn="priv=$sum";
changedata($seluser,'',$enn,'chgpriv');
$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";
$q=mysql_query($tx);
$rw=mysql_fetch_array($q);
$date=date("d/m/y");
$time=time();
$tx="INSERT INTO $tb_notify (`from`, `thumb`, `dest`, `mess`, `time`, `look`, `arrival`) VALUES ('".$_SESSION['user']."', '".$rw['thumb']."', '$seluser', '".$_SESSION['user']." modifica tus privilegios...', '$date', '0', $time)";
mysql_query($tx);
$tx="SELECT * FROM $tb_notify WHERE dest='$seluser' AND look=0";
$q=mysql_query($tx);
$not=mysql_num_rows($q);
$ms="reload_notify('$seluser','$not');\r\n"; 
sendto('*',$ms);
}
else{$ret.="credits('*** Privilegios insuficientes ...');\r\n";
thelog('../cc_data/log/error_log.txt',$_SESSION['user']." -> Error modificando privilegios a $seluser ");
}thelog('../cc_data/log/priv.txt',$_SESSION['user']." -> $seluser  [$enn]");
}

function chglev($w){ 
global $ret,$tb_notify,$tb_users;
parse_str($w);
$prv=thepriv();
if (($prv&32)==32){$enn="att=$mstar";
changedata($seluser,'',$enn,'chgatt');

$star = Array('(Ninguna)', '1 Estrella', '1 Estrellas y Media', '2 Estrellas', '2 Estrellas y Media', '3 Estrellas','3 Estrellas y Media', '4 Estrellas', 'Supervisor', 'Princesa', 'Admin', 'Admin-SalaPublica');

$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."' ";
$q=mysql_query($tx);
$rw=mysql_fetch_array($q);
$date=date("d/m/y");$time=time();
$tx="INSERT INTO $tb_notify (`from`, `thumb`, `dest`, `mess`, `time`, `look`, `arrival`) VALUES ('".$_SESSION['user']."', '".$rw['thumb']."', '$seluser', '".$_SESSION['user']." te establece: $star[$mstar]...', '$date', '0', $time)";
mysql_query($tx);
$tx="SELECT * FROM $tb_notify WHERE dest='$seluser' AND look=0";
$q=mysql_query($tx);
$not=mysql_num_rows($q);
$ms="reload_notify('$seluser','$not');\r\n";
sendto('*',$ms);
}
else{$ret.="credits('*** Privilegios insuficientes ...');\r\n";
thelog('../cc_data/log/error_log.txt',$_SESSION['user']." -> Error modificando estrellas a $seluser ");
}
thelog('../cc_data/log/estrellas.txt',$_SESSION['user']." -> establece [$star[$mstar]] a $seluser ");
}

function thelog($f,$w){ 
$nw=date("d/m/y  h:i->");
$w="$nw $w \r\n";
$fh=fopen($f,"a+");
fwrite($fh,$w);
fclose($fh);
}

function thepriv(){ 
global $tb_users;
$tx="SELECT * FROM $tb_users WHERE user='".$_SESSION['user']."'";
$q=mysql_query($tx);
$rw=mysql_fetch_array($q);
return $rw['priv'];
}
function adminact($w){global $tb_users,$tb_online,$tb_ban,$ret;
parse_str($w);
$prv=thepriv();
if (($prv&2)==2){switch($tag){
case "exp": 
$tx="SELECT * FROM $tb_users WHERE user='$seluser'";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q)){
if ($rw['adm']!=1){$us=$rw['user'];
$motiv=addslashes($motiv);
$da="oper=".$_SESSION['user']."&tag=$tag&user=$us&motiv=$motiv&ip=0";
$ms="u_exit('$da');\r\n";
sendto('*',$ms);
disc($us);
}else{$ret.="credits('*** Privilegios insuficientes ...');\r\n";
thelog('../cc_data/log/error_log.txt',$_SESSION['user']." -> Error expulsando a $seluser ");
}}
break;
case "ban": 
$tx="SELECT * FROM $tb_users WHERE user='$seluser'";
$q=mysql_query($tx);
while($rw=mysql_fetch_array($q)){
if ($rw['adm']!=1){$ip=$rw['ip'];
$tip=split(',',$ip);
$tp=$tip[1];
$us=$rw['user'];
$oper=$_SESSION['user'];
$motiv=addslashes($motiv);
mysql_query("INSERT INTO $tb_ban (user,ip,motiv,oper) VALUES ('$us','$tp','$motiv','$oper')");
$da="oper=".$_SESSION['user']."&tag=$tag&user=$us&motiv=$motiv&ip=0";
$ms="u_exit('$da');\r\n";
sendto('*',$ms);
disc($us);
}
else{$ret.="credits('*** Privilegios insuficientes ...');\r\n";
thelog('../cc_data/log/error_log.txt',$_SESSION['user']." -> Error baneando a $seluser ");
}}
break;
}}
else{ $ret.="credits('*** Privilegios insuficientes ...');\r\n"; 
thelog('../cc_data/log/error_log.txt',$_SESSION['user']." -> Error baneando a $seluser ");
}
}

//Topic

function m_chgtopic($w){global $tb_vars, $ret;
parse_str($w);
$tx="UPDATE $tb_vars SET value='$wtopic' WHERE var='topic'";
mysql_query($tx); 
if (mysql_affected_rows()>0){thelog('../cc_data/log/topic.txt',$_SESSION['user']." -> TOPIC: [$wtopic] ");
}
}

function retquery($q1,$q2){$ret='';foreach($q2 as $q){if (isset($q1[$q])){if ($q!='ip') $w=$q1[$q];else $w=theip($q1[$q]);$ret.=$ret==''?'':'&';$ret.="$q=$w";}}return $ret;}function theip($w){$ar=split(',',$w);return sprintf('%u', ip2long(trim($ar[1])));}function udata($w){global $tb_online;parse_str($w);$nw=time();$tx="SELECT * FROM $tb_online WHERE user='$user'";$q=mysql_query($tx);if ($rw=mysql_fetch_array($q)){}else{$rw=uaddnew($tb_online,"user='$user'"); }mysql_query("UPDATE $tb_online SET priv=$priv, adm=$adm, me=$id, q1='',q2='', active=1, lconn=$nw, data='$w' WHERE id=".$rw['id']);return $id;}function ufinder($w){global $tb_users;parse_str($w);$wt_pw=addslashes($wt_pw);$tx="SELECT *,PASSWORD('$wt_pw') AS pass1 FROM $tb_users WHERE user='$wt_user'";$q=mysql_query($tx);if ($rw=mysql_fetch_array($q)){if($rw['pass']==$rw['pass1'] || $rw['pass']=='NOPASS'){return $rw;}else return false;}else return uaddnew($tb_users,"user='$wt_user', pass='NOPASS',ttim=0, active=0, stt=0, priv=0, att=0, adm=0, reg=0,thumb='00000.png'");}function uaddnew($tb,$set){$qq=uempty($tb);$tx="UPDATE $tb SET $set WHERE id=".$qq['id'];mysql_query($tx);$tx="SELECT * FROM $tb WHERE id=".$qq['id'];$q=mysql_query($tx); $rw=mysql_fetch_array($q);return $rw;}function uempty($tb){$tx="SELECT * FROM $tb WHERE active=-1";$q=mysql_query($tx);if ($rw=mysql_fetch_array($q)){return $rw;}else{mysql_query("INSERT INTO $tb (active) VALUES (-1)");return uempty($tb);}}function setonline($w){global $tb_users;parse_str($w);$nw=time();$tx="UPDATE $tb_users SET active=1, lconn=$nw WHERE user='$user'";mysql_query($tx);return udata($w);}function sendto($w,$ms){ global $tb_online;$wh=($w=='*')?'root=0 AND active=1':"user='$w'";$ms=addslashes($ms);$tx="UPDATE $tb_online SET q2=CONCAT(q2,'$ms') WHERE $wh";mysql_query($tx);}function removeattach(){global $tb_users;$now=time();$tx="DELETE FROM $tb_users WHERE lconn<($now-(30*24*60*60)) AND root=0";mysql_query($tx);$tx="SELECT * FROM $tb_users WHERE active=0 AND pass='NOPASS' ";$qr=mysql_query($tx);while($rw=mysql_fetch_array($qr)) controlat($rw['id']);}function controlat($id){global $tb_files,$tb_users;$tx="SELECT * FROM $tb_files WHERE usid=$id";$qr=mysql_query($tx);while($rw=mysql_fetch_array($qr)){@unlink($rw['fref']);mysql_query("DELETE FROM $tb_files WHERE id=".$rw['id']);}$tx="UPDATE $tb_users SET active=-1, user='', priv=0, att=0, max=0, adm=0, ttim=0, thumb='00000.png' WHERE id=$id";mysql_query($tx);}

function chgpass($w){global $tb_users,$ret;
parse_str($w); 
if ($pwrnew==$pwrnewr){  
$tx="UPDATE $tb_users SET pass=PASSWORD('$pwrnew') $add WHERE user='".$_SESSION['user']."'";
mysql_query($tx);
$ret.="pwdok();\r\n";
}
if (mysql_affected_rows()>0){reloaddata('',$_SESSION['user'],'chgprf');
}
else{$ret.="pwdok();\r\n";
}
}

function register($w){global $tb_users,$ret;
parse_str($w); 
if ($pwrnewreg==$pwrnewregr){ 
$regq="UPDATE $tb_users SET pass=PASSWORD('$pwrnewreg') $add WHERE user='".$_SESSION['user']."'";
mysql_query($regq); 
$tx="UPDATE $tb_users SET stt=1, reg=1, att=1 WHERE user='".$_SESSION['user']."' AND stt=0";
mysql_query($tx);
$ret.="registerok();\r\n";
if (mysql_affected_rows()>0){reloaddata('',$_SESSION['user'],'chgprf');
}
}
}

function chgmydata($w){global $tb_users,$ret;parse_str($w);$tx="SELECT * FROM $tb_users WHERE id ='".$_SESSION['me']."'";$q=mysql_query($tx);$rw=mysql_fetch_array($q);$sex=$rw['sex'];$age=$rw['age'];$user=$_SESSION['user'];if($rw['pass']!='NOPASS'){$tx="UPDATE $tb_users SET sex='$pf_s',mail='$pf_m',age='$pf_a',ac='$pf_p',it='$pf_i',fb='$pf_fb',prov='$pf_pr' ";$tx.= "WHERE user='".$_SESSION['user']."'";mysql_query($tx);if (mysql_affected_rows()>0){$ms="s_changprofile('$user','$pf_s','$pf_a','$sex','$age');\r\n";sendto('*',$ms);reloaddata('',$_SESSION['user'],'s_changprof');}else {$ret.="warnperf();";}}else{$ret.="perfilok()";}}function s_write($w){parse_str($w);$ms="s_write('".$_SESSION['user']."');\r\n";sendto($dest,$ms);}function s_look($w){parse_str($w);$ms="s_look('".$_SESSION['user']."');\r\n";sendto($dest,$ms);}function lookdesc(){ global $tb_online;$tods=array();$lim=time()-300;$tx="SELECT * FROM $tb_online WHERE active=1 AND root=0 AND lconn<$lim";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$ds.=($ds=='')?'':',';$ds.="'".$rw['user']."'";array_push($tods,$rw['user']);}if ($ds!=''){$ms="noanswer($ds);\r\n";sendto('*',$ms);foreach($tods as $it) disc($it);}}function disc($us){ global $tb_online,$tb_users;$mtim=time();mysql_query("UPDATE $tb_users SET active=0, ttim=ttim+($mtim-lconn) WHERE user='$us'");mysql_query("UPDATE $tb_online SET active=-1 WHERE user='$us'");mysql_query("UPDATE $tb_users SET active=-1,user='',stt=0,priv=0 WHERE active<1 AND pass='NOPASS' ");optimize();}function optimize(){global $tb_users,$tb_stats,$tb_files,$tb_vars,$tb_online,$tb_anounce,$tb_ban,$tb_mess,$tb_friend,$tb_friend2,$tb_mess2,$tb_notify;$tx="OPTIMIZE TABLE  $tb_users,$tb_stats,$tb_files,$tb_vars,$tb_notify,";$tx.="$tb_online,$tb_anounce,$tb_ban,$tb_mess,$tb_friend,$tb_friend2,$tb_mess2";mysql_query($tx);}function desc_root(){ global $tb_online;$tods=array();$now=time();$tx="SELECT * FROM $tb_online WHERE root=1 AND lconn<$now";$q=mysql_query($tx);while($rw=mysql_fetch_array($q)){$ds.=($ds=='')?'':',';$ds.="'".$rw['user']."'";array_push($tods,$rw['user']);}if ($ds!=''){$ms="noanswer($ds);\r\n";sendto('*',$ms);foreach($tods as $it) delete_root($it);}}function delete_root($us){global $tb_online;$tx="DELETE FROM $tb_online WHERE user='$us' ";mysql_query($tx);}function getcou($w=''){include ('lv_geoip.php');$gi = geoip_open("GeoIP.dat",0); $theip=($w!='')?$w:getip();return geoip_country_id_by_addr($gi,$theip);}function dataip($u) {if ($u==1) $r=''; else $r=$_COOKIE['val'];if (isset($_COOKIE['hostip'])){$r.=($r=='')?'':',';$r.=$_COOKIE['hostip'];return $r;}$a=array("HTTP_CLIENT_IP","HTTP_X_FORWARDED_FOR","REMOTE_ADDR");foreach($a as $i1){$m=(getenv($i1))?getenv($i1):"";if ($m!=''){$r.=($r=='')?'':',';$r.=$m;}}return $r;}function getip() {if (isset($_COOKIE['realip'])) return $_COOKIE['realip'];if (getenv("REMOTE_ADDR")) $ii=getenv("REMOTE_ADDR");elseif (getenv("HTTP_X_FORWARDED_FOR")) $ii=getenv("HTTP_X_FORWARDED_FOR");elseif (getenv("HTTP_CLIENT_IP")) $ii=getenv("HTTP_CLIENT_IP");return $ii;}

function navig(){$nav='';$br = $_SERVER['HTTP_USER_AGENT'];$cl=array('Mozilla'=>'mo','MSIE'=>'ie','Firefox'=>'mz','Opera'=>'op','Safari'=>'sa','Chrome'=>'go','Navigator'=>'ns','K-Meleon'=>'ka','Lunascape'=>'ls','Iceweasel'=>'ic','Epiphany'=>'ep','Konqueror'=>'ko','Avant'=>'av');foreach($cl as $k => $v)  if (strpos($br,$k)>-1) $nav=$v;if ($nav=='') $nav='uk';return $nav;
}
function provi(){$prov='';$cl=array('Moxilla'=>'mo','MSIE'=>'ie');foreach($cl as $k => $v)  if (strpos($k)>-1) $prov=$v;if ($prov=='') $prov='uk';return $prov;
}

function getvar($w){global $tb_vars;$q=mysql_query("SELECT * FROM $tb_vars WHERE var='$w' ");if ($r=mysql_fetch_array($q))return $r['value'];return '';}function checkrobot(){ global $tb_online,$tb_users;$cantrobots=intval(getvar('root'));$tx="SELECT * FROM $tb_online WHERE root>0 ";$q=mysql_query($tx);if(mysql_num_rows($q)<$cantrobots){$tx="SELECT * FROM $tb_users WHERE root>0 AND active<1 ORDER BY lconn ASC ";$q=mysql_query($tx);$r=mysql_fetch_array($q);extract($r);$now=time();$ar=split(',',$ip);$laip=sprintf('%u', ip2long(trim($ar[1])));

$data="id=$id&user=$user&sex=$sex&cou=$cou&prov=$prov&stt=$stt&fij=$fij&priv=$priv&adm=$adm&att=$att&ttim=$ttim&nav=$nav&ip=$laip&lnk=$lnk&max=$max&age=$age&mail=$mail&ac=$ac&it=$it&thumb=$thumb&reg=$reg";mysql_query("UPDATE $tb_users SET active=1, lconn=$now WHERE user='$user'");mysql_query("INSERT INTO $tb_online (me,user,data,priv,adm,q1,q2,active,lconn,root) VALUES ($id,'$user','$data',$priv,$adm,'','',1,$now+$root,1)"); $s_ip=$ar[1];$link=getvar('url');$ad.= "[$s_ip]  [url: $link] ";$mss=addslashes("moreinfo('us=$user&info=$ad');\r\n");$tx="UPDATE $tb_online SET q2=CONCAT(q2,'$mss') WHERE (priv&1)=1  AND active=1";mysql_query($tx);$en="enteruser('$data','','','','');\r\n";sendto('*',$en);}$tx="SELECT * FROM $tb_users WHERE root>1 AND active=0 ";$q=mysql_query($tx);if(mysql_num_rows($q)==0){$tx="UPDATE $tb_users SET active='0' WHERE root>1";mysql_query($tx);}}function initialize($w){global $ul,$ret,$_f;parse_str($w);$ul=0;$_SESSION['rpt']='';if(isset($loc))$_SESSION['myhost']=$loc;if(!isset($_SESSION['user'])){$_SESSION['ul']=0;$ret.="myses='".session_id()."';\r\n";$ret.="server_conected();\r\n";}else{$ret.="serverinuse();\r\n";}rating();stats();} 

?>

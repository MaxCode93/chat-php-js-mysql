<?php
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Powered By Maxwell
--Powered By Maxwell
--config_master.php
*/
include("config.php");
                $sql = "SELECT * FROM $tb_config;";
				$result = mysql_query($sql)or 
				die('  <head>
   <link rel="shortcut icon" href="cc_recursos/logo.png">
   <title>Error</title>
   <link href="cc_scripts/css/lv_main.css" rel="stylesheet" type="text/css">
	<div style="background: rgba(23, 97, 159, 0.93) none repeat scroll 0% 0%;text-align: center;border-radius: 20px;" >
    <h2>Error Fatal <font color="#1571D3"></font></h2>
    <p>
       La base de datos esta vacia, importe <font color="white">database_lv.sql</font> 
    </p><br>
	    </div>
		   </head>
   ');
        while($row = mysql_fetch_assoc($result)){
    	    	$chat_name                   = $row['chat_name'];
    	        $chat_title                  = $row['chat_title'];
				$chat_des                    = $row['chat_des'];
		        $chat_ver                    = $row['chat_ver'];
				$chat_owner                  = $row['chat_owner'];
				$chat_cvisual                = $row['chat_cvisual'];
				$chat_cmaster                = $row['chat_cmaster'];
}
?>
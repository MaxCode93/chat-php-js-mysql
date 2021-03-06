<?php
/* 
--LiveMessenger
--@Package LiveMessenger v18.8.1
--Email:carlosmaxwell93@gmail.com
--Powered By Maxwell
*/

define("GEOIP_SHM_KEY", 0x4f415401);
class GeoIP
{
var $flags;
var $filehandle;
var $memory_buffer;
var $databaseType;
var $databaseSegments;
var $record_length;
var $shmid;
}
function _setup_segments($gi){$gi->databaseType = 106;
$gi->record_length = 3;
if ($gi->flags & 2) 
{
$offset = @shmop_size ($gi->shmid) - 3;
for ($i = 0;
$i < 20;
$i++) {$delim = @shmop_read ($gi->shmid, $offset, 3);
$offset += 3;
if ($delim == (chr(255).chr(255).chr(255)))
{
$gi->databaseType = ord(@shmop_read ($gi->shmid, $offset, 1));
$offset++;
if ($gi->databaseType == 112)
{
$gi->databaseSegments = 16700000;
}
else if ($gi->databaseType == 3)
{
$gi->databaseSegments = 16000000;
}
else if (($gi->databaseType == 111)|| ($gi->databaseType == 2) || ($gi->databaseType == 110) || ($gi->databaseType == 4) || ($gi->databaseType == 9)){ $gi->databaseSegments = 0;
$buf = @shmop_read ($gi->shmid, $offset, 3);
for ($j = 0;
$j < 3;
$j++)
{
$gi->databaseSegments += (ord($buf[$j]) << ($j * 8));
}
if (($gi->databaseType == 110)|| ($gi->databaseType == 4))
{
$gi->record_length = 4;
}
}
break;
}
else
{
$offset -= 4;
}
}
if (($gi->databaseType == 106)||($gi->databaseType == 8)||($gi->databaseType == 10))
{
$gi->databaseSegments = 16776960;
}
}
else
{
$filepos = ftell($gi->filehandle);
fseek($gi->filehandle, -3, SEEK_END);
for ($i = 0;
$i < 20;
$i++)
{
$delim = fread($gi->filehandle,3);
if ($delim == (chr(255).chr(255).chr(255)))
{
$gi->databaseType = ord(fread($gi->filehandle,1));
if ($gi->databaseType == 112)
{
$gi->databaseSegments = 16700000;
}
else if ($gi->databaseType == 3)
{
$gi->databaseSegments = 16000000;
}
else if (($gi->databaseType == 111) ||($gi->databaseType == 2) || ($gi->databaseType == 110) || ($gi->databaseType == 4) || ($gi->databaseType == 9)){ $gi->databaseSegments = 0;
$buf = fread($gi->filehandle,3);
for ($j = 0;
$j < 3;
$j++)
{
$gi->databaseSegments += (ord($buf[$j]) << ($j * 8));
}
if ($gi->databaseType == 110) { $gi->record_length = 4;
}
}
break;
}
else
{
fseek($gi->filehandle, -4, SEEK_CUR);
}
}
if (($gi->databaseType == 106)||($gi->databaseType == 8)||($gi->databaseType == 10)){ $gi->databaseSegments = 16776960;
}
fseek($gi->filehandle,$filepos,SEEK_SET);
}
return $gi;
}
function geoip_open($filename, $flags)
{
$gi = new GeoIP;
$gi->flags = $flags;
if ($gi->flags & 2)
{
$gi->shmid = @shmop_open (GEOIP_SHM_KEY, "a", 0, 0);
}
else
{
$gi->filehandle = fopen($filename,"rb");
if ($gi->flags & 1) 
{
$s_array = fstat($gi->filehandle);
$gi->memory_buffer = fread($gi->filehandle, $s_array[size]);
}
}
$gi = _setup_segments($gi);
return $gi;
}
function geoip_close($gi)
{
if ($gi->flags & 2)
{
return true;
}
return fclose($gi->filehandle);
}
function geoip_country_id_by_addr($gi, $addr)
{
$ipnum = ip2long($addr);
return _geoip_seek_country($gi, $ipnum) - 16776960;
}
function _geoip_seek_country($gi, $ipnum)
{
$offset = 0;
for ($depth = 31;
$depth >= 0;
--$depth)
{
if ($gi->flags & 1)
{
$buf = substr($gi->memory_buffer, 2 * $gi->record_length * $offset, 2 * $gi->record_length);
}
elseif ($gi->flags & 2)
{
$buf = @shmop_read ($gi->shmid,2 * $gi->record_length * $offset, 2 * $gi->record_length );
}
else
{
fseek($gi->filehandle, 2 * $gi->record_length * $offset, SEEK_SET) == 0or die("fseek failed");
$buf = fread($gi->filehandle, 2 * $gi->record_length);
}
$x = array(0,0);
for ($i = 0;
$i < 2;
++$i)
{
for ($j = 0;
$j < $gi->record_length;
++$j)
{
$x[$i] += ord($buf[$gi->record_length * $i + $j]) << ($j * 8);
}
}
if ($ipnum & (1 << $depth))
{
if ($x[1] >= $gi->databaseSegments)
{
return $x[1];
}
$offset = $x[1];
}
else
{
if ($x[0] >= $gi->databaseSegments)
{
return $x[0];
}
$offset = $x[0];
}
}
trigger_error("error traversing database - perhaps it is corrupt?", E_USER_ERROR);
return false;
}
?>
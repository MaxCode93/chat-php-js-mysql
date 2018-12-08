<?php
session_start();

            $_SESSION['lvlogin'] = null;

header('Location: ../lvadm.php');
?>
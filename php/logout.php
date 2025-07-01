<?php
session_start();
session_destroy();
// header("Location: login.php");
header("location: ../index.html");
exit();
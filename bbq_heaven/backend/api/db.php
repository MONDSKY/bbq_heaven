<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost","root","","bbq_heaven");
if($conn->connect_error){ die("DB Error"); }
$conn->set_charset("utf8mb4");
?>

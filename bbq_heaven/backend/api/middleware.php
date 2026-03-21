<?php
include 'db.php';
$ip=$_SERVER['REMOTE_ADDR'];
$res=$conn->query("SELECT COUNT(*) as c FROM request_logs WHERE ip='$ip' AND created_at > (NOW() - INTERVAL 1 MINUTE)");
$row=$res->fetch_assoc();
if($row['c']>30){ die("Too many requests"); }
$conn->query("INSERT INTO request_logs(ip) VALUES('$ip')");
?>

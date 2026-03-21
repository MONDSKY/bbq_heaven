<?php
include 'db.php';
$res=$conn->query("SELECT * FROM orders");
$data=[];
while($r=$res->fetch_assoc()) $data[]=$r;
echo json_encode($data);
?>

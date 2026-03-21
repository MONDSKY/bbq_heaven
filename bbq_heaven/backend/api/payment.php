<?php
include 'db.php';
$data=json_decode(file_get_contents("php://input"),true);
$conn->query("INSERT INTO payments(order_id,method,amount,status) VALUES({$data['order_id']},'gcash',{$data['amount']},'completed')");
echo "paid";
?>

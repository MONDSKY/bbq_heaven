
<?php
include 'db.php';

$order_id = $_GET['order_id'];

$conn->query("UPDATE orders SET status='preparing' WHERE order_id=$order_id");
$conn->query("INSERT INTO payments(order_id,method,amount,status)
VALUES($order_id,'gcash',0,'completed')");

echo "verified";
?>
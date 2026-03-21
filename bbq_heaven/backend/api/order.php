<?php
include 'db.php';
$data=json_decode(file_get_contents("php://input"),true);
$conn->begin_transaction();
$total=0;
$conn->query("INSERT INTO orders(user_id,total,latitude,longitude) VALUES({$data['user_id']},0,{$data['lat']},{$data['lng']})");
$oid=$conn->insert_id;
foreach($data['cart'] as $i){
 $p=$conn->query("SELECT * FROM products WHERE product_id={$i['id']}")->fetch_assoc();
 if($p['stock']<$i['qty']){ $conn->rollback(); exit; }
 $total+=$p['price']*$i['qty'];
 $conn->query("INSERT INTO order_items(order_id,product_id,quantity,price) VALUES($oid,{$i['id']},{$i['qty']},{$p['price']})");
 $conn->query("UPDATE products SET stock=stock-{$i['qty']} WHERE product_id={$i['id']}");
}
$conn->query("UPDATE orders SET total=$total WHERE order_id=$oid");
$conn->commit();
echo "success";
?>

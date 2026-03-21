<?php
include 'db.php';
$uid=$_POST['user_id'];
$code=$_POST['code'];
$res=$conn->query("SELECT * FROM verification_codes WHERE user_id=$uid AND code='$code'");
if($res->num_rows>0){
 $conn->query("UPDATE users SET is_verified=1 WHERE user_id=$uid");
 echo "Verified";
}else echo "Invalid";
?>

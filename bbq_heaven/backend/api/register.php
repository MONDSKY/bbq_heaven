<?php
include 'db.php';
$name=$_POST['name'];
$email=$_POST['email'];
$pass=password_hash($_POST['password'],PASSWORD_DEFAULT);
$stmt=$conn->prepare("INSERT INTO users(name,email,password) VALUES(?,?,?)");
$stmt->bind_param("sss",$name,$email,$pass);
$stmt->execute();
$user_id=$conn->insert_id;
$code=rand(100000,999999);
$conn->query("INSERT INTO verification_codes(user_id,code,expires_at) VALUES($user_id,'$code',NOW()+INTERVAL 5 MINUTE)");
echo "CODE:$code";
?>

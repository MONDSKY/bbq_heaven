<?php
include 'db.php';
include 'jwt.php';
$email=$_POST['email'];
$pass=$_POST['password'];
$stmt=$conn->prepare("SELECT * FROM users WHERE email=?");
$stmt->bind_param("s",$email);
$stmt->execute();
$user=$stmt->get_result()->fetch_assoc();
if($user && password_verify($pass,$user['password'])){
 if(!$user['is_verified']) die("Verify first");
 echo json_encode(["token"=>generateJWT($user),"role"=>$user['role'],"id"=>$user['user_id']]);
}else echo "Invalid";
?>

<?php
function generateJWT($user){
 $header=base64_encode(json_encode(["alg"=>"HS256","typ"=>"JWT"]));
 $payload=base64_encode(json_encode(["id"=>$user['user_id'],"role"=>$user['role'],"exp"=>time()+3600]));
 $sig=base64_encode(hash_hmac("sha256","$header.$payload","secret",true));
 return "$header.$payload.$sig";
}
?>

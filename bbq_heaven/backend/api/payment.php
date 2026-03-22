<?php
include 'db.php';
$data=json_decode(file_get_contents("php://input"),true);

$secret="sk_live_your_real_key";

$payload=[
 "data"=>[
  "attributes"=>[
   "amount"=>$data['amount']*100,
   "payment_method_allowed"=>["gcash"],
   "currency"=>"PHP"
  ]
 ]
];

$ch=curl_init("https://api.paymongo.com/v1/payment_intents");
curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
curl_setopt($ch,CURLOPT_USERPWD,$secret.":");
curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($payload));
curl_setopt($ch,CURLOPT_HTTPHEADER,["Content-Type: application/json"]);

$response=curl_exec($ch);
echo $response;
?>
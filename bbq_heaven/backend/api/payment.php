
<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$secret = "sk_test_xxx"; // replace with your key

$payload = [
 "data" => [
  "attributes" => [
   "amount" => $data['amount'] * 100,
   "redirect" => [
     "success" => "http://localhost:3000/receipt",
     "failed" => "http://localhost:3000/customer"
   ],
   "payment_method_allowed" => ["gcash"],
   "currency" => "PHP"
  ]
 ]
];

$ch = curl_init("https://api.paymongo.com/v1/checkout_sessions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, $secret . ":");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

$response = json_decode(curl_exec($ch), true);

echo json_encode([
 "checkout_url" => $response['data']['attributes']['checkout_url']
]);
?>
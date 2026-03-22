import {useEffect,useState} from "react";
import API from "../utils/api";

export default function Admin(){
 const [products,setProducts]=useState([]);
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [stock,setStock]=useState("");

 const load=()=>{
  fetch(API+"products.php").then(r=>r.json()).then(setProducts);
 };

 useEffect(load,[]);

 const add=()=>{
  fetch(API+"add_product.php",{
   method:"POST",
   headers:{"Content-Type":"application/x-www-form-urlencoded"},
   body:`name=${name}&price=${price}&stock=${stock}`
  }).then(load);
 };

 const del=(id)=>{
  fetch(API+`delete_product.php?id=${id}`).then(load);
 };

 return(
 <div className="container">
  <h2>Admin Panel</h2>

  <input placeholder="Name" onChange={e=>setName(e.target.value)}/>
  <input placeholder="Price" onChange={e=>setPrice(e.target.value)}/>
  <input placeholder="Stock" onChange={e=>setStock(e.target.value)}/>
  <button onClick={add}>Add Product</button>

  {products.map(p=>(
   <div key={p.product_id} className="card">
    {p.name} - {p.stock}
    <button onClick={()=>del(p.product_id)}>Delete</button>
   </div>
  ))}
 </div>
 );
}

// =========================
// 3. REAL PAYMENT API (PLACEHOLDER)
// File: backend/api/payment.php
// =========================

<?php
include 'db.php';
$data=json_decode(file_get_contents("php://input"),true);

// Replace with real API (GCash / PayMongo)
$conn->query("INSERT INTO payments(order_id,method,amount,status)
VALUES({$data['order_id']},'gcash',{$data['amount']},'completed')");

echo json_encode(["status"=>"success"]);
?>

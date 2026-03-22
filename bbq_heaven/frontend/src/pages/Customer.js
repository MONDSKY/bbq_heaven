import {useEffect,useState} from "react";
import API from "../utils/api";

export default function Customer(){
 const [products,setProducts]=useState([]);
 const [cart,setCart]=useState([]);

 useEffect(()=>{
  fetch(API+"products.php").then(r=>r.json()).then(setProducts);
 },[]);

 const add=(p)=>{
  const exist=cart.find(i=>i.id===p.product_id);
  if(exist){
   setCart(cart.map(i=>i.id===p.product_id?{...i,qty:i.qty+1}:i));
  }else{
   setCart([...cart,{id:p.product_id,name:p.name,price:p.price,qty:1}]);
  }
 };

 const updateQty=(id,qty)=>{
  setCart(cart.map(i=>i.id===id?{...i,qty:Math.max(1,qty)}:i));
 };

 const total = cart.reduce((sum,i)=>sum + i.qty*i.price,0);

 const checkout=()=>{
  navigator.geolocation.getCurrentPosition(pos=>{
   fetch(API+"order.php",{
    method:"POST",
    body:JSON.stringify({
     user_id:1,
     lat:pos.coords.latitude,
     lng:pos.coords.longitude,
     cart
    })
   });
  });
 };

 return(
 <div className="container">

  <h2>BBQ Heaven</h2>

  {products.map(p=>(
   <div key={p.product_id} className="card">
    <h3>{p.name}</h3>
    <p>₱{p.price}</p>
    <button onClick={()=>add(p)}>Add to Cart</button>
   </div>
  ))}

  <h3>Cart</h3>
  {cart.map(i=>(
   <div key={i.id} className="cart-item">
    <span>{i.name}</span>
    <input type="number" value={i.qty} onChange={e=>updateQty(i.id,parseInt(e.target.value))}/>
   </div>
  ))}

  <div className="navbar">
   <button onClick={checkout}>
    Checkout ₱{total}
   </button>
  </div>

 </div>
 );
}

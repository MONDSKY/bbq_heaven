
import {useEffect,useState} from "react";
import API from "../utils/api";
export default function Customer(){
 const [p,setP]=useState([]);
 const [c,setC]=useState([]);
 useEffect(()=>{fetch(API+"products.php").then(r=>r.json()).then(setP);},[]);
 const add=(x)=>setC([...c,{id:x.product_id,qty:1}]);
 const checkout=()=>{
  navigator.geolocation.getCurrentPosition(pos=>{
   fetch(API+"order.php",{method:"POST",body:JSON.stringify({user_id:1,lat:pos.coords.latitude,lng:pos.coords.longitude,cart:c})});
  });
 };
 return(<div>{p.map(x=><div key={x.product_id}>{x.name}<button onClick={()=>add(x)}>Add</button></div>)}<button onClick={checkout}>Checkout</button></div>);
}

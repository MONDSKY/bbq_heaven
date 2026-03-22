

import { useEffect, useState } from "react";
import API from "../utils/api";

export default function OrderTracking(){

 const [orders,setOrders] = useState([]);

 useEffect(()=>{
  fetch(API+"analytics.php")
   .then(r=>r.json())
   .then(setOrders);
 },[]);

 return(
  <div className="container">
   <h2>Order Tracking</h2>

   {orders.map(o=>(
    <div key={o.order_id} className="card">

     <h3>Order #{o.order_id}</h3>

     <div className="timeline">
      <div className={o.status==="pending"?"active":""}>Pending</div>
      <div className={o.status==="preparing"?"active":""}>Preparing</div>
      <div className={o.status==="delivered"?"active":""}>Delivered</div>
     </div>

    </div>
   ))}

  </div>
 );
}
import {useEffect,useState} from "react";
import API from "../utils/api";
import {LineChart,Line,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from "recharts";

export default function Admin(){
 const [products,setProducts]=useState([]);
 const [analytics,setAnalytics]=useState([]);
 const [name,setName]=useState("");
 const [price,setPrice]=useState("");
 const [stock,setStock]=useState("");

 const load=()=>{
  fetch(API+"products.php").then(r=>r.json()).then(setProducts);
  fetch(API+"analytics.php").then(r=>r.json()).then(setAnalytics);
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
  <h2>Admin Dashboard</h2>

  <h3>Add Product</h3>
  <input placeholder="Name" onChange={e=>setName(e.target.value)}/>
  <input placeholder="Price" onChange={e=>setPrice(e.target.value)}/>
  <input placeholder="Stock" onChange={e=>setStock(e.target.value)}/>
  <button onClick={add}>Add</button>

  <h3>Products</h3>
  {products.map(p=>(
   <div key={p.product_id} className="card">
    {p.name} - {p.stock}
    <button onClick={()=>del(p.product_id)}>Delete</button>
   </div>
  ))}

  <h3>Sales Analytics</h3>
  <div style={{width:'100%',height:300}}>
   <ResponsiveContainer>
    <LineChart data={analytics}>
     <CartesianGrid strokeDasharray="3 3" />
     <XAxis dataKey="date" />
     <YAxis />
     <Tooltip />
     <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={3} />
    </LineChart>
   </ResponsiveContainer>
  </div>
 </div>
 );
}


import {useEffect,useState} from "react";
import API from "../utils/api";
export default function Admin(){
 const [a,setA]=useState([]);
 useEffect(()=>{fetch(API+"analytics.php").then(r=>r.json()).then(setA);},[]);
 return(<div>{a.map(x=><div key={x.order_id}>Order {x.order_id} - {x.total}</div>)}</div>);
}

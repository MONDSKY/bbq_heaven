
import {useState} from "react";
import API from "../utils/api";
export default function Login(){
 const [e,setE]=useState("");
 const [p,setP]=useState("");
 const login=async()=>{
  const res=await fetch(API+"login.php",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`email=${e}&password=${p}`});
  const d=await res.json();
  localStorage.setItem("token",d.token);
  window.location=d.role==="admin"?"/admin":"/customer";
 };
 return(<div className="center"><h1>BBQ Heaven</h1><input onChange={x=>setE(x.target.value)}/><input type="password" onChange={x=>setP(x.target.value)}/><button onClick={login}>Login</button></div>);
}

import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Admin from "./pages/Admin";
export default function App(){
 return(
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Login/>}/>
 <Route path="/customer" element={<Customer/>}/>
 <Route path="/admin" element={<Admin/>}/>
 </Routes>
 </BrowserRouter>
 );
}




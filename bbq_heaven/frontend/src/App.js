import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./pages/Login";
import Customer from "./pages/Customer";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Receipt from "./pages/Receipt";
import OrderTracking from "./pages/OrderTracking";

export default function App(){
 return(
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Login/>}/>
 <Route path="/customer" element={<Customer/>}/>
 <Route path="/admin" element={<Admin/>}/>
<Route path="/profile" element={<Private><Profile/></Private>}/>
<Route path="/receipt" element={<Receipt/>}/>
<Route path="/tracking" element={<OrderTracking/>}/>
 </Routes>
 </BrowserRouter>
 );
}




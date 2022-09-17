
import './App.css';
import React,{useContext} from "react";
import Home from './pages/Home'
import {Navbar} from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import Addproducts from './components/Addproducts';
import {ProductsContextProvider} from './context/ProductsContext'
import SignIn from './pages/SignIn'
import SignUp from './pages/Singup';
import  {userAuthContext}  from "./context/UserAuthContext";
import Cart from './pages/Cart';
import ProtectedRoutes from './pages/ProtectedRoutes'
import Cashout from './pages/Cashout';


function App() {
  const { user } = useContext(userAuthContext);
  return (
    <div className="App">
      <ProductsContextProvider>
      {user &&<Navbar/>}
      <Routes>
        <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
        <Route path="/addproduct" element={<ProtectedRoutes><Addproducts/></ProtectedRoutes>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/cartproducts" element={<ProtectedRoutes><Cart/></ProtectedRoutes>}/>
        <Route path="/cashout" element={<ProtectedRoutes><Cashout/></ProtectedRoutes>}/>
      </Routes>
      </ProductsContextProvider>
    </div>
  );
}

export default App;

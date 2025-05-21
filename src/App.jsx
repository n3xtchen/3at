import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout.jsx';
import Cart from './Components/Cart/Cart.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Products from './Components/Products/Products.jsx';
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import Home from './Components/Home/Home.jsx';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';
import { CartContextProvider } from './Context/CartContext/CartContext.jsx';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts.jsx';
import { WishListContextProvider } from './Context/WishListContext/WishListContext.jsx';
import WishList from './Components/WishList/WishList.jsx';
import CashOrder from './Components/CashOrder/CashOrder.jsx';
import OnlinePay from './Components/OnlinePay/OnlinePay.jsx';
import AllOrders from './Components/AllOrders/AllOrders.jsx';
import OrderDetails from './Components/OrderDetails/OrderDetails.jsx';

function App() {
  const [userData, setUserData] = useState(null)
  const [hash, setHash] = useState(null);
 
  function changeHref(value){
    setHash(value)
  }
 let routers = createHashRouter([
  {path:"" , element:<Layout hash = {hash}  userData = {userData} deleteUserData = {deleteUserData}/> , children:[
    {index:true , element: <ProtectedRoute ><Home  changeHref={changeHref}/></ProtectedRoute>},
    {path:"cart" , element:<ProtectedRoute ><Cart  changeHref={changeHref}/> </ProtectedRoute>},
    {path:"categories" , element:<ProtectedRoute  ><Categories  changeHref={changeHref}/> </ProtectedRoute>},
    {path:"products" , element:<ProtectedRoute  ><Products userData = {userData}  changeHref={changeHref} /> </ProtectedRoute>},
  
    {path:"allorders" , element:<ProtectedRoute ><AllOrders changeHref = {changeHref}/> </ProtectedRoute>},
    {path:"productDetails/:id" , element:<ProtectedRoute><ProductDetails/> </ProtectedRoute>},
    {path:"categoryproducts/:id" , element:<ProtectedRoute><CategoryProducts/> </ProtectedRoute>},
    {path:"orderdetails/:index" , element:<ProtectedRoute><OrderDetails/> </ProtectedRoute>},
    {path:"wishlist" , element:<ProtectedRoute><WishList  changeHref={changeHref}/></ProtectedRoute>},
    {path:"onlinepay" , element:<ProtectedRoute><OnlinePay/></ProtectedRoute>},
    {path:"cashorder" , element:<ProtectedRoute><CashOrder/></ProtectedRoute>},
    {path:"login" , element:<Login changeHref={changeHref} saveUserData = {saveUserData}/>},
    {path:"register" , element:< Register changeHref={changeHref}/>},
  ]}
 ])


 function saveUserData(){
  let encodedToken = localStorage.getItem("userToken");
   let decodedToken = jwtDecode(encodedToken) ;
   localStorage.setItem("id" , decodedToken.id)
   setUserData(decodedToken) ;
 }

useEffect(()=>{
  if(localStorage.getItem("userToken")){
    saveUserData();
   }
  
},[])

 function deleteUserData(){
  setUserData(null) ;
  localStorage.removeItem("userToken")
 }
 
  return <>
  <CartContextProvider userData = {userData}>
    <WishListContextProvider>
    <Toaster/>
    <RouterProvider router={routers}>

</RouterProvider>
</WishListContextProvider>
  </CartContextProvider>

  
  </> 
}

export default App;

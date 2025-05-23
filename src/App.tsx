import logo from './logo.svg';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import { useContext, useEffect, useState } from 'react';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { CartContextProvider } from './Context/CartContext/CartContext';
import CategoryProducts from './Components/CategoryProducts/CategoryProducts';
import { WishListContextProvider } from './Context/WishListContext/WishListContext';
import WishList from './Components/WishList/WishList';
import CashOrder from './Components/CashOrder/CashOrder';
import OnlinePay from './Components/OnlinePay/OnlinePay';
import AllOrders from './Components/AllOrders/AllOrders';
import OrderDetails from './Components/OrderDetails/OrderDetails';

import { UserContextProvider } from './Context/UserContext/UserContext';
import { ProductContextProvider } from './Context/ProductContext/ProductContext';

function App() {
  const [userData, setUserData] = useState(null)
  const [hash, setHash] = useState(null);

  function changeHref(value){
    setHash(value)
  }

  let routers = createHashRouter([
    {path:"" , element:<Layout hash = {hash}  userData = {userData} deleteUserData = {deleteUserData}/> , children:[
      {index:true , element: <Home  changeHref={changeHref}/>},
      {path:"login" , element:<Login changeHref={changeHref} saveUserData = {saveUserData}/>},
      {path:"register" , element:< Register changeHref={changeHref}/>},

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
    ]}
  ])

  function saveUserData(){
    // let encodedToken = localStorage.getItem("userToken");
    // localStorage.setItem("id" , decodedToken.id)
    let user_id = localStorage.getItem("id")
    setUserData(user_id) ;
  }

  useEffect(()=>{
    if(localStorage.getItem("access_token")){
      saveUserData();
    }
  },[])

  function deleteUserData(){
    setUserData(null);
    localStorage.removeItem("userToken")
  }
 
  return <>
    <UserContextProvider>
      <ProductContextProvider>
        <CartContextProvider userData = {userData}>
          <WishListContextProvider>
            <Toaster/>
            <RouterProvider router={routers} />
          </WishListContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </UserContextProvider>
  </> 
}

export default App;

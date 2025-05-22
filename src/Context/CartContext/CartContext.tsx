import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props){
 
 const [cartId, setCartId] = useState(null) ;
 const [cartOwner, setCartOwner] = useState(null) ;
 const [url, setUrl] = useState(window.location.origin) ;
 const [numOfCartItems, setNumOfCartItems] = useState(0) ;





 async function getUserCart(){
 
  axios.get(`https://route-ecommerce.onrender.com/api/v1/cart` , {
    headers
}).then((response)=> setNumOfCartItems(response.data.numOfCartItems) )
.catch((error)=>  console.log(error))


  
  
 }
useEffect(()=>{
  getUserCart();

},[])
  let headers = {
    token : localStorage.getItem("userToken")
  }

       
 

    function addToCart(productId){
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart` , {
            productId
        },{
            headers
        }).then((response)=>response)
          .catch((error)=>error)
    }
    function getLoggedUserCart(){
      return  axios.get(`https://route-ecommerce.onrender.com/api/v1/cart` , {
            headers
        }).then((response)=> response)
        .catch((error)=> error)
    }

    function deleteItem(productId){
      
   return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
        headers
      }).then((response)=>response)
      .catch((error)=>error);
    }

    function updateItem(productId,count){
      return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`, {
        count
      },{
        headers
      }).then((response)=>response)
      .catch((error)=>error);
    }
    function payOnline(shippingAddress,cartId){
     
      return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
        shippingAddress
      },{
        headers
      }).then((response)=>response)
      .catch((error)=>error);
    }
    function cashOrder(shippingAddress,cartId){
      
      return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/${cartId}`, {
        shippingAddress
      },{
        headers
      }).then((response)=>response)
      .catch((error)=>error);
    }

    async function getUserOrders(id){
      return axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${id}`).then((response)=> response)
      .catch((error)=>error)
  
      
   }

    return <cartContext.Provider value={{ cartId , numOfCartItems , setNumOfCartItems, payOnline , addToCart , getLoggedUserCart  , deleteItem , updateItem , cashOrder,numOfCartItems ,getUserOrders , setCartId , url}}>
{ props.children}
    </cartContext.Provider>
}
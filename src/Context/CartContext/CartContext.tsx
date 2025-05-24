import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props){
 
  const [cartId, setCartId] = useState(null) ;
  const [cartOwner, setCartOwner] = useState(null) ;
  const [url, setUrl] = useState(window.location.origin) ;
  const [numOfCartItems, setNumOfCartItems] = useState(0) ;
  
  let headers = {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token")
  }
  
  async function getUserCart() {
    axios.get(`https://127.0.0.1:5001/api/v1/cart`, {
      headers
    }).then((response)=> setNumOfCartItems(response.data.numOfCartItems) )
    .catch((error)=>  console.log(error))
  }
  
  useEffect(()=>{
    getUserCart();
  
  },[])
  
 
  async function addToCart(productId: number) {
    return axios.post(`http://127.0.0.1:5001/api/v1/cart` , {
      productId
    }, {
      headers
    }).then((response)=>response)
    .catch((error)=>error)
  }
  
  async function getLoggedUserCart(){
    return  axios.get(`https://127.0.0.1:5001/api/v1/cart`, {
      headers
    }).then((response)=> response)
    .catch((error)=> error)
  }
  
  async function deleteItem(productId: number) {
  
    return axios.delete(`http://127.0.0.1:5001/api/v1/cart/${productId}`, {
      headers
    }).then((response)=>response)
    .catch((error)=>error);
  }
  
  async function updateItem(productId, count){
    return axios.put(`http://127.0.0.1:5001/api/v1/cart/${productId}`, {
      count
    },{
      headers
    }).then((response)=>response)
    .catch((error)=>error);
  }
  
  async function payOnline(shippingAddress, cartId){
  
    return axios.post(`http://127.0.0.1:5001/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
      shippingAddress
    },{
      headers
    }).then((response)=>response)
    .catch((error)=>error);
  }
  
  async function cashOrder(shippingAddress, cartId){
  
    return axios.post(`http://127.0.0.1:5001/api/v1/orders/${cartId}`, {
      shippingAddress
    },{
      headers
    }).then((response)=>response)
    .catch((error)=>error);
  }
  
  async function getUserOrders(id){
    return axios.get(`http://127.0.0.1:5001/api/v1/orders/user/${id}`).then((response)=> response)
      .catch((error)=>error)
  }
  
  return <cartContext.Provider value={{ cartId , numOfCartItems , setNumOfCartItems, payOnline , addToCart , getLoggedUserCart  , deleteItem , updateItem , cashOrder,numOfCartItems ,getUserOrders , setCartId , url}}>
  { props.children}
  </cartContext.Provider>
}

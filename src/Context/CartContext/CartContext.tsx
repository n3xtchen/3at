import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export function CartContextProvider(props){
 
  const [url, setUrl] = useState(window.location.origin) ;
  const [numOfCartItems, setNumOfCartItems] = useState(0) ;
  const [cartDetails, setCartDetails] = useState(null);
  
  let headers = {
    access_token: localStorage.getItem("access_token"),
    refresh_token: localStorage.getItem("refresh_token"),
  }

  async function addToCart(bossId: number, productId: number, num: number) {
    return axios.post(`/api/v1/carts/create` , {
      "product_id": productId,
			"boss_id": bossId,
			num
    }, {
      headers
    }).then((response)=> {
      getLoggedUserCart()
      response
    })
    .catch((error)=>error)
  }
  
  async function getLoggedUserCart() {
    return  axios.get(`/api/v1/carts/list`, {
      headers
    }).then((response) => {
      if(response.data?.status === 200) {
        setNumOfCartItems(response.data.data.total) 
        setCartDetails(response.data.data.item)
      }
    })
    .catch((error)=> error)
  }
  
  async function deleteItem(id: number) {
    return axios.post(`/api/v1/carts/delete`, {
      id
    },{
      headers
    }).then((response)=> {
      setCartDetails(cartDetails.filter(item => item.id != id))
      setNumOfCartItems(numOfCartItems-1)
      response
    })
    .catch((error)=>error);
  }
  
  async function updateItem(id, num) {
    return axios.post(`/api/v1/carts/update`, {
      id,
      num
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

  useEffect(()=>{
    getLoggedUserCart()
  },[])
  
  return <cartContext.Provider value={{
    cartDetails, setCartDetails, numOfCartItems, setNumOfCartItems,
    addToCart, getLoggedUserCart, deleteItem, updateItem, 
    payOnline, cashOrder, getUserOrders, url}}>
  { props.children}
  </cartContext.Provider>
}

import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let wishlistContext = createContext();

export function WishListContextProvider(props){

    const [wishList, setWishList] = useState(null);
    const [numOfWishListItems, setNumOfWishListItems] = useState(0) ;
    let headers = {
        token : localStorage.getItem("userToken")
      }
 
    function getLoggedUserWishList(){
       return axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist` ,{
            headers
        }).then((response)=>(response))
        .catch((error)=>error)
    }
    function addToWishList(productId){
       return axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist` ,{
            productId
        },{
          headers
        }).then((response)=>(response))
        .catch((error)=>error)
    }
    function deleteFromWishList(productId){
       return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}` ,{
          headers
        }).then((response)=>(response))
        .catch((error)=>error)
    }

    async function getLikedProducts(){
      let {data} =  await getLoggedUserWishList();
      if(data?.status == "success"){
        setNumOfWishListItems(data.count)
      }
      
      }

      useEffect(()=>{
        getLikedProducts();
      },[])

    return <wishlistContext.Provider value={{getLoggedUserWishList,addToWishList,deleteFromWishList , numOfWishListItems , setNumOfWishListItems}}>
  {props.children}

    </wishlistContext.Provider>
 }
import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let wishlistContext = createContext();

export function WishListContextProvider(props){

    const [wishItems, setWishItems] = useState([]);
    const [numOfWishListItems, setNumOfWishListItems] = useState(0) ;
    const [likedProducts, setLikedProducts] = useState([]);

    let headers = {
      access_token: localStorage.getItem("access_token"),
      refresh_token: localStorage.getItem("refresh_token"),
    }

    async function getLoggedUserWishList(){
       return axios.get(`/api/v1/favorites/list` ,{
            headers
        }).then((response)=> {
          setWishItems(response.data.data.item)
          setNumOfWishListItems(response.data.data.total)
          setLikedProducts(response.data.data.item.map(item => item.product_id))
        })
        .catch((error)=>error)
    }

    async function addToWishList(product_id: number, boss_id: number) {
      return  await axios.post(`/api/v1/favorites/create`, {
        product_id,
        boss_id
      },{
        headers
      }).then((response)=> {
        setLikedProducts(likedProducts.concat([product_id]))
        return response
      })
      .catch((error)=>error)
    }

    function deleteFromWishList(product_id, number, boas_id: number){

      const prod = wishItems.filter(item => item.product_id === product_id)
      const id = prod[0].id

      return axios.post(`/api/v1/favorites/delete`, {
        id
      }, {
        headers
      }).then((response)=> {
        setLikedProducts(likedProducts.filter(id => id != product_id))
        return response 
      })
      .catch((error)=>error)
    }

    useEffect(()=>{
      getLoggedUserWishList()
    },[])

    return <wishlistContext.Provider value={{
      getLoggedUserWishList,
      wishItems, setWishItems,
      likedProducts, setLikedProducts,
      addToWishList, deleteFromWishList, 
      numOfWishListItems, setNumOfWishListItems}}>
      {props.children}
    </wishlistContext.Provider>
 }

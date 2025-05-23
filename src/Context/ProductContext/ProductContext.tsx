import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let productContext = createContext();

export function ProductContextProvider(props) {

  const [categories, setCategories] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [products, setProducts] = useState(null)
  const [productInfo, setProductInfo] = useState(null) ; 

  async function getCategories() {
    let {data} = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
      setCategories(data.data);
  }

  async function getCategoryProducts(id){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products?category=${id}`) ; 
      setCategoryProducts(data.data);
  }

  function getProducts() {
    axios.get(`http://127.0.0.1:5001/api/v1/product/list`).then(({data})=>{
      setProducts(data.data.item)
    })
  }

  function getProductDetails(id){
    axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`).then(({data})=>{
      setProductInfo(data.data);
    })
  }

  return <productContext.Provider value={{categories, getCategories, categoryProducts, getCategoryProducts, setProductInfo, products, setProducts, getProducts, getProductDetails}}>
    {props.children}
  </productContext.Provider>
}

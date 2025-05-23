import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {describe} from "vitest";

export let productContext = createContext();

export function ProductContextProvider(props) {

  const [categories, setCategories] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [products, setProducts] = useState(null)
  const [productInfo, setProductInfo] = useState(null) ; 

  async function getCategories() {
    let {data} = await  axios.get(`http://127.0.0.1:5001/api/v1/category/list`);
      setCategories(data.data.item);
  }

  async function getCategoryProducts(id: number){
    let {data} = await axios.get(`http://127.0.0.1:5001/api/v1/product/list?category_id=${id}`) ; 
    setCategoryProducts(data.data.item);
  }

  function getProducts() {
    axios.get(`http://127.0.0.1:5001/api/v1/product/list`).then(({data})=>{
      setProducts(data.data.item)
    })
  }

  function getProductDetails(id: string){
    axios.get(`http://127.0.0.1:5001/api/v1/product/show?id=${id}`).then(({data})=>{
      // title, images[] description price ratingsAverage
      const {title, img_path, price, name, id} = data.data
      let product = {
        id, price,
        title: name,
        description: title,
        images: [
          img_path, img_path
        ],
        ratingsAverage: 1
      }
      setProductInfo(product);
    })
  }

  return <productContext.Provider value={{categories, getCategories, categoryProducts, getCategoryProducts, setProductInfo, products, setProducts, getProducts, getProductDetails, productInfo}}>
    {props.children}
  </productContext.Provider>
}

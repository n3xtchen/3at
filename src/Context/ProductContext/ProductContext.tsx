import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let productContext = createContext({});

export interface Category {
  id: number,
  category_name: string
}

export interface Product {
  id: number,
  boss_id: number,
  category_id: number,
  category: Category,
  name: string,
  title: string,
  price: number,
  img_path: string,
  ratingsAverage: number
}

export function ProductContextProvider(props) {

  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState(null);
  const [products, setProducts] = useState<List<Product>>([])
  const [productInfo, setProductInfo] = useState(null) ; 

  async function getCategories() {
    axios.get(`/api/v1/category/list`).then(({data}) => {
      setCategories(data.data.item);
    })
  }

  async function getCategoryProducts(id: number){
    let {data} = await axios.get(`/api/v1/product/list?category_id=${id}`) ; 
    setCategoryProducts(data.data.item);
  }

  function getProducts() {
    axios.get(`/api/v1/product/list`).then(({data})=>{
      setProducts(data.data.item)
    })
  }

  function getProductDetails(id: string){
    axios.get(`/api/v1/product/show?id=${id}`).then(({data})=>{
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

  return <productContext.Provider value={{
    categories, getCategories, categoryProducts, getCategoryProducts,
    productInfo, setProductInfo, products, setProducts, getProducts, getProductDetails}}>
    {props.children}
  </productContext.Provider>
}

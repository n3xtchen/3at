import { useContext, useEffect, useLayoutEffect, useState } from 'react'

import { Product, productContext } from '../../Context/ProductContext/ProductContext'

import ProductView from '../Products/ProductView'

export default function FeaturedProducts() {

  let { products, getProducts } = useContext(productContext)

  useEffect(()=>{
    getProducts()
  },[])

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

  return <div className="row justify-content-center ">
    { products ? products.map(
      (product: Product, i: number) => <ProductView key={i} {...product} />
    ) : <div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'>
      <i className='fas fa-spinner fa-spin'></i>
    </div>}
  </div>
}

import { useContext, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom';

import { Product, productContext } from '../../Context/ProductContext/ProductContext';

import ProductView from '../Products/ProductView'

export default function CategoryProducts() {
  
  let {categoryProducts, getCategoryProducts} = useContext(productContext)

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  }, [])

  let {id}= useParams();

  useEffect(() => {
    getCategoryProducts(id);
  }, [])

  return <div className="row justify-content-center mt-5 ">
    { categoryProducts?    
      categoryProducts.length>0?
        categoryProducts.map(
          (product: Product, i: number) => <ProductView key={i} {...product} />
        ) : <div className=' d-flex justify-content-center align-items-center text-main '>
          <div className='text-center not-availbale'>
            <h2>No Products Available Now </h2>
            <i className="fa-solid fa-ban fa-5x"></i>
          </div>
        </div> : <div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'>
          <i className='fas fa-spinner fa-spin'></i></div>
    }
  </div>
}

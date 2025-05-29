import { useContext, useEffect, useLayoutEffect } from 'react'

import { wishlistContext } from '../../Context/WishListContext/WishListContext.jsx'

import { Product } from '../../Context/ProductContext/ProductContext'
import ProductView from '../Products/ProductView'

export default function WishList({changeHref}) {

  let { wishItems } =  useContext(wishlistContext);

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])  

  useEffect(()=>{
    changeHref(window.location.hash)
  },[])

  return <>
   { wishItems ?
     wishItems.length>0?
      <div className='mt-5'>
        <div className='d-flex justify-content-center'>
          <div className='heading '>
            <h2 className='text-center'>Get Your <span className='text-main '>WishList</span></h2>
          </div>
        </div>
        <div className='row justify-content-center mt-5'>
          { wishItems.map((product: Product, i: number)=> <ProductView key={i} {...product} /> )}
        </div>
      </div> : <div className='d-flex justify-content-center align-items-center  p-5'>
      <div className='text-center not-availbale '>
        <h2> WishList is <span className='text-main'>empty</span> </h2>
        <i className="fa-solid fa-ban fa-5x text-main"></i>
      </div>
    </div> : <div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>}
  </>
}

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import CartProduct from './CartProduct';
import { cartContext } from '../../Context/CartContext/CartContext'

export default function Cart({changeHref}) {

  let { cartDetails, numOfCartItems, getLoggedUserCart } = useContext(cartContext) ;

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
  },[])
  
  useEffect(() => {
    getLoggedUserCart();
    changeHref(window.location.hash)
  },[])

  return cartDetails ?  numOfCartItems>0 ?
    <div className=" mt-5 cart-details ">
      <div className="total-price">
        <h2 className=''>Shop Cart</h2>
        <h6 className='text-main'>Total Cart Price : {/*CartDetails.totalCartPrice*/}</h6>
      </div>
      {cartDetails.map((product, i) => <CartProduct {...product} />)}
      <Link to = {`/onlinepay`}>
        <button className='btn bg-main text-white mx-3'><i className="fa-brands fa-cc-visa px-1"></i>Online Pay</button>
      </Link>
      <Link to = {`/cashorder`}>
        <button className='btn bg-main text-white'><i className="fa-solid fa-money-bill px-1"></i>Cash order</button>
      </Link>
    </div>:<div className='d-flex justify-content-center align-items-center  p-5'>
      <div className='text-center text-main not-availbale '>
        <h2> Cart is empty </h2>
        <i className="fa-solid fa-ban fa-5x"></i>
      </div>
    </div> : <div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'>
    <i className='fas fa-spinner fa-spin'></i>
  </div>
}

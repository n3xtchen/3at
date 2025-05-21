import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts.jsx'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.jsx'
import MainSlider from '../MainSlider/MainSlider.jsx'
import { cartContext } from '../../Context/CartContext/CartContext.jsx'

export default function Home({changeHref}) {
  


  useEffect(()=>{
    if(window.location.href == "http://localhost:3000/allorders"){
      window.location.href = "http://localhost:3000/#/allorders"
    }
    changeHref((window.location.hash))
  })

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])
  return <>
  <MainSlider></MainSlider>
  <CategoriesSlider></CategoriesSlider>
 <FeaturedProducts></FeaturedProducts>
  </>
}

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'
import { cartContext } from '../../Context/CartContext/CartContext'

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

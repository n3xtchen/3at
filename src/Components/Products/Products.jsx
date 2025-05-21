import React, { useEffect, useLayoutEffect } from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'

export default function Products({changeHref}) {

 
  useEffect(()=>{

    changeHref((window.location.hash))
  })
  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])
  return <div className='mt-4'>

<FeaturedProducts>
    
    </FeaturedProducts>
  </div>
}

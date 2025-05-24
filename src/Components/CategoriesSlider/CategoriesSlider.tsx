import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Slider from "react-slick";
import { productContext } from '../../Context/ProductContext/ProductContext';

export default function CategoriesSlider() {

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])
  let settings = {
   dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  // bug: useContext is not a function or its return value is not iterable
  const { categories, getCategories } = useContext(productContext);

  useEffect(()=>{
    getCategories();
  },[])

  return <>
    <div className='p-1 my-5'>
      <h3 className='my-3'>Shop Popular <span className='text-main'>Categories</span></h3>
      {categories? 
      <Slider {...settings} className='px-2'>
        {categories.map((category, i) => <div className='category' key={i}>
          <img  width={'100%'} src={category.img_path} alt="" />
          <h4 className='h6 text-center my-2'>{category.name}</h4>
        </div>)}
      </Slider>:<div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>
      }
    </div>
  </>
}

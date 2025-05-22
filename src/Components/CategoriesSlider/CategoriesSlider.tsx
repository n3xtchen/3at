import axios from 'axios'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Slider from "react-slick";
import { cartContext } from '../../Context/CartContext/CartContext';

export default function CategoriesSlider() {

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1 ,
    autoplay: true, 
      autoplaySpeed: 2000, 
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

let [categories, setCategories] = useState(null);
//  async function getCategories(){

//   let {data} = await  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
//   setCategories(data.data)
//   }
function getCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
setCategories(data.data)

  })
}
  useEffect(()=>{
    getCategories();
  },[])
  return <>
 <div className='p-1 my-5'>
 <h3 className='my-3'>Shop Popular <span className='text-main'>Categories</span></h3>
  {categories? 
  
  <Slider {...settings} className='px-2'>
{categories.map((category,i)=><div className='category' key={i}>
 <img  width={'100%'} src={category.image} alt="" />
 <h4 className='h6 text-center my-2'>{category.name}</h4>
 
</div>)}
    </Slider>:<div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>}
 </div>
  
  </>
}

import React from 'react'
import Slider from "react-slick";

import slider1 from "../../assets/img/slider-image-1.jpeg"
import slider2 from "../../assets/img/slider-image-2.jpeg"  
import slider3 from "../../assets/img/slider-image-3.jpeg"  
import slider4 from "../../assets/img/grocery-banner-2.jpeg"
import slider5 from "../../assets/img/grocery-banner.png" 
import slider6 from "../../assets/img/slider-2.jpeg"    

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1 ,
    autoplay: true, 
      autoplaySpeed: 2000, 
      
  
  };
  return <>
  <Slider {...settings} className='mt-5 py-2 px-2'>
   <div className='slider'><img className='w-100'  src={slider1} alt="" /></div>
   <div className='slider'><img className='w-100'  src={slider2} alt="" /></div>
   <div className='slider'><img className='w-100'  src={slider3} alt="" /></div>
   <div className='slider'><img className='w-100'  src={slider4} alt="" /></div>
   <div className='slider'><img className='w-100'  src={slider5} alt="" /></div>
   <div className='slider'><img className='w-100'  src={slider6} alt="" /></div>
    </Slider>
  
  </>
}

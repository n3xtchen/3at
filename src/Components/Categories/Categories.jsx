import axios from 'axios'
import React, { useEffect , useLayoutEffect, useState} from 'react'
import { Link } from 'react-router-dom';

export default function Categories({changeHref}) {
 const [categories, setCategories] = useState(null);
 async function getCategories(){
  let {data} = await  axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`);
  setCategories(data.data);

  }
  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])
useEffect(() => {
  
  changeHref((window.location.hash))
 
 getCategories();

}, [])

  return <>
  <div className='mt-5'>
  {categories? <div className="row  justify-content-center">
  {categories.map((category,i)=><div key={i} className='col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12'>
<Link to={`/categoryproducts/${category._id}`}>
<div className="category">
  <div className='d-flex justify-content-center'>
  <img src={category.image} className='w-100' alt={category.name} />
  </div>
  <h2 className='h6 text-main text-center my-3'>{category.name}</h2>
</div>

</Link>

  </div>)}
 </div>:
 <div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>

 
 }
  </div>

  
  </>
}

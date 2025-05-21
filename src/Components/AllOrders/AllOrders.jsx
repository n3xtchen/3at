
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext/CartContext.jsx'
import { Link } from 'react-router-dom';

export default function AllOrders({changeHref}) {
 
 const [orders, setOrders] = useState(null)
 let {getUserOrders} =  useContext(cartContext)

 useLayoutEffect(()=>{
  document.documentElement.scrollTop = 0;
},[])
async  function getOrders(){

let id = await localStorage.getItem("id")
let {data} = await getUserOrders(id);

  setOrders(data)

}


 useEffect(()=>{
  changeHref(window.location.hash)
getOrders()

 },[])

  return <>
{orders?
orders.length > 0 ?
<div className='mt-5'>
<div className='d-flex justify-content-center'>
    <div className='heading '>
   <h2 className='text-center'>Get Your <span className='text-main '>Orders</span></h2>
   </div>
    </div>
<div className="row mt-5 justify-content-center">
  {orders.map((order , i)=><div key={i} className='col-lg-3 col-md-4 col-sm-6 col-12'>
  <Link to = { `/orderdetails/${i}`}>  <div className='order text-center position-relative p-3 '>
      <span className='position-absolute top-0 start-50 bg-white px-2 text-main translate-middle-x fw-bolder'>{i+1}</span>
    <i className="fa-solid fa-box "></i>
    <h2 className='position-absolute top-50 start-50 bg-white px-2 text-main translate-middle'>Order</h2>
    
    </div></Link>
</div>)}
</div>

</div>:<div className='d-flex justify-content-center align-items-center  p-5'>

<div className='text-center not-availbale '>
  <h2> You Don,t have <span className='text-main'>Ordres</span> </h2>
  <i className="fa-solid fa-ban fa-5x text-main"></i>
</div>
</div>




:<div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>}
   
  </>

}


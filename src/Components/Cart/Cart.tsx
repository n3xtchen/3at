import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext/CartContext'
import { Link } from 'react-router-dom';

export default function Cart({changeHref}) {
 let {getLoggedUserCart ,deleteItem ,updateItem , setCartId , setNumOfCartItems,numOfCartItems} = useContext(cartContext) ;
  const [CartDetails, setCartDetails] = useState(null);
  const [deletedId, setDeletedId] = useState(null);
  const [icreaseId, setIncreaseId] = useState(null);
  const [decreseId, setDecreseId] = useState(null);

 async function getCart(){

  
    let response =   await getLoggedUserCart() ;
    if(response?.data?.status === "success"){
     setCartDetails(response.data.data) ;
     setCartId(response.data.data._id)
     
    
  
    
  }
  


 

 }
  

 useLayoutEffect(()=>{
  document.documentElement.scrollTop = 0;
},[])
 async function deleteProduct(productId){
  setDeletedId(productId);
let response =  await deleteItem(productId);
if(response?.data?.status == "success")
{
 
  setCartDetails(response.data.data) ;
  setNumOfCartItems(response.data.numOfCartItems)

}

 }
 async function updateProduct(productId,count,value){
  if(value == 1)
  {
    setIncreaseId(productId)
    let response =  await updateItem(productId,count)
    if(response?.data.status == "success"){
      console.log(response.data.data)
      setCartDetails(response.data.data);
      setIncreaseId(null)
     
  }

 
  }else
  {
    setDecreseId(productId);
    let response =  await updateItem(productId,count)
    if(response?.data.status == "success"){
      
      setCartDetails(response.data.data)
    
      setDecreseId(null);
  }

  }
 }
 useEffect(()=>{
getCart();
  changeHref(window.location.hash)
 },[])
  return <>
  {CartDetails?
 numOfCartItems>0?
  <div className=" mt-5 cart-details ">
    <div className="total-price">
      <h2 className=''>Shop Cart</h2>
      <h6 className='text-main'>Total Cart Price : {CartDetails.totalCartPrice}</h6>
    </div>
    {CartDetails.products.map((product , i)=><div key={i} className='row justify-content-around  my-2 px-0 py-4 cart-item align-items-center py-2 border-bottom'>
   
   
   <div className="col-lg-10 col-md-8 col-6 d-flex align-items-center  ">
   <img src={product.product.imageCover} className='cart-img mx-2' alt="" />
    <div >
      <h6>{product.product.title.split(" ").slice(0,2).join(" ")}</h6>
      <h6 className='text-main'>price : {product.price}</h6>
     {deletedId == product.product.id? <button className='delete-btn'><i className='fas fa-spinner fa-spin p-0 m-0'></i><span className='px-1'>Removing...</span></button>: <button className='delete-btn' onClick={()=>deleteProduct(product.product.id)}><i className='fa-regular  fa-trash-can  p-0 m-0'></i><span className='px-1'>Remove</span></button>}
    </div>
 
   </div>
   <div className='col-lg-2 col-md-4 col-6'>
      {icreaseId == product.product.id?<button className='btn update-btn border-main btn-sm'><i className='fas fa-spinner fa-spin text-center'></i></button>:<button onClick={()=>updateProduct(product.product.id,product.count+1,1)} className='btn update-btn border-main btn-sm'>+</button>}
      <span className='px-2'>{product.count}</span>
      {decreseId == product.product.id?<button className='btn update-btn border-main btn-sm'><i className='fas fa-spinner fa-spin'></i></button>: <button onClick={()=>updateProduct(product.product.id,product.count-1,-1)}  className='btn update-btn border-main btn-sm'>-</button>}
     
    </div>
 


    </div>)}
   <Link to = {`/onlinepay`}><button className='btn bg-main text-white mx-3'><i className="fa-brands fa-cc-visa px-1"></i>Online Pay</button></Link>
   <Link to = {`/cashorder`}><button className='btn bg-main text-white'><i className="fa-solid fa-money-bill px-1"></i>Cash order</button></Link>
  </div>:<div className='d-flex justify-content-center align-items-center  p-5'>

  <div className='text-center text-main not-availbale '>
    <h2> Cart is empty </h2>
    <i className="fa-solid fa-ban fa-5x"></i>
</div>
  </div>
  :<div className='w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x'><i className='fas fa-spinner fa-spin'></i></div>}
 
  </>
}

import { useFormik } from 'formik'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext/CartContext';
import { useParams } from 'react-router-dom';
import * as Yup from "yup" ;
export default function OnlinePay() {
  
  let {payOnline , cartId ,setNumOfCartItems , url} =  useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(null);
   async function handleSubmit(values){
    setIsLoading(true);
   let response  =  await payOnline(values,cartId);
   if(response?.data?.status == "success"){
    setNumOfCartItems(null)
    setIsLoading(false);
    window.location.href = response.data.session.url
    console.log(response)
   }
    }

    let validationSchema = Yup.object({
      details:Yup.string().required(),
      phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/ , "enter valid EG Number"),
      city:Yup.string().required(),
    
     })
    let formik = useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:""
        },validationSchema,
        onSubmit:handleSubmit
    })
    useLayoutEffect(()=>{
      document.documentElement.scrollTop = 0;
    },[])
    useEffect(()=>{
      setCheck(Math.random())
    },[])
  return <>
  <div className="w-75 py-5 mx-auto cash m mt-5">
    <h2 className='text-center'>Checkout <span className='text-main'>Info</span></h2>
    <p className=' text-center'>please write your <span className='text-main'>adderess , phone and city</span>  <br/> to contact with you to recieve your order</p>
<form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
    <label className='mt-2' htmlFor="details">Address Details : </label>
    <input value={formik.values.details} onChange={formik.handleChange} className='form-control' type="text" name="details" id="details" />
    {formik.errors.details && formik.touched.details ? <div className="alert alert-danger">{formik.errors.details}</div>:""}

    <label className='mt-2' htmlFor="phone">Phone : </label>
    <input value={formik.values.phone} onChange={formik.handleChange} className='form-control' type="text" name="phone" id="phone" />
    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div>:""}

    <label className='mt-2' htmlFor="city">city : </label>
    <input value={formik.values.city} onChange={formik.handleChange} className='form-control' type="text" name="city" id="city" />
    {formik.errors.city && formik.touched.city ? <div className="alert alert-danger">{formik.errors.city}</div>:""}

    {isLoading?<button  className='bg-main btn text-white mt-2 w-100'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='bg-main btn text-white mt-2 w-100'>Pay</button>}

</form>
  </div>
  
  </>
}

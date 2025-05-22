import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup" ;
import { cartContext } from '../../Context/CartContext/CartContext';
import toast from 'react-hot-toast';
export default function Login({saveUserData , changeHref}) {
  let {addToCart,deleteItem} = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
 let validationSchema = Yup.object({
  email:Yup.string().required().email(),
  password:Yup.string().required().min(6).max(40)

 })



 useEffect(()=>{
  changeHref(window.location.hash)
 },[])

 let navigate = useNavigate();

function handleLogin(values){
  setIsLoading(true);
  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin` , values).then(({data})=>{
    setIsLoading(false);
 
    localStorage.setItem("userToken" , data.token)
    saveUserData();
   navigate("/")
  }).catch((error)=>{
   setErrorMsg(error.response.data.message)
    setIsLoading(false);
  })
}
  let formik = useFormik({
    initialValues:{
   
      email:"",
      password:""
   
    },validationSchema,
    onSubmit:handleLogin
  })
  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])
  return <>
   <div className="w-75 mx-auto form mt-5  py-5 login-container">
    <h2>Login Now :</h2>
    {errorMsg? <div className="alert alert-danger">{errorMsg}</div>:""}
    <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
     
      <label className='mt-1' htmlFor="email">email : </label>
      <input type="email" className='form-control  '  onChange={formik.handleChange} value={formik.values.email} name='email' id='email' />
      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div>:""}

      <label className='mt-1' htmlFor="password">password : </label>
      <input type="password" className='form-control  '  onChange={formik.handleChange} value={formik.values.password} name='password' id='password' />
      {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div>:""}
      
      
    {isLoading?<button  className='bg-main btn text-white mt-2'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='bg-main btn text-white mt-2'>Login</button>}
   
      
    </form>
   </div>
  </>
}

import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup" ;
export default function Register({changeHref}) {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
 let validationSchema = Yup.object({
  name:Yup.string().required().min(3).max(10),
  email:Yup.string().required().email(),
  password:Yup.string().required().min(6).max(40),
  rePassword:Yup.string().required().oneOf([Yup.ref("password")] , "rePassword dosn,t match password"),
  phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/ , "enter valid EG Number"),
 })
 useLayoutEffect(()=>{
  document.documentElement.scrollTop = 0;
},[])

 useEffect(()=>{
  changeHref(window.location.hash);
 } , [])
 let navigate = useNavigate();

function handleRegister(values){
  setIsLoading(true);
  axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup` , values).then(()=>{
    setIsLoading(false);
   
  
   navigate("/login")
  }).catch((error)=>{
   setErrorMsg(error.response.data.message)
    setIsLoading(false);
  })
}
  let formik = useFormik({
    initialValues:{
      name:"" ,
      email:"",
      password:"",
      rePassword:"" ,
      phone:"",
    },validationSchema,
    onSubmit:handleRegister
  })
  return <>
   <div className="w-75 mx-auto form mt-5 py-4 py-lg-5">
    <h2>Register Now :</h2>
    {errorMsg? <div className="alert alert-danger">{errorMsg}</div>:""}
    <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
      <label className='mt-1' htmlFor="name">name : </label>
      <input type="text" className='form-control ' onChange={formik.handleChange} value={formik.values.name} name='name' id='name' />
{formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div>:""}

      <label className='mt-1' htmlFor="email">email : </label>
      <input type="email" className='form-control '  onChange={formik.handleChange} value={formik.values.email} name='email' id='email' />
      {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div>:""}

      <label className='mt-1' htmlFor="password">password : </label>
      <input type="password" className='form-control '  onChange={formik.handleChange} value={formik.values.password} name='password' id='password' />
      {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div>:""}
      <label className='mt-1' htmlFor="rePassword">rePassword : </label>

      <input type="password" className='form-control '  onChange={formik.handleChange} value={formik.values.rePassword} name='rePassword' id='rePassword' />
      {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div>:""}

      <label className='mt-1' htmlFor="phone">phone : </label>
      <input type="phone" className='form-control '  onChange={formik.handleChange} value={formik.values.phone} name='phone' id='phone' />
      {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div>:""}
    {isLoading?<button  className='bg-main btn text-white mt-2'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='bg-main btn text-white mt-2'>Register</button>}
   
      
    </form>
   </div>
  </>
}

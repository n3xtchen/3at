import { useFormik } from 'formik'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup" ;
import { cartContext } from '../../Context/CartContext/CartContext';
import {userContext} from '../../Context/UserContext/UserContext';

import { Navigate } from 'react-router-dom'

export default function Login({saveUserData , changeHref}) {

  let {addToCart,deleteItem} = useContext(cartContext);
  const {isLoading, setIsLoading, errorMsg, setErrorMsg, handleLogin} = useContext(userContext)

  let validationSchema = Yup.object({
    user_name:Yup.string().required(),
    password:Yup.string().required().min(6).max(40)
  })

  useEffect(()=>{
    changeHref(window.location.hash)
  },[])

  let navigate = useNavigate();

  let formik = useFormik({
    initialValues:{
      user_name:"",
      password:""
    },validationSchema,
    onSubmit:(values) => handleLogin({values, saveUserData, navigate})
  })

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

  return <>
    <div className="w-75 mx-auto form mt-5  py-5 login-container">
      <h2>Login Now :</h2>
      {errorMsg? <div className="alert alert-danger">{errorMsg}</div>:""}
      <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
        <label className='mt-1' htmlFor="user_name">user_name : </label>
        <input type="text" className='form-control  '  onChange={formik.handleChange} value={formik.values.user_name} name='user_name' id='user_name' />
        {formik.errors.user_name && formik.touched.user_name ? <div className="alert alert-danger">{formik.errors.user_name}</div>:""}
        <label className='mt-1' htmlFor="password">password : </label>
        <input type="password" className='form-control  '  onChange={formik.handleChange} value={formik.values.password} name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div>:""}
        {isLoading?<button  className='bg-main btn text-white mt-2'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='bg-main btn text-white mt-2'>Login</button>}
      </form>
    </div>
  </>
}

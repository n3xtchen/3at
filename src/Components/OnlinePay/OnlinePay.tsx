import { useLayoutEffect, useState, useContext, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup" ;
import { APIProvider } from '@vis.gl/react-google-maps';
import { PaymentElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import toast from 'react-hot-toast'

import { cartContext } from '../../Context/CartContext/CartContext';
import AddressForm from '../Address/AddressForm';

export function OnlinePayForm() {

  // todo: 管理环境变量
  const [isLoading, setIsLoading] = useState(false);
  let {payOnline, cartId, setNumOfCartItems} =  useContext(cartContext);

  const stripe = useStripe()
  const elements = useElements();

  const paymentElementOptions = {
    layout: "accordion"
  }

  let validationSchema = Yup.object({
    details: Yup.string().required(),
    // todo: 手机号验证，如 .matches(/^01[0125][0-9]{8}$/ , "enter valid Phone Number")
    phone: Yup.string().required(),
    city: Yup.string().required(),
  })

  let formik = useFormik({
    initialValues:{
      // todo: 获取当前的地址
      details:"",
      phone:"",
      city:"",
      payment: ""
    }, validationSchema, onSubmit:handleSubmit
  })

  async function handleSubmit(e) {

    if (!stripe && !elements) {
      return
    }

    setIsLoading(true);

    let orderId = 0;

    const { error } = await stripe.confirmPayment({
       elements,
       confirmParams: {
         return_url: `${window.location.protocol}//${window.location.host}/#/orderdetails/${orderId}`
       }
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
    setIsLoading(false);
  }

  return <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
    <AddressForm formik={formik} />
    <label className='mt-2' htmlFor="pyment">Payment: </label>
    <PaymentElement options={paymentElementOptions} />
    {isLoading ? <button  className='bg-main btn text-white mt-2 w-100' id="address-submit"><i className='fas fa-spinner fa-spin'></i></button> : 
      <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='bg-main btn text-white mt-2 w-100'>Pay</button>}
  </form>
}

export default function OnlinePay() {

	const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  const STRIPE_API_KEY = import.meta.env.VITE_STRIPE_PUB_KEY

  const stripePromise = loadStripe(STRIPE_API_KEY);
  const [clientSecret, setClientSecret] = useState("");

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

  useEffect(() => {
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] })
    })
    .then((response) => response.json())
    .then((data) => setClientSecret(data.clientSecret));
  }, [])

  return <div className="w-75 py-5 mx-auto cash m mt-5">
      <h2 className='text-center'>Checkout <span className='text-main'>Info</span></h2>
      <p className=' text-center'>please write your <span className='text-main'>adderess , phone and city</span>  <br/> to contact with you to recieve your order</p>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} >
        {clientSecret && <Elements stripe={stripePromise} options={{clientSecret}}>
          <OnlinePayForm />
        </Elements>}
      </APIProvider>
    </div>
}

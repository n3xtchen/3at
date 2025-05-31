import { useFormik } from 'formik'
import { useContext, useEffect, useLayoutEffect, useState, useRef } from 'react'
import { cartContext } from '../../Context/CartContext/CartContext';
import * as Yup from "yup" ;

import {
  APIProvider,
  ControlPosition,
  MapControl,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  useAdvancedMarkerRef,
  AdvancedMarkerRef
} from '@vis.gl/react-google-maps';


const PlaceAutocomplete = (props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address']
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    // placeAutocomplete.addListener('place_changed', () => {
    //   onPlaceSelect(placeAutocomplete.getPlace());
    // });
  }, [/*onPlaceSelect,*/ placeAutocomplete]);

  return (
      <input {...props} className="form-control" ref={inputRef} />
  );
};
export default function OnlinePay() {
  
	const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  let {payOnline , cartId ,setNumOfCartItems , url} =  useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(null);

 const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  async function handleSubmit(values){
    setIsLoading(true);
		console.log(values)
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
    // phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/ , "enter valid EG Number"),
    phone:Yup.string().required(),
    city:Yup.string().required(),

  })

  let formik = useFormik({
    initialValues:{
      details:"",
    },validationSchema,
    onSubmit:handleSubmit
  })

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

  useEffect(()=>{
    setCheck(Math.random())
  },[])

  return <APIProvider apiKey={GOOGLE_MAPS_API_KEY} >
  <div className="w-75 py-5 mx-auto cash m mt-5">
    <h2 className='text-center'>Checkout <span className='text-main'>Info</span></h2>
    <p className=' text-center'>please write your <span className='text-main'>adderess , phone and city</span>  <br/> to contact with you to recieve your order</p>
<form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
    <label className='mt-2' htmlFor="details">Address Details : </label>

		{/*
    <input value={formik.values.details} onChange={formik.handleChange} className='form-control' type="text" name="details" id="details" />
		*/}

		<PlaceAutocomplete name="detial" />

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
  
  </APIProvider>
}

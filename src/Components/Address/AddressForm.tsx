import { useFormik } from 'formik'
import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import * as Yup from "yup" ;

import {
  useMapsLibrary
} from '@vis.gl/react-google-maps';

export default function AddressForm({handleSubmit, isLoading}) {

  let validationSchema = Yup.object({
    details:Yup.string().required(),
    // todo: .matches(/^01[0125][0-9]{8}$/ , "enter valid Phone Number")
    phone:Yup.string().required(),
    city:Yup.string().required(),
  })

  let formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:""
    }, validationSchema, onSubmit:handleSubmit
  })

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

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

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();
      if (place && place.formatted_address) {
          formik.setFieldValue("details", place.formatted_address)
      }
    });
  }, [placeAutocomplete]);

  useEffect(()=>{
  },[])

  return <form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
    <label className='mt-2' htmlFor="details">Address Details : </label>
    <input value={formik.values.details}  onChange={formik.handleChange} className='form-control' type="text" name="details" id="details" ref={inputRef} />
    {formik.errors.details && formik.touched.details ? <div className="alert alert-danger">{formik.errors.details}</div>:""}
    
    <label className='mt-2' htmlFor="phone">Phone : </label>
    <input value={formik.values.phone} onChange={formik.handleChange} className='form-control' type="text" name="phone" id="phone" />
    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div>:""}
    
    <label className='mt-2' htmlFor="city">city : </label>
    <input value={formik.values.city} onChange={formik.handleChange} className='form-control' type="text" name="city" id="city" />
    {formik.errors.city && formik.touched.city ? <div className="alert alert-danger">{formik.errors.city}</div>:""}
    
    {isLoading?<button  className='bg-main btn text-white mt-2 w-100'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='bg-main btn text-white mt-2 w-100'>Pay</button>}
  </form>
}


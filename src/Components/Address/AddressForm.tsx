import { useEffect, useLayoutEffect, useState, useRef } from 'react'

import { useMapsLibrary } from '@vis.gl/react-google-maps';

export default function AddressForm({formik}) {

  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

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

  return <>
    <label className='mt-2' htmlFor="details">Address Details : </label>
    <input value={formik.values.details}  onChange={formik.handleChange} className='form-control' type="text" name="details" id="details" ref={inputRef} />
    {formik.errors.details && formik.touched.details ? <div className="alert alert-danger">{formik.errors.details}</div>:""}
    
    <label className='mt-2' htmlFor="phone">Phone : </label>
    <input value={formik.values.phone} onChange={formik.handleChange} className='form-control' type="text" name="phone" id="phone" />
    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div>:""}
    
    <label className='mt-2' htmlFor="city">city : </label>
    <input value={formik.values.city} onChange={formik.handleChange} className='form-control' type="text" name="city" id="city" />
    {formik.errors.city && formik.touched.city ? <div className="alert alert-danger">{formik.errors.city}</div>:""}
    </>
}


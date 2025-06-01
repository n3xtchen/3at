import { useContext, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIProvider } from '@vis.gl/react-google-maps';

import { cartContext } from '../../Context/CartContext/CartContext';
import AddressForm from '../Address/AddressForm';

export default function CashOrder() {

  // todo: 管理环境变量
	const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  let navigate = useNavigate();
  let {cashOrder, cartId, setNumOfCartItems} =  useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(values){
    setIsLoading(true);
    let response  =  await cashOrder(values,cartId);
    if(response?.data?.status == "success"){
      setNumOfCartItems(0)
      setIsLoading(false);
      navigate("/allorders")
    }
  }

  useLayoutEffect(()=>{
    document.documentElement.scrollTop = 0;
  },[])

  return <APIProvider apiKey={GOOGLE_MAPS_API_KEY} >
  <div className=" w-75 cash py-5 mx-auto m mt-5">
    <h2 className='text-center'>Checkout <span className='text-main'>Info</span></h2>
    <p className=' text-center'> please write your <span className='text-main'>adderess , phone and city</span>  <br/> to contact with you to recieve your order</p>
    <AddressForm handleSubmit={handleSubmit} isLoading={isLoading} />
  </div>
  </APIProvider>
}

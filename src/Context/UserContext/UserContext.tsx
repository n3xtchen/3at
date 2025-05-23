import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export function UserContextProvider(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  function handleLogin({values, setUserData, navigate}){
    setIsLoading(true);
    axios.post(`http://localhost:5001/api/v1/auth/login` , values).then(({data})=>{
      setIsLoading(false);
      localStorage.setItem("userToken" , data.token)
      localStorage.setItem("userToken" , data.token)
      saveUserData();
      navigate("/")
    }).catch((error)=>{
      setErrorMsg(error.response.data.message)
      setIsLoading(false);
    })
  }

  function handleRegister({values, navigate}){
    setIsLoading(true);
    axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup` , values).then(()=>{
      setIsLoading(false);
      navigate("/login")
    }).catch((error)=>{
      setErrorMsg(error.response.data.message)
      setIsLoading(false);
    })
  }

  return <userContext.Provider value={{isLoading, setIsLoading, errorMsg, setErrorMsg, handleLogin, handleRegister}}>
    {props.children}
  </userContext.Provider>
}



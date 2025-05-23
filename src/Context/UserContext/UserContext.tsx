import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let userContext = createContext();

export function UserContextProvider(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  function handleLogin({values, saveUserData, navigate}){
    setIsLoading(true);
    axios.post(`http://127.0.0.1:5001/api/v1/user/login` , values).then(({data})=>{
      const {user, access_token,refresh_token} = data.data;
      const {id,user_name, avatar, nickname, email} = user;

      localStorage.setItem('id', id);
      localStorage.setItem('user_name', user_name);
      localStorage.setItem('nick_name', nickname);
      localStorage.setItem('avatar', avatar);
      localStorage.setItem('email', email);
      localStorage.setItem("access_token" , access_token)
      localStorage.setItem("refresh_token" , refresh_token)
      saveUserData()
      navigate("/")
    }).catch((error)=>{
      setErrorMsg(error.response.data.message)
      setIsLoading(false);
    })
  }

  function handleRegister({values, navigate}){
    setIsLoading(true);
    axios.post(`http://127.0.0.1:5001/api/v1/user/register` , values).then(()=>{
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



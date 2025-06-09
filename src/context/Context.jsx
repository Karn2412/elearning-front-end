import axios from "axios";
import {  createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const UserContextProvider =({children}) =>{
    const [user, setUser] = useState([])
    const [isAuth, setIsAuth] = useState(false)
    const [btnLodiing, setBtnLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState("");

async function loginUser(email,password,navigate,fecthMyCourse) {
    setBtnLoading(true)

    try {
        const {data} = await axios.post(`${server}/api/user/login`,{email,password})
         console.log('login response',data);
         
        toast.success(data.message)
        localStorage.setItem("token",data.token)
        setUser(data.user)
        setIsAuth(true)
        setBtnLoading(false)
        navigate('/')
        fecthMyCourse()
    } catch (error) {
        setBtnLoading(false)
        setIsAuth(false)
        toast.error(error.response.data.message)
        
    }
}
async function registerUser(name, email,password,navigate) {
    setBtnLoading(true)

    try {
        const {data} = await axios.post(`${server}/api/user/register`,{name,email,password})
         console.log('login response',data);
         
        toast.success(data.message)
        localStorage.setItem("activationToken",data.activationToken)
        setBtnLoading(false)
        navigate('/verify')
    } catch (error) {
        setBtnLoading(false)
  
        toast.error(error.response.data.message)
        
    }
}

async function fecthUser() {
    try {
        const {data} = await axios.get(`${server}/api/user/me`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        setIsAuth(true)
        setUser(data.user)
        setLoading(false)
    } catch (error) {
        console.log(error);
        setLoading(false)
    }
}
async function verifyOtp(otp,navigate) {
    setBtnLoading(true)
    const activationToken = localStorage.getItem("activationToken")
    try {
        const {data} = await axios.post(`${server}/api/user/verify`,{
            otp,
            activationToken
        })
        toast.success(data.message)
        
        navigate('/login')
        localStorage.clear()
        setBtnLoading(false)
    } catch (error) {
        
        setBtnLoading(false)
        toast.error(error.response.data.message)
        
    }
}

useEffect(()=>{
    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));}
    
},[])

useEffect(()=>{
    if (token) {
        fecthUser()
    }
},[token])

    return <UserContext.Provider value={{user,token,setUser,isAuth,setIsAuth,fecthUser , loginUser,registerUser ,verifyOtp ,btnLodiing,loading}}>
         {children} 
         <Toaster/>
         </UserContext.Provider>
}

export const UserData = ()=> useContext(UserContext)
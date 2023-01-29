import React, { useContext, useState } from 'react'
import { Form, Navigate, redirect, useNavigate } from 'react-router-dom'
import Topbar from '../../components/topbar/Topbar'
import './signin.scss';
import axios from 'axios'
import { useEffect } from 'react';
import { UserContext } from '../../Context';

const Signin =  () => {
    
    const {authorised,setAuthorised,user,setUser} = useContext(UserContext)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(false)
    var payload 
    
    
    const onclick = async (e) =>{
        e.preventDefault()
      try{
          const res = await axios.post('http://localhost:8000/api/v1/login',payload, { withCredentials: true })
          setUser(res.data.user)
          setAuthorised(res.data.success)
          Navigate("/signin")
          
          
        }catch(e){
            
            setError(true)
        }
    }
    
    
    useEffect(() => {
        payload = {
            "email": email,
            "password": password
        }
        setError(false)
        
    },[email,password]);
    
    
    return (
        <div className="container">
        <Topbar/>
        <div className="tileContainer">
            <div className="left">
                <div className="iconContainer">
                    <img src={process.env.PUBLIC_URL + '/signin/icon.svg'} style={{height:'100%',objectFit:'contain'}} alt="" />
                </div>
                <form method='POST' className="form">
                    <div className="input">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder=''  onChange={(e)=>{
                            
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="input">
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder='' onChange={(e)=>{
                            setPassword(e.target.value)
                        }} />
                    </div>
                    <div className="signin">
                        <button type='button' onClick={onclick}> Submit</button>
                    </div>
                    <div className='errorSpace'>
                    {error && <h6>Wrong credentials !</h6>}
                    </div>
                </form>
            </div>
            <div className="right">
                        <img src={process.env.PUBLIC_URL + '/signin/signin.png'}  alt="" />

            </div>
                        
            </div>
    </div>
  )
}

export default Signin
import axios from 'axios';
import React, { useState } from 'react'
import Topbar from '../../components/topbar/Topbar';
import './Signup.scss';

const Signup = () => {
    const [allValues, setAllValues] = useState({
        name:"",
        email:"",
        password:"",
        contact:""
     });
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
     }

    const onSignup = async (e) =>{
        console.log(allValues)
        e.preventDefault()
      try{
          const res = await axios.post('http://localhost:8000/api/v1/signup',allValues, { withCredentials: true })
          
          
          
        }catch(e){
            
           console.log(e)
        }
    }

  return (
    <div className="container">
    <Topbar/>
    <div className="tileContainer">
        <div className="left">
            <div className="iconContainer">
                <img src={process.env.PUBLIC_URL + '/signup/icon.svg'} style={{height:'100%',objectFit:'contain'}} alt="" />
            </div>
            <form method='POST' className="form">
            <div className="input">
                <label htmlFor="">Username</label>
                <input type="text" placeholder='' name='name' onChange={changeHandler} />
            </div>
            <div className="input">
                <label htmlFor="">Email</label>
                <input type="text" placeholder='' name='email'  onChange={changeHandler} />
            </div>
            <div className="input">
                <label htmlFor="">Contact</label>
                <input type="number" placeholder='' name='contact'  onChange={changeHandler} />
            </div>
            <div className="input">
                <label htmlFor="">Password</label>
                <input type="text" placeholder='' name='password' onChange={changeHandler} />
            </div>
            <div className="signin">
                <button onClick={onSignup} type='submit'> Submit</button>
            </div>
        </form>
        </div>
        <div className="right">
                    <img src={process.env.PUBLIC_URL + 'signup/image.png'}  alt="" />

        </div>
                    
        </div>
</div>


  )
}

export default Signup
import axios from 'axios'
import React, { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context'
import './topbar.scss'

// IMPORT ICON
import { MenuOutlined  } from '@ant-design/icons';

const Topbar = () => {
  
  const {authorised,setAuthorised,user,setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const logoutFunction = async (e) =>{
    // const {setUser,setAuthorised} = props.state
    e.preventDefault()
  try{
      
      const res = await axios.get('http://localhost:8000/api/v1/logout', { withCredentials: true })
      setUser(null)
      setAuthorised(!res.data.success)
      console.log(res.data)
      navigate("/")
      
    }catch(e){
        
        // setError(true)
    }
}

  return (
    <div className='topbar'>
      <div className="left">
      <Link to='/' className='link'>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/topbar/Needed.svg'} style={{height:'100%'}}/>
        </div>
      </Link>
      </div>
    
      {
      user?(  <div className="right">
      <Link to='/myposts' className='link'>
        <div >
            <h4>Myposts</h4>
          </div>
      </Link>
      <Link to='/myorders' className='link'>
        <div >
            <h4>MyOrders</h4>
          </div>
      </Link>
      <Link to='/myoffers' className='link'>
        <div >
            <h4>MyOffers</h4>
          </div>
      </Link>
      <Link to='/' onClick={logoutFunction} className='link'>
        <div >
            <h4>Logout</h4>
          </div>
      </Link>

        <h4 style={{color:'#EB6440'}}>Hi {user.name.toUpperCase()}</h4>
      
        <div className="menu">
              <MenuOutlined className='menuIcon' />
         </div>
      </div>):  <div className="right">
 
  
      <Link to='/signin' className='link'>
        <div >
            <h4>Signin</h4>
          </div>
      </Link>
      <Link to='/signup' className='link'>
        <div >
            <h4>Signup</h4>
          </div>
      </Link>
        <div className="menu">
        <MenuOutlined className='menuIcon' />
         </div>
      </div>
      }
       
    </div>
  )
}

export default Topbar
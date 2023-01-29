import React, { useContext, useEffect } from 'react'
import _ from 'lodash'
import Topbar from '../../components/topbar/Topbar'
import './SellOrder.css'
import { Link, Navigate, redirect, useLocation, useNavigate  } from "react-router-dom";
import { UserContext } from '../../Context';
import { useState } from 'react';
import axios from 'axios';


const SellOrder = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { item,postOwnerData } = location.state
    const [orderDetails,setorderDetails] = useState({})
    const [price,setPrice] = useState(0)
    const [place,setPlace] = useState("")
    const [message,setMessage] = useState("")
    const [file,setFile] = useState([])
    const [loading,setLoading] = useState(true)
    
    
    const {authorised,setAuthorised,user,setUser} = useContext(UserContext)
    const handleUpload = e => {
        setFile(e.target.files)
        console.log(e.target.files)
     }

//    console.log({
//     'ad_id':item._id,
//     'price':6564,
//     'ad_owner':item.user,
//     'place':"custom_place"
//    })


   useEffect(() => {
    setorderDetails({
        'ad_id':item?._id,
        'price':price,
        'ad_owner':item?.user,
        'place':place,
        'message':message
    })
     
   }, [])
   

    const createOrder = async (e) =>{
        setorderDetails({
            'ad_id':item?._id,
            'price':price,
            'ad_owner':item?.user,
            'place':place
        })
        
        setLoading(true)
        e.preventDefault();
        console.log(file)
        console.log(orderDetails)
          
        
        const formData = new FormData();
        formData.append('ad_id', orderDetails.ad_id);
        formData.append('price', price);
        formData.append('ad_owner_id', orderDetails.ad_owner);
        formData.append('place', orderDetails.place);
        formData.append('message', orderDetails.message);


        // CHECK SINGLE PHOTO OR NOT
        if(file.length == 1){
            console.log(` single file length : ${file.length}`)
            formData.append('photos', file[0])
        }else{
            console.log(`mULTI file length : ${file.length}`)
            _.forEach(file,file=>{
                    formData.append('photos',file)
            })
        }
        
     
        // Display the values
            // for (const value of formData.values()) {
            // console.log(value);
            // }

        const res = await axios.post('http://localhost:8000/api/v1/order/create',formData, { withCredentials: true }).then(
        
        (res)=>{
                // setLoading(false)
                // changeUploadStatus(res.data.success)
                console.log(res.data)
                
               

            }).catch((e)=>{
                console.log(e)
            })
 
     
    }

  return (
    <div>
    <Topbar/>   
    <div className="body">
        <div className="containerSellOrder">
            <div className="leftOrder">
            <div className="formContainer">
            {
                authorised? <form action="">
                <table className='table_order'>
                    <tr>
                        <th colSpan={2}>Create a Offer</th>
                    </tr>
                    <tr>
                        <td>
                            <h4>Price : </h4>
                        </td>
                        <td>
                            <input type="Number" placeholder='Eg.5000'  onChange={(e)=>setPrice(e.target.value)}/>
                        </td> 
                        
                    </tr>
                    <tr>
                        <td>
                            <h4>Place : </h4>
                        </td>
                        <td>
                            <input type="text" placeholder='Eg. Edapally ,Kochi , kerala' onChange={(e)=>setPlace(e.target.value)}/>
                        </td>
                    </tr>
           
                    <tr>
                        <td>
                            <h4>Photo :  </h4>
                        </td>
                        <td>
                            <input type="file" multiple  onChange={handleUpload} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4>Message :  </h4>
                        </td>
                        <td>
                            <textarea type="text"  className='textArea' onChange={(e)=>setMessage(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <div className="submit">
                            {/* <Link to='/myorders'> */}
                            <button onClick={createOrder}>Submit</button>
                            {/* </Link> */}
                        </div>
                    </tr>
                </table>
            </form> :(<div className="loginALert">
                <h3  onClick={()=>navigate("/signin")}>Login to order</h3>
            </div>)
            
            }    
        </div>
            </div>
            <div className="rightOrder">

             <table>
                <tr>
                    <h1 className='heading'>Product Details</h1>
                </tr>
              
                <tr>
                    <td>Name</td>
                    <td>{item.name}</td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td>{item.place} </td>
                </tr>
              
                <tr className='row'>
                    <td>Price</td>
                    <td>
                        <span>{item.fromPrice}</span>
                        <span>  -  </span>
                        <span>{item.toPrice}</span>
                    </td>
                </tr>
                <tr className='row'>
                    <td  colspan="3" className='td_button'>
                        <div className="logoContainer">

                            <div className="buyerlogo">
                                <img src="logo512.png" alt="ddd" className='buyerImage'/>
                            </div>
                            </div>
                            <div className="buyerDetails">
                                <h3>User : {postOwnerData?.name}</h3>
                                <h3>Role : {postOwnerData?.role}</h3>
                            </div>

                    </td>
                </tr>
            </table>
            </div>
        
</div>
    </div>
    </div>
  )
}

export default SellOrder
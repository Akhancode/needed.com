import React, { useEffect } from 'react'
import Topbar from '../../components/topbar/Topbar'
import './OfferDetails.css'
import OfferItem from '../../components/offetItem/OfferItem'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Carousal from '../../components/carousal/Carousal'

const OfferDetails = () => {
  const location = useLocation()
    console.log(location.state)
    const [adDetails,setadDetails] = useState([])
    const [orderOwner,setorderOwner] = useState([])
    //GET OFFER DETAILS
    let offer = location.state
    //GET AD DETAILS
    const getAdDetails = async() => {
      await axios
       .get(`http://localhost:8000/api/v1/buyers/ads/${offer.ad_id}`,{withCredentials:true})
       .then(res => {
         setadDetails(res.data.ad)
         console.log(res.data)
       })
       .catch(error => console.log(error));
       };
       
    const getOrderOwnerDetails = async() => {
      await axios
       .get(`http://localhost:8000/api/v1/user/${offer.order_owner}`,{withCredentials:true})
       .then(res => {
        setorderOwner(res.data.user)
         console.log(res.data)
       })
       .catch(error => console.log(error));
       };
    
    const onAcceptOffer = async () =>{
      console.log("accepted offer ")
      await axios (`http://localhost:8000/api/v1/order/AcceptOffer/${offer._id}`,{method:'PUT',withCredentials:true})
      .then(res => {
      //  setorderOwner(res.data.user)
        console.log(res.data)
      })
      .catch(error => console.log(error));


    }
    
    useEffect(() => {
      
      getAdDetails()
      getOrderOwnerDetails()
    }, [])
    


    return (
    <div className='fullContainer'>
        <Topbar/>        
        <div className="detailsContainer">
            <div className="leftOffer">
             <Carousal isThumbnail={true} photos={offer.photos}/>
            </div>  
            <div className="rightOffer">
              <table>
                <tr>
                  <td>Product Name : </td>
                  <td><label htmlFor="">Maruti suzuki</label></td>
                </tr>
                <tr>
                  <td>Offer Price : </td>
                  <td><label htmlFor="">${offer.price}</label></td>
                </tr>
                <tr>
                  <td>Place : </td>
                  <td><label htmlFor="">Edappally kochi</label></td>
                </tr>
                <tr>
                  <td>Seller : </td>
                  <td><label htmlFor="">{orderOwner.name}</label></td>
                </tr>
                <tr>
                  <td>Message : </td>
                  <td rowSpan="2" className='message'><textarea className='messageDiv'>
                  {offer.message}
                   </textarea></td>
                </tr>
              
              
              </table>
              {/* <Link to='/myoffers' className="buyBtn">Accept Offer</Link> */}
              <button  className="buyBtn" onClick={onAcceptOffer}> Accept Offer</button>
                 
            </div>  
        </div>    
    </div>
  )
}

export default OfferDetails

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OfferItem from '../../components/offetItem/OfferItem'
import Topbar from '../../components/topbar/Topbar'
import "./OfferList.css"

const OfferList = () => {

  const [myoffers,setMyOffers] = useState([])
  const getPostsData = async() => {
    await axios
     .get("http://localhost:8000/api/v1/order/myoffers",{withCredentials:true})
     .then(res => {
       setMyOffers(res.data)
       console.log(res.data)
     })
     .catch(error => console.log(error));
     };
  useEffect(() => {
    getPostsData()
    console.log(myoffers)
    
    
  }, [])

  return (
    <div className='Container'>
        <Topbar/>
        <div className="scrollview">    

        {
            myoffers.myoffers?.map((offer)=>{
              return(
                <OfferItem state={offer}/>
              )
            })
        }      
        </div>

    </div> 
  )
}

export default OfferList
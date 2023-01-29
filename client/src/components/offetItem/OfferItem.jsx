import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import Carousal from '../carousal/Carousal'
import './offerItem.scss'

import RoomIcon from '@mui/icons-material/Room';

const OfferItem = ({state}) => {
    console.log(state)
  return (
    <div className="itemContainer">
    <div className="leftItems">
            <Carousal photos={state.photos} isThumbnail={false}/>
        {/* <img src={photos[0].secure_url} alt="Not Found" className='imageLIst'/>     */}
    </div>        
    <div className="rightItem">
        <div className="left">
            <div className="category">
                {state.category}category
            </div>
            <div className="titleContainer">
                {
                    state.status == "pending"?(
                        <label htmlFor="" className="title">{state.status.toUpperCase()}</label>
                        ):<label htmlFor="" className="title_Accepted">{state.status.toUpperCase()}</label>
                }
            </div>
            <div className="price">INR {state.price}</div>
            <div className="place">
                <div className="locationlogo"><RoomIcon style={{color:'#EB6440'}}/></div>
                <div className="placeName">{state.place}</div>
            </div>
        </div>
        <div className="right">
                <Link className='subcontainer'to='/myoffers/details' state={state} 
                        >
                    <div className="editBtn">
                        MORE
                    </div>

                </Link>
            <div className="delete"><span>Decline</span></div>
                {/* <button className='tradebtn'>Trade</button> */}
            <div className="date">{format(new Date(state.createdAt), 'yyyy/MM/dd')}</div>
        </div>
    </div>
</div>
        // <div className="item">
        //     <div className="leftItem">
        //        <Carousal photos={state.photos} isThumbnail={false}/>
        //     </div>        
        //     <div className="rightItem">
        //         <div className="topContainer">
        //             <div className="priceContainer">
        //             <h3>Order</h3>
        //             &nbsp;&nbsp; 
        //             <h3 >-</h3>
        //             &nbsp;&nbsp; 
        //             <h3>${state.price}</h3>
        //             </div>
        //             <Link to='/myoffers/details' state={state} className="buyBtn">More</Link>
        //         </div>
        //         <div className="detailsContainer">
        //             <div className="leftDetail">
        //                 <label htmlFor="">Name : <label htmlFor="">Maruti</label></label>
        //                 <label htmlFor="">Place : <label htmlFor="">{state.place}</label></label>
        //                 <label htmlFor="">Category : <label htmlFor="">AutoMobiles</label></label>
        //             </div>
        //             <div className="rightDetails">
        //                 <h2>{state.status}</h2>
        //                 <h5></h5>
                    
        //             </div>
        //         </div>    
        //     </div>        
        // </div>
   
  )
}

export default OfferItem
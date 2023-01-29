import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import Carousal from '../carousal/Carousal'
import './MyPostItem.scss'


import RoomIcon from '@mui/icons-material/Room';
const MyPostItem = ({ad}) => {
  return (
        // <div className="item">
        //     <div className="leftItem" style={{maxHeight:'300px',maxWidth:'inherit',alignSelf:'center'}}>
        //         <Carousal photos={ad.photos} isThumbnail={false} height="100%"/>
               
        //     </div>        
        //     <div className="rightItem">
        //         <div className="topContainer">
        //             <div className="priceContainer">
        //             <h3>{ad.fromPrice}</h3>
        //             &nbsp;&nbsp; 
        //             <h3 >-</h3>
        //             &nbsp;&nbsp; 
        //             <h3>{ad.toPrice}</h3>
        //             </div>
        //             <div className="btnContainer">
        //                 <Link to="/sell/order" className="editBtn">
        //                    <h3>Edit</h3> 
        //                 </Link>
        //                 <div className="deleteBtn">
        //                     <h3>Delete</h3>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="detailsContainer">
        //             <div className="leftDetail">
        //                 <label htmlFor="">Name : <label htmlFor="">{ad.name}</label></label>
        //                 <label htmlFor="">Place : <label htmlFor="">{ad.place}</label></label>
        //                 <label htmlFor="">Category : <label htmlFor="">{ad.category}</label></label>
        //             </div>
        //             <div className="rightDetails">
        //                 <h2>Pending</h2>
        //                 <h5></h5>
                    
        //             </div>
        //         </div>    
        //     </div>        
        // </div>
        <div className="itemContainer">
        <div className="leftItems">
                <Carousal photos={ad.photos} isThumbnail={false}/>
            {/* <img src={photos[0].secure_url} alt="Not Found" className='imageLIst'/>     */}
        </div>        
        <div className="rightItem">
            <div className="left">
                <div className="category">
                    {ad.category}
                </div>
                <div className="titleContainer">
                    <label htmlFor="" className="name">{ad.name.toUpperCase()}</label>
 
                </div>
                <div className="price">INR {ad.fromPrice} - {ad.toPrice}</div>
                <div className="place">
                    <div className="locationlogo"><RoomIcon style={{color:'#EB6440'}}/></div>
                    <div className="placeName">{ad.place}</div>
                </div>
            </div>
            <div className="right">
                    <div className="topRight">

                                    <div className="editBtns">
                                        
                                <Link className='subcontainer'to='/myoffers/details' state={ad} 
                                        >
                                    
                                       <span className="subcontainer">MORE</span> 
                                    
                
                                </Link>
                                            </div>
                            <div className="delete"><span>Decline</span></div>
                    </div>
                    {/* <button className='tradebtn'>Trade</button> */}
                <div className="date">{format(new Date(ad.createdAt), 'yyyy/MM/dd')}</div>
            </div>
        </div>
    </div>
   
  )
}

export default MyPostItem
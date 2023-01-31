import { format } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import Carousal from '../carousal/Carousal'
import './MyPostItem.scss'


import RoomIcon from '@mui/icons-material/Room';
const MyPostItem = ({ad}) => {
    console.log(ad)
  return (
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
                                        
                                <Link className='subcontainer'to='/myposts/update' state={ad} 
                                        >
                                    
                                       <span className="subcontainer">EDIT</span> 
                                    
                
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
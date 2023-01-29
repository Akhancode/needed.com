import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context'
import Carousal from '../carousal/Carousal'
import './listItem.scss'
import RoomIcon from '@mui/icons-material/Room';
import { format } from 'date-fns';
// import TextFit from 'react-textfit';

const ListItem = (props) => {
    const {fromPrice,toPrice,category,place,description,name,photos,createdAt} = props.state.item
    const {authorised,setAuthorised,user,setUser} = useContext(UserContext)
    console.log(user)
    console.log(props.state.item)
  return (
        <div className="itemContainer">
            <div className="leftItems">
                    <Carousal photos={photos} isThumbnail={false} height="10%"/>
                {/* <img src={photos[0].secure_url} alt="Not Found" className='imageLIst'/>     */}
            </div>        
            <div className="rightItem">
                <div className="left">
                    <div className="category">
                        {category}
                    </div>
                    <div className="title">
                        <label htmlFor="" className="titlelabel">{name.toUpperCase()}</label>
                    </div>
                    <div className="price">INR {fromPrice} - {toPrice}</div>
                    <div className="place">
                        <div className="locationlogo"><RoomIcon style={{color:'#EB6440'}}/></div>
                        <div className="placeName">{place}</div>
                    </div>
                </div>
                <div className="right">
                        <Link className='subcontainer' to='/item' state={{item:props.state.item}}
                                >
                            <div className="tradebtn">
                                TRADE
                            </div>

                        </Link>
                    <div className="details"><span>Details</span></div>
                        {/* <button className='tradebtn'>Trade</button> */}
                    <div className="date">{format(new Date(createdAt), 'yyyy/MM/dd')}</div>
                </div>
              
                {/* <div className="topContainer">
                    <div className="priceContainer">
                    <h3>${fromPrice}</h3>
                    &nbsp;&nbsp; 
                    <h3 >-</h3>
                    &nbsp;&nbsp; 
                    <h3>${toPrice}</h3>
                    </div>{
                       ( user?._id == props.state.item.user) ?<Link  to='/item' style={{color:'orange',borderColor:'orange'}} state={{item:props.state.item}}
                        className="buyBtn">Edit</Link>
                        :<Link  to='/item' state={{item:props.state.item}}
                        className="buyBtn">Sell</Link>
                          }
                    
                </div>
                <div className="detailsContainer">
                    <div className="leftDetail">
                        <label htmlFor="">Name : <label htmlFor="">{name}</label></label>
                        <label htmlFor="">Place : <label htmlFor="">{place}</label></label>
                        <label htmlFor="">Category : <label htmlFor="">{category}</label></label>
                    </div>
                    <div className="rightDetail">
                        <label htmlFor="">Description : <label htmlFor="" className='description'>{description}</label></label>
                        
                    </div>
                </div>     */}
            </div>        
        </div>
   
  )
}

export default ListItem
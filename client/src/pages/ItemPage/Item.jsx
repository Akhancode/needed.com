
import React, { useEffect, useState } from 'react'
import './Item.scss'
import Topbar from '../../components/topbar/Topbar'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Carousal from '../../components/carousal/Carousal'


const Item = (props) => {

    
    //Sample address: http://localhost:3000/?id=55&name=test
    // const queryParams = new URLSearchParams(window.location.search);
    // const id = queryParams.get('id');
    // const name = queryParams.get('name');
    // const type = queryParams.get('type');
    // console.log(id, name, type); // 55 test null


    const location = useLocation()
    // console.log(location.state)
     const { item } = location.state
     const [postOwnerData,setPostOwnerData ] = useState({})
     const [itemData,setitemData ] = useState({})
     const getPostOwnerData = async() => {
        await axios
         .get(`http://localhost:8000/api/v1/user/${item.user}`)
         .then(res => {
           setPostOwnerData(res.data.user)
           console.log(postOwnerData)
         })
         .catch(error => console.log(error));
         };

     const getAdData = async() => {
        await axios
         .get(`http://localhost:8000/api/v1/wantedtobuy/ads/${item._id}`)
         .then(res => {
        //    setPostOwnerData(res.data.user)
           setitemData(res.data.ad)
           
         })
         .catch(error => console.log(error));
         };
        
       useEffect(   () => {
         getPostOwnerData()
         getAdData()
       }, [])
  return (
  <div className="body">
        <Topbar/>
      <div className='ItemContainer'>
        <div className="imageContainer">
            <Carousal photos={item.photos}  isThumbnail={true} />
            {/* <img src="logo192.png" alt="" className='itemImage' /> */}
        </div>
        <div className="ItemDetailContainer">
            <table>
                <tr>
                    <h1 className='heading'>Product Details</h1>
                </tr>
              
                <tr>
                    <td>Name</td>
                    <td>{itemData.name}</td>
                </tr>
                <tr>
                    <td>Place</td>
                    <td>{itemData.place} </td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>
                        <span>{itemData.fromPrice}</span>
                        <span>  -  </span>
                        <span>{itemData.toPrice}</span>
                    </td>
                </tr>
                <tr>
                    <td  colspan="2" className='td_button'>
                        <Link to='/sell/order' state={{ item:itemData ,postOwnerData }} className='sellOrder'>
                        SELL ORDER
                        </Link>
                    </td>
                </tr>
                <tr>
       

                </tr>
            </table>
            <table>

                <tr>
                                <div className="buyerInfoContainer">
                    <div className="logoContainer">

                        <div className="buyerlogo">
                            <img src="logo192.png" alt="" className='buyerImage'/>
                        </div>
                    </div>
                    <div className="buyerDetails">
                    <ul>
                        <li>Buyer Name  :  {postOwnerData?.name}</li>
                        <li>Buyer role  :  {postOwnerData?.role}</li>
                    </ul>
                    </div>
                    </div>
                </tr>
              
                
            </table>
            
        </div>
        
      </div>
    
  </div>
    
  )
}

export default Item
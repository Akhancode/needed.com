
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/orderItem/OrderItem'
import Topbar from '../../components/topbar/Topbar'
import './OrderList.css'

const OrderList = ({}) => {

  const [myorders,setMyOrders] = useState([])
  const getPostsData = async() => {
    await axios
     .get("http://localhost:8000/api/v1/order/myorders",{withCredentials:true})
     .then(res => {
       setMyOrders(res.data)
       console.log(res.data)
     })
     .catch(error => console.log(error));
     };
  useEffect(() => {
    getPostsData()
    console.log(myorders.myorders)
    
    
  }, [])
  


  return (
    <div className='ContainerOrder'>
      <Topbar/>
      <div className="scrollview">
      <h4>My Total Orders  : {myorders.total_orders}</h4>
      {
        myorders?.myorders?.map((order)=>{
          return(
            <OrderItem state={{ad_id:order.ad_id,photos:order.photos,place:order.place,price:order.price,status:order.status,createdAt:order.createdAt}}/>
          )
        })
      }
      {/* <OrderItem/>s */}
      </div>
    </div>
  )
}

export default OrderList
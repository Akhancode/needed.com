import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import BottomBar from '../../components/bottombar/BottomBar'
import ListItem from '../../components/listItem/ListItem'
import Topbar from '../../components/topbar/Topbar'
import './buyersPage.css'
const BuyerPage = () => {
  const [buyerData,setBuyerData] = useState([])
  var res
  const dataCollection = async () =>{
    try{
          
      res = await axios.get('http://localhost:8000/api/v1/wantedtobuy/ads')
      setBuyerData( Array.from(res.data))
      
    }catch(e){
        
        return e
    }
  }
  const getPostsData = async() => {
   await axios
    .get("http://localhost:8000/api/v1/wantedtobuy/ads")
    .then(res => {
      setBuyerData(res.data)
      console.log(res.data)
    })
    .catch(error => console.log(error));
    };
   
  useEffect(   () => {
    getPostsData()
  
  }, [])
  
  return (
  <div className="Container">
    <Topbar />
    <div className="viewContainer" >
  
     {
      buyerData?.ads?.map((item)=><ListItem  state={{fromPrice:item.fromPrice,item}}/>)
     }
       
       
    </div>
    {/* <BottomBar/> */}
  </div>
    )
}

export default BuyerPage
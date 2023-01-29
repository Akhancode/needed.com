
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MyPostItem from '../../components/mypostItem/MyPostItem'
import Topbar from '../../components/topbar/Topbar'
import { UserContext } from '../../Context'
import './MyPostList.css'
const MyPostList = ({}) => {

  const [mypost,setMyPost] = useState([])
  const getPostsData = async() => {
    await axios
     .get("http://localhost:8000/api/v1/buyers/myads",{withCredentials:true})
     .then(res => {
       setMyPost(res.data)
       console.log(res.data)
       
     })
     .catch(error => console.log(error));
     };
  useEffect(() => {
    getPostsData()
    setTimeout(() => {
      console.log(mypost)
      
    }, 3000);
  }, [])
  
  return (
    <div className='ContainerOrder'>
      <Topbar/>
      <div className="scrollview">
      <h4>My Total Ads : {mypost.total_ads}</h4>
      {
        mypost?.ads?.map((ad)=>{
          return(
            <MyPostItem ad={ad}/>
          )
        })
      }

      {/* <MyPostItem/>
      <MyPostItem/> */}
      </div>
    </div>
  )
}

export default MyPostList
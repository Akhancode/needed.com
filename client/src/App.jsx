
import './App.css';
import Home from './pages/home/Home';
import PostAd from './pages/postAdBuy/PostAd';
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Route,Routes, Link, Navigate } from "react-router-dom";
import BuyerPage from './pages/buyers/BuyerPage';
import Item from './pages/ItemPage/Item';
import SellOrder from './pages/sellOrder/SellOrder';
import OrderList from './pages/orderList/OrderList';
import OfferList from './pages/OfferList/OfferList';
import OfferDetails from './pages/offerDetails/OfferDetails';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';
import { UserContext } from './Context';
import Carousal from './components/carousal/Carousal';
import MyPostList from './pages/mypostsList/MyPostList';

function App() {
  const {authorised,setAuthorised,user,setUser} = useContext(UserContext)
  return (
  <Router>
    <div className="App">
       {/* <div className="body"> */}
          <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/signup' element={<Signup  />}/>
              <Route path='/signin' element={authorised?<Navigate replace to={'/'}  />:<Signin />}/>
              <Route path='/item' element={<Item/>}/>
              <Route path='/myorders' element={<OrderList  />}/>
              <Route path='/myoffers/details' element={<OfferDetails />}/>
              <Route path='/myoffers' element={<OfferList />}/>
              <Route path='/sell' element={<BuyerPage/>}/>
              <Route path='/postAd/buy' element={<PostAd />}/>
              <Route path='/sell/order' element={<SellOrder/>}/>
              <Route path='/myposts' element={<MyPostList/>}/>
          </Routes>
       {/* </div> */}
    </div>
  </Router>
      
        
    //     <Home/>
    //     {/* <PostAd/> */}
  );
}

export default App;

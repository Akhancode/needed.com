import React from 'react'
import { Link } from 'react-router-dom'
import "./postContainer.scss"
const PostContainer = (props) => {
    const {user} = props.state
  return (
    <div className='postContainer'>
        <div className="buyAd">
            <div className="titleBuy">
                <h3>Find best sellers <br></br>By Posting a Ad</h3>
            </div>
            <div className="postAdContainer">
                <Link to='/postAd/buy' className='link' state={{ user}}>
                    <button className="postBtn">
                        <h5>  Create One</h5>  

                    </button>
                </Link>
            </div>
        </div>
        <div className="buyAd">
            <img src={process.env.PUBLIC_URL + '/topbar/imageHome.png'} style={{height:'100%',objectFit:'contain'}}/>
        </div>

    </div>
  )
}

export default PostContainer
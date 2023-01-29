import React from 'react'
import { Link } from 'react-router-dom'
import "./BottomBar.css"

const BottomBar = () => {
  return (
    <div className='BottomBar'>

        <div className="rightBottom" style={{color:'grey',cursor:'not-allowed'}}>Buy</div>
        <Link to='/sell' className="leftBottom">Sell</Link>
    </div>
  )
}

export default BottomBar
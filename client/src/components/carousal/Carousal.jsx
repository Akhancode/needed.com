import React from 'react'
// import './CarousalCSS.css'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const demoData= [
    {
        img: "https://media.istockphoto.com/id/1175434292/photo/full-length-photo-of-cheerful-girl-with-curly-hairstyle-jump-show-horned-sign-rock-on-pank.jpg?s=612x612&w=0&k=20&c=wCA5Fs8oJ7xH4-ZlBKAHEikD0CRccrADojiyxXAIt3k=",
    },
    {

        img: "https://media.istockphoto.com/id/1128925057/photo/full-length-body-size-view-of-her-she-nice-pretty-attractive-cheerful-cheery-sportive-slim.jpg?s=612x612&w=0&k=20&c=3GpKxmGBKaxzVuY71iVvx9PxobGc2k4rDJXdDBQoCqE=",
    },
    {
        img: "https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg",
    }
]
var showThumbnail = false

const Carousal = ({photos,isThumbnail}) => {
    showThumbnail = isThumbnail
    const onClickItem =()=>{
        console.log("onClickItem")
    }
    const onClickThumb =()=>{
        console.log("onClickThumb")
    }

  return (


    <Carousel  
     onClickItem={onClickItem} showThumbs={showThumbnail} onClickThumb={onClickThumb}
    >
    {
        photos.map((item)=>{
                // console.log(item)
            return(
                <div style={{width:'inherit',maxHeight:'100%',display:'flex',justifyContent:'center'}}>
                    <img src={item.secure_url} style={{maxHeight:'260px',width:'100%',objectFit:'contain'}} />  
                </div>

            )
        })
    }
    </Carousel>
  )
}

export default Carousal
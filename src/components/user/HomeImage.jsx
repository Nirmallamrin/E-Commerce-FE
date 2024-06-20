import React from 'react'
import Image from "../assets/image2.jpg";
import ImageTwo from "../assets/image3.jpg"

const HomeImage = () => {
  return (
    <div>
        <div className="gap-3">
      
      <img
        src={Image} 
        alt="Example Image"
       
        style={{ cursor: 'pointer' }} 
      />
    
      
    </div> 
    </div>
  )
}

export default HomeImage
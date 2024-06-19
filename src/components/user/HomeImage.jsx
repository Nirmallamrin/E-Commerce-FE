import React from 'react'
import Image from "../assets/image2.jpg";

const HomeImage = () => {
  return (
    <div>
        <div>
      
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
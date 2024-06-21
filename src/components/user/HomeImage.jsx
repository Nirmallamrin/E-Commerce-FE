import React from "react";
import Image from "../assets/image2.jpg";
import ImageTwo from "../assets/image4.jpg";

const HomeImage = () => {
  return (
    <div className="flex flex-col">
      
        <div className="m-4">
        <img
         src={Image}
         alt="Example Image" 
         style={{ cursor: "pointer"}} />
         </div>
  
      
    </div>
  );
};

export default HomeImage;

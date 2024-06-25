import React from "react";
import Image from "../assets/image2.jpg";
import Shop3 from "../assets/shop3.jpg";
import Shop5 from "../assets/shop5.jpg";
import Shop6 from "../assets/shop6.jpg";
import Image4 from "../assets/image4.jpg";

const HomeImage = () => {
  return (
    <div className="flex flex-col">
      <div className="m-4">
        <img src={Image} alt="Example Image" style={{ cursor: "pointer" }} />
      </div>
      <div className="flex justify-center">
        <div className="m-4">
          <img src={Shop3} alt="Example Image" style={{ cursor: "pointer" }} />
        </div>
        <div className="m-4">
          <img src={Image4} alt="Example Image" style={{ cursor: "pointer" }} />
        </div>
        <div className="m-4">
          <img src={Shop5} alt="Example Image" style={{ cursor: "pointer" }} />
        </div>
        <div className="m-4">
          <img src={Shop6} alt="Example Image" style={{ cursor: "pointer" }} />
        </div>
      </div>
    </div>
  );
};

export default HomeImage;

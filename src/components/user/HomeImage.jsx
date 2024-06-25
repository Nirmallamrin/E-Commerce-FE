import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "../assets/image2.jpg";
import Shop3 from "../assets/shop3.jpg";
import Shop5 from "../assets/shop5.jpg";
import Shop6 from "../assets/shop6.jpg";
import Image4 from "../assets/image4.jpg";
import Banner from "../assets/banner1.png";
import Banner2 from "../assets/banner2.png";
import Banner3 from "../assets/banner3.jpg";
import Banner4 from "../assets/banner4.jpg";
import Banner5 from "../assets/banner5.jpg";
import Banner6 from "../assets/banner6.jpg";
import one from "../assets/1.jpg";
import two from "../assets/2.jpg";

const HomeImage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl mb-8">
        <Slider {...settings}>
          <div>
            <img src={Banner3} alt="Example Image" className="w-full h-auto" />
          </div>
          <div>
            <img src={Banner4} alt="Example Image" className="w-full h-auto" />
          </div>
          <div>
            <img src={Banner5} alt="Example Image" className="w-full h-auto" />
          </div>
          <div>
            <img src={Banner6} alt="Example Image" className="w-full h-auto" />
          </div>
          <div className="flex flex-col ">
            <img src={Banner} alt="Example Image" className="w-full h-auto" />
            <img src={Banner2} alt="Example Image" className="w-full h-auto" />
          </div>
          <div>
            <img src={one} alt="Example Image" className="w-full h-auto" />
          </div>
          <div>
            <img src={two} alt="Example Image" className="w-full h-auto" />
          </div>
        </Slider>
      </div>
      <div className="m-4 w-full max-w-md">
        <img src={Image} alt="Example Image" style={{ cursor: "pointer" }} className="w-full h-auto"/>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="m-4 w-full sm:w-1/2 lg:w-1/4 max-w-xs">
          <img src={Shop3} alt="Example Image" style={{ cursor: "pointer" }} className="w-full h-auto"/>
        </div>
        <div className="m-4 w-full sm:w-1/2 lg:w-1/4 max-w-xs">
          <img src={Image4} alt="Example Image" style={{ cursor: "pointer" }} className="w-full h-auto"/>
        </div>
        <div className="m-4 w-full sm:w-1/2 lg:w-1/4 max-w-xs">
          <img src={Shop5} alt="Example Image" style={{ cursor: "pointer" }} className="w-full h-auto"/>
        </div>
        <div className="m-4 w-full sm:w-1/2 lg:w-1/4 max-w-xs">
          <img src={Shop6} alt="Example Image" style={{ cursor: "pointer" }} className="w-full h-auto"/>
        </div>
      </div>
    </div>
  );
};

export default HomeImage;

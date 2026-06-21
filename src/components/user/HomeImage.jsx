import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeImage = () => {
  const settings = {
    className: "center hero-slider",
    centerMode: true,
    infinite: true,
    centerPadding: "12%",
    slidesToShow: 1,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "5%",
        }
      }
    ]
  };

  const banners = [
    {
      title: "Discover Apple iPhone 17 Pro Now",
      bgImage: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=1600&q=80",
      buttonText: "Learn more",
      gradient: "from-red-600 via-rose-600/90 to-transparent",
    },
    {
      title: "Grab Upto 50% Off On Selected Headphones",
      bgImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
      buttonText: "Shop Now",
      gradient: "from-shopcart-dark via-slate-800/90 to-transparent",
    },
    {
      title: "Next Gen Smart Watches Available",
      bgImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
      buttonText: "Explore",
      gradient: "from-emerald-700 via-teal-600/90 to-transparent",
    }
  ];

  return (
    <div className="w-full mt-6 mb-12 overflow-hidden">
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index} className="outline-none">
            <div 
              className="relative w-full h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-xl"
              style={{
                backgroundImage: `url(${banner.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.gradient} opacity-90`}></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-center px-8 md:px-16 w-full md:w-[70%] lg:w-[60%] z-10">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 drop-shadow-md">
                  {banner.title}
                </h1>
                <Link to="/">
                  <button className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-colors duration-300 w-max shadow-lg">
                    {banner.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeImage;

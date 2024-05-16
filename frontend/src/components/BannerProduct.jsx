import React from "react";
import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerProduct = () => {
  const desktopImages = [image1, image5, image4, image2];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay interval to 2 seconds
  };

  return (
    <div className="container mx-auto max-w-screen-xl">
      <div className="mt-10">
        <Slider {...settings}>
          {desktopImages.map((imageURL, index) => (
            <div key={index} className="h-80">
              {/* Adjust the height as needed */}
              <div className="">
                <img
                  src={imageURL}
                  alt="a random image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerProduct;

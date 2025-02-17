import React from 'react'
import slider1 from '../../assets/slider1.jpeg'
import slider2 from '../../assets/slider2.jpeg'
import slider3 from '../../assets/slider3.jpeg'
import blog1 from '../../assets/blog1.jpeg'
import blog2 from '../../assets/blog2.jpeg'
import Slider from 'react-slick';

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
      };
  return (
    <>
    <div className="container mx-auto mt-20">
        <div className="flex">
            <div className="w-2/3">
            <Slider {...settings}>
            <img src={slider1} className='h-[500px]' alt="" />
            <img src={slider2} className='h-[500px]' alt="" />
            <img src={slider3} className='h-[500px]' alt="" />
            </Slider>
            </div>
            <div className="w-1/3">
            <img src={blog1} className='h-[250px] ' alt="" />
            <img src={blog2} className='h-[250px]' alt="" />
            </div>

        </div>
    </div>
      
    </>
  )
}

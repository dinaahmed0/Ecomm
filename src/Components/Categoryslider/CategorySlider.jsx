import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import Slider from 'react-slick';

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
  };

  function getCatSlider(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let {data} = useQuery({
    queryKey: "categorySlider",
    queryFn:getCatSlider
  })
  return (
    <>
      <div className="container mx-auto my-10">
        <h1 className='my-2'>Shop Popular Categories:</h1>
      <Slider {...settings}>
          {data?.data.data.map((cat)=> 
          <div className='text-center'>
          <img src={cat.image} className='h-[200px]' alt="" />
          <p>{cat.name}</p>
          </div>
        )}
      </Slider>
      </div>
    </>
  )
}

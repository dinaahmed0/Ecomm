import React from 'react';  
import FeatureProducts from '../FeatureProducts';  
import MainSlider from '../MainSlider/MainSlider';  
import CategorySlider from '../Categoryslider/CategorySlider';

export default function Home() {  
  return (  
    <>  
      <MainSlider />  
      <CategorySlider />  
      <FeatureProducts />  
    </>  
  );  
}
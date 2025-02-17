import React, { useContext } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import Loader from './Loader';
export default function FeatureProducts() {
  let { addToCart } = useContext(CartContext);

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
  }

  function getFeatureProduct() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  let { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ['featureProducts'],
    queryFn: getFeatureProduct,
    staleTime: 5000,
  });

  return (
    <div className='container mx-auto'>
      {isLoading ? <Loader  />: 
      <div className="flex flex-wrap">
        {data?.data.data.map((product) =>
          <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6">
            <div className="product px-2 py-3">
              <Link to={`/ProductDetails/${product._id}/${product.category.name}`} >
                <img src={product.imageCover} className='w-[200px] h-[250px]' alt="" />
                <h3 className='text-main text-sm'>{product.category.name}</h3>
                <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                <div className="flex justify-between align-center">
                  <div>{product.price} EGP</div>
                  <div><i className='rating-color fa fa-star'></i>{product.ratingsAverage}</div>
                </div>
              </Link>
              <div className="flex justify-between mt-2">
                <button onClick={() => addProductToCart(product._id)} className='bg-main btn w-full text-white rounded p-2 px-3'>Add To Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>}
    </div>
  );
}
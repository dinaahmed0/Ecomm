import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../Redux/productSlice';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

export default function Brands() {
  const dispatch = useDispatch();
  const { brands, isLoading, error } = useSelector((state) => state.productRed);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (brands.length === 0) {
    return <div className="text-center my-8 text-red-900 ">No brands available.</div>;
  }

  return (
    <div className='container mx-auto text-center my-8'>
      <div className="flex flex-wrap">
        {brands.map((brand) => (
          <div key={brand._id} className="sm:w-full md:w-1/4 lg:w-1/6">
            <div className="product px-2 py-3">
              <Link to={`/BrandDetails/${brand._id}`}>
                <img src={brand.image} className='w-[200px] h-[250px]' alt={brand.name} />
                <h3 className='text-main text-sm'>{brand.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

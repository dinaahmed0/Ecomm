import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../Redux/productSlice';
import { Link } from 'react-router-dom';
import Loader from '../Loader'

export default function Category() {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.productRed);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container mx-auto text-center my-8'>
      <div className="flex flex-wrap">
        {categories.map((category) => (
          <div key={category._id} className="sm:w-full md:w-1/4 lg:w-1/6">
            <div className="product px-2 py-3">
              <Link to={`/CategoryDetails/${category._id}`}>
                <img src={category.image} className='w-[200px] h-[250px]' alt={category.name} />
                <h3 className='text-main text-sm'>{category.name}</h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

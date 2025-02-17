import React, { useContext } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  let { wishlist, removeFromWishlist } = useContext(WishlistContext);

  return (
    <div className='container mx-auto text-center my-8'>
      <h1 className='text-3xl mb-4'>My Wishlist</h1>
      <div className="flex flex-wrap">
        {wishlist.length === 0 ? (
          <div className="w-full text-center">
            <p>No items in the wishlist.</p>
          </div>
        ) : (
          wishlist.map((product) => (
            <div key={product._id} className="sm:w-full md:w-1/4 lg:w-1/6">
              <div className="product px-2 py-3">
                <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
                  <img src={product.imageCover} className='w-[200px] h-[250px]' alt={product.title} />
                  <h3 className='text-main text-sm'>{product.category.name}</h3>
                  <p>{product.title.split(" ").slice(0, 2).join(" ")}</p>
                  <div className="flex justify-between align-center">
                    <div>{product.price} EGP</div>
                    <div><i className='rating-color fa fa-star'></i>{product.ratingsAverage}</div>
                  </div>
                </Link>
                <button onClick={() => removeFromWishlist(product._id)} className='text-red-500 mt-2'>
                  <i className='fa fa-heart-broken'></i> Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
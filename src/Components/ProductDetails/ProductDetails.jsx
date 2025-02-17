import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Loader from "../Loader";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  let { addToCart } = useContext(CartContext);

  async function addProductToCart(productId) {
    try {
      let response = await addToCart(productId);
      console.log("Product added to cart:", response);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  let { id, category } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);

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

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  async function getRelatedProducts() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
        let relatedProducts = data.data.data;
        relatedProducts = relatedProducts.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(relatedProducts.slice(0, 4));
      })
      .catch((error) => {});
  }

  useEffect(() => {
    getRelatedProducts();
  }, []);

  useEffect(() => {
    getRelatedProducts();
  }, [id]);

  let { data, isLoading, isError, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  return (
    <>
      <div className="container mx-auto my-20">
        <div className="flex">
          <div className="w-1/4">
            <Slider {...settings}>
              {data?.data.data.images.map((src) => (
                <img src={src} alt="product image" />
              ))}
            </Slider>
          </div>
          <div className="w-3/4 mt-20 mx-2">
            <h1 className="text-black font-bolder text-2xl my-5">
              {data?.data.data.title}
            </h1>
            <h3 className="text-gray-700 my-5">
              {data?.data.data.description}
            </h3>
            <p className="my-5">{data?.data.data.category.name}</p>
            <div className="flex justify-between align-center my-5">
              <div>{data?.data.data.price} EGP</div>
              <div>
                <i className="rating-color fa fa-star"></i>
                {data?.data.data.ratingsAverage}
              </div>
            </div>
            <div>
              <button
                onClick={() => addProductToCart(data?.data.data._id)}
                className="bg-main btn w-full text-white rounded p-2 px-3"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h1 className="text-xl font-bold mb-3">Related Products:</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap">
            {relatedProducts.map((product) => (
              <div
                key={product._id}
                className="sm:w-full md:w-1/4 lg:w-1/6"
              >
                <div className="product px-2 py-3">
                  <Link
                    to={`/ProductDetails/${product._id}/${product.category.name}`}
                  >
                    <img
                      src={product.imageCover}
                      className="w-[200px] h-[250px]"
                      alt=""
                    />
                    <h3 className="text-main text-sm">
                      {product.category.name}
                    </h3>
                    <p>
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <div className="flex justify-between align-center">
                      <div>{product.price} EGP</div>
                      <div>
                        <i className="rating-color fa fa-star"></i>
                        {product.ratingsAverage}
                      </div>
                    </div>
                  </Link>

                  <div>
                    <button
                      onClick={() => addProductToCart(product._id)}
                      className="bg-main btn w-full text-white rounded p-2 px-3"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

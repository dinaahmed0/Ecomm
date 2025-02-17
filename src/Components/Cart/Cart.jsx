import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import Loader from "../Loader";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  let { getCart, removeCartItem, updateProduct, clearCart, totalCartPrice } = useContext(CartContext);

  async function getAllCart() {
    try {
      const response = await getCart();
      setIsLoading(false);
      setCartItems(response.data.products);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }
  async function removeProduct(productId) {
    try {
      const response = await removeCartItem(productId);
      setIsLoading(false);
      setCartItems(response.data.products);
    } catch (error) {
      console.error("Error removing cart items:", error);
    }
  }
  async function updateCartProduct(productId, count) {
    try {
      const response = await updateProduct(productId, count);
      setIsLoading(false);
      setCartItems(response.data.products);
    } catch (error) {
      console.error("Error updating cart items:", error);
    }
  }
  async function clearAllCart() {
    try {
      const response = await clearCart();
      setIsLoading(false);
      setCartItems([]);
    } catch (error) {
      console.error("Error removing cart items:", error);
    }
  }

  useEffect(() => {
    getAllCart();
  }, []);

  return (
    <>
    {isLoading ? <Loader /> : <div>
      <div className="relative container mx-auto overflow-x-auto shadow-md sm:rounded-lg">
        <div className="text-end">
          <button onClick={()=> clearAllCart()} className="bg-red-700 text-white px-3 py-2 rounded-xl my-3">Clear Cart</button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No items in the cart.
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr
                  key={item.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={()=> updateCartProduct(item.product.id, item.count - 1)}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{item.count}</span>
                      </div>
                      <button onClick={()=> updateCartProduct(item.product.id, item.count + 1)}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price} EGP
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.price * item.count} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={()=> removeProduct(item.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
            <tr className="py-5 bg-white border-b text-center font-extrabold text-black text-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 ">
              <td>Total Price</td>
              <td colSpan="5">{totalCartPrice} EGP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> }
    </>
  );
}
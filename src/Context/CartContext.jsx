import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
    const [totalCartPrice, setTotalCartPrice] = useState(0);
  async function addToCart(productId) {
    try {
      const response = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
      toast.success(response.data.message);
      setTotalCartPrice(response.data.data.totalCartPrice);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }

  async function getCart() {
    try {
      const response = await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      });
      setTotalCartPrice(response.data.data.totalCartPrice);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async function removeCartItem(productId) {
    try {
      const response = await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
    //   toast.success(response.data.message);
    setTotalCartPrice(response.data.data.totalCartPrice);
      return response.data;
    } catch (error) {
    //   toast.error(error.response.data.message);
      throw error;
    }
  }

  async function updateProduct(productId, count) {
    try {
      const response = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count: count
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
    //   toast.success(response.data.message);
    setTotalCartPrice(response.data.data.totalCartPrice);
      return response.data;
    } catch (error) {
    //   toast.error(error.response.data.message);
      throw error;
    }
  }

  async function clearCart() {
    try {
      const response = await axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
    //   toast.success(response.data.message);
    setTotalCartPrice(0);
      return response.data;
    } catch (error) {
    //   toast.error(error.response.data.message);
      throw error;
    }
  }
  return (
    <CartContext.Provider value={{ addToCart, getCart, removeCartItem, updateProduct, clearCart, totalCartPrice }}>
      {props.children}
    </CartContext.Provider>
  );
}
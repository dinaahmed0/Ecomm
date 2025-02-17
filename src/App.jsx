import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import Login from "./Components/Login/Login";
import LogOut from "./Components/LogOut/LogOut";
import Register from "./Components/Register/Register";
import Notfound from "./Components/NotFound/Notfound";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

  let routes = createBrowserRouter([{
    path: '/', element: <Layout/>, children : [
      {index: true, element: <ProtectedRoutes><Home/></ProtectedRoutes> },
      {path: "Products", element: <ProtectedRoutes><Products/></ProtectedRoutes> },
      {path: "ProductDetails/:id/:category", element: <ProtectedRoutes><ProductDetails/></ProtectedRoutes> },
      {path: "Brands", element:<ProtectedRoutes><Brands/></ProtectedRoutes>  },
      {path: "Cart", element:<ProtectedRoutes><Cart/></ProtectedRoutes>  },
      {path: "Category", element:<ProtectedRoutes><Category/></ProtectedRoutes> },
      {path: "Login", element:<ProtectedAuth><Login/></ProtectedAuth> },
      {path: "Logout", element: <LogOut/>},
      {path: "Register", element:<ProtectedAuth><Register/></ProtectedAuth> },
      {path: "*", element: <Notfound/>},
    ]
  }]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;


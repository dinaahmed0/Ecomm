import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App.jsx';
import CounterContextProvider from './Context/CounterContext.jsx';
import TokenContextProvider from './Context/TokenContext.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
    <Provider store={store}>
      <CartContextProvider>
        <CounterContextProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </CounterContextProvider>
      </CartContextProvider>
    </Provider>
  </TokenContextProvider>,
);

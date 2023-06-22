import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductView from './pages/ProductView';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import AllProducts from './pages/AllProducts';
import { Product } from './pages/types/Types';
import Registration from './components/Registration';
import LogIn from './components/LogIn';
import Checkout from './pages/Checkout';
import './components/translations/index'
import AboutUs from './pages/AboutUs';
const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  return (
    <Router>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route
          path="/"
          element={<Home cartItems={cartItems} setCartItems={setCartItems} />}
        />
        <Route path="/product/:productId" element={<ProductView />} />
        <Route path="/allproducts"element={<AllProducts cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/CheckOut" element={<Checkout />}/> 
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default App;

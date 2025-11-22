import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';
import AboutUs from './AboutUs';
import { useDispatch } from 'react-redux';
import { addItem } from './CartSlice';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'products', 'cart'
  const [addedToCart, setAddedToCart] = useState({}); // track added products
  const dispatch = useDispatch();

  const handleGetStartedClick = () => {
    setShowProductList(true);
    setCurrentView('products');
  };

  const handleHomeClick = () => {
    setCurrentView('landing');
    setShowProductList(false);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 })); // ensure quantity added
    setAddedToCart({ ...addedToCart, [plant.name]: true });
  };

  const handleViewCart = () => {
    setCurrentView('cart');
  };

  const handleContinueShopping = () => {
    setCurrentView('products');
  };

  return (
    <div className="app-container">

      {/* Landing Page */}
      {currentView === 'landing' && (
        <div className="landing-page">
          <div className="background-image"></div>
          <div className="content">
            <div className="landing_content">
              <h1>Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
            <div className="aboutus_container">
              <AboutUs />
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      {currentView === 'products' && (
        <ProductList
          onHomeClick={handleHomeClick}
          handleAddToCart={handleAddToCart}
          addedToCart={addedToCart}
          onViewCart={handleViewCart}
        />
      )}

      {/* Cart Page */}
      {currentView === 'cart' && (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}

    </div>
  );
}

export default App;
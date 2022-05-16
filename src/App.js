import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../src/styles/css/App.css';
import TabSelector from './Components/TabSelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import UserCompras from './Components/UserCompras';
import UserDatos from './Components/UserDatos';
import NavBar from './Components/NavBar';
import Categories from './Components/Categories'
import Checkout from './Components/Checkout';
import Wishlist from './Components/Wishlist';
import Error404 from './Components/Error404';
import CartContextProvider from './Context/CartContext';
import ThemeContextProvider from './Context/ThemeContext';
import AuthContextProvider from './Context/AuthContext'
import WishlistContextProvider from './Context/WishlistContext';


function App() {
  let brand = "MusicStore";

  /* scroll top of page on reload (manual) */
  useEffect(() => {
    window.onunload = () => window.scrollTo(0, 0);
  }, [])


  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <BrowserRouter>
                <NavBar brand={brand} />
                <TabSelector />
                <Routes>
                  <Route path="/" element={<ItemListContainer />} />
                  <Route path="/user/compras" element={<UserCompras />} />
                  <Route path="/user/datos" element={<UserDatos />} />
                  <Route path="/user/wishlist" element={<Wishlist />} />
                  <Route path="/item/:productId" element={<ItemDetailContainer />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:categoryId" element={<ItemListContainer />} />
                  <Route path="/search/:searchId" element={<ItemListContainer />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/*" element={<Error404 />} />
                </Routes>
                <Footer />
              </BrowserRouter>
            </WishlistContextProvider>
          </CartContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>

    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../src/styles/css/App.css';
import TabSelector from './Components/TabSelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import NavBar from './Components/NavBar';
import Categories from './Components/Categories'
import Error404 from './Components/Error404';


/* uso BrowserRouter ya que así lo pide el entregable. sin embargo no funciona correctamente en gh-pages al hacer refresh de una sección. esto se puede solucionar usando HashRouter en gh-pages (reemplazaar BrowserRouter por HashRouter) */

function App() {
  let brand = "MusicStore";

  const [cartNumber, setCartNumber] = useState(0);
  const cartAdd = (amount)=>{
      console.log("CART TOTAL: " + (cartNumber + amount)) 
      
      setCartNumber((cartNumber)=>cartNumber + amount)
  }

  /* scroll top of page on reload (manual) */
  useEffect(()=>{
    window.onunload = ()=> window.scrollTo(0, 0);
  }, [])
  

  return (
    <>
      <BrowserRouter basename="/">
        <NavBar brand={brand} cartNumber={cartNumber}/>
        <TabSelector />
        <Routes>  
          <Route exact path="/" element={<ItemListContainer />} />
          <Route exact path="/item/:productId" element={<ItemDetailContainer cartAdd={cartAdd}/>} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/categories/:categoryId" element={<ItemListContainer />} />
          <Route exact path="/search/:searchId" element={<ItemListContainer />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;

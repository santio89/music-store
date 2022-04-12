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


/* para que el BrowserRouter funcione correctamente en gh-pages al hacer refresh de una sección, defino las rutas y links anteponiendo /music-store */

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
      <BrowserRouter>
        <NavBar brand={brand} cartNumber={cartNumber}/>
        <TabSelector />
        <Routes>  
          <Route exact path="/music-store" element={<ItemListContainer />} />
          <Route exact path="/music-store/item/:productId" element={<ItemDetailContainer cartAdd={cartAdd}/>} />
          <Route exact path="/music-store/categories" element={<Categories />} />
          <Route exact path="/music-store/categories/:categoryId" element={<ItemListContainer />} />
          <Route exact path="/music-store/search/:searchId" element={<ItemListContainer />} />
          <Route path="/music-store/*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;

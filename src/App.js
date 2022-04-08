import '../src/styles/css/App.css';
import TabSelector from './Components/TabSelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import NavBar from './Components/NavBar';
import Categories from './Components/Categories'
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";

/* uso HashRouter en vez de BrowserRouter ya que de momento tengo el sitio hosteado en github pages, y gh-pages no funciona bien con react router (al parecer por el browser history) */

function App() {
  let brand = "MusicStore";

  const [cartNumber, setCartNumber] = useState(0);
  const cartAdd = (amount)=>{
      console.log("CART TOTAL: " + (cartNumber + amount)) 
      
      setCartNumber((cartNumber)=>cartNumber + amount)
  }
  

  return (
    <>
      <HashRouter basename="/">
        <NavBar brand={brand} cartNumber={cartNumber}/>
        <TabSelector />
        <Routes>  
          <Route exact path="/" element={<ItemListContainer cartAdd={cartAdd}/>} />
          <Route exact path="/item/:productId" element={<ItemDetailContainer cartAdd={cartAdd}/>} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/categories/:categoryId"element={<ItemListContainer cartAdd={cartAdd}/>} />
        </Routes>
        <Footer />
      </HashRouter>

    </>
  );
}

export default App;

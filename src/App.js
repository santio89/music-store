import '../src/styles/css/App.css';
import CategorySelector from './Components/CategorySelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import NavBar from './Components/NavBar';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  let brand = "MusicStore";

  const [cartNumber, setCartNumber] = useState(0);

  const cartAdd = (amount)=>{
      console.log("CART TOTAL: " + (cartNumber + amount)) 
      
      setCartNumber((cartNumber)=>cartNumber + amount)
  }
  

  return (
    <>
      <BrowserRouter>
        <NavBar brand={brand} cartNumber={cartNumber}/>
        <Routes>  
          <Route exact path="/" element={<><CategorySelector /><ItemListContainer cartAdd={cartAdd}/></>} />
          
          <Route exact path="/item/:productId" element={<ItemDetailContainer cartAdd={cartAdd}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;

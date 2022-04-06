import '../src/styles/css/App.css';
import CategorySelector from './Components/CategorySelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import NavBar from './Components/NavBar';
import React, { useState } from 'react';



function App() {
  let brand = "MusicStore";

  const [cartNumber, setCartNumber] = useState(0);

  const cartAdd = (amount)=>{
      console.log("CART TOTAL: " + (cartNumber + amount)) 
      
      setCartNumber((cartNumber)=>cartNumber + amount)
  }
  

  return (
    <>
    
    <NavBar brand={brand} cartNumber={cartNumber}/>
    {/* <CategorySelector />
    <ItemListContainer cartAdd={cartAdd}/> */}
    <ItemDetailContainer cartAdd={cartAdd}/>
    <Footer />

    </>
  );
}

export default App;

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


/* para hacer que BrowserRouter funcione en gh-pages, definí un basename en el router (/music-store). por tanto, si se ejecuta el sitio en el localhost sin anteponer el basename, no va a funcionar. para que lo haga, hay que poner el /music-store */

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
      <BrowserRouter basename="/music-store">
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

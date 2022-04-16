import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '../src/styles/css/App.css';
import TabSelector from './Components/TabSelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import ItemDetailContainer from './Components/ItemDetailContainer';
import NavBar from './Components/NavBar';
import Categories from './Components/Categories'
import Checkout from './Components/Checkout';
import Error404 from './Components/Error404';
import ContextProvider from './Context/Context';

/* 
BrowserRouter no funciona correctamente en gh-pages al hacer refresh de una sección. esto se puede solucionar usando HashRouter o haciendo un redirect de la pagina de error 404 (la que gh-pages reconoce como 404.html) al sitio principal. Ya que la entrega pide usar BrowserRouter, por el momento solucione el tema del refresh haciendo el redirect (por eso hay una pagina 404.html y un script en el index.html).

Debido al mismo tema del routing y gh-pages, tuve que usar un basename para el router ("/music-store"). Por tanto, para ver el sitio hay que poner ese basename (ej: http://localhost:3000/music-store/)

No uso exact path (solo path) ya que, segun la documentacion del react-router-dom v6, no se utiliza mas (In v6 all the routes match exactly by default). */

function App() {
  let brand = "MusicStore";


  /* scroll top of page on reload (manual) */
  useEffect(()=>{
    window.onunload = ()=> window.scrollTo(0, 0);
  }, [])
  

  return (
    <>

      <ContextProvider>

        <BrowserRouter basename="/music-store">
          <NavBar brand={brand}/>
          <TabSelector />
          <Routes>  
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/item/:productId" element={<ItemDetailContainer />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryId" element={<ItemListContainer />} />
            <Route path="/search/:searchId" element={<ItemListContainer />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
          <Footer />
        </BrowserRouter>

      </ContextProvider>
      
    </>
  );
}

export default App;

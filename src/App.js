import '../src/styles/css/App.css';
import CategorySelector from './Components/CategorySelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import NavBar from './Components/NavBar';


function App() {
  let brand = "MusicStore";
  

  return (
    <>
    
    <NavBar brand={brand} />
    <CategorySelector />
    <ItemListContainer />
    <Footer />

    </>
  );
}

export default App;

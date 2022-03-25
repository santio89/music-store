import '../src/styles/css/App.css';
import CategorySelector from './Components/CategorySelector';
import Footer from './Components/Footer';
import ItemListContainer from './Components/ItemListContainer';
import NavBar from './Components/NavBar';


function App() {
  let brand = "MusicStore";
  let open = "OPEN...";
  let soon = "...SOON";

  const OpenSoon = ()=>{
    return(
      <div className="App">
        <div className="coming">{open}</div>
        <div className="soon">{soon}</div>
      </div>
    )
  }

  return (
    <>
    
    <NavBar brand={brand} />
    <CategorySelector />
    <ItemListContainer greetings={<OpenSoon />}/>
    <Footer />

    </>
  );
}

export default App;

import 'bulma/css/bulma.min.css';
import '../src/styles/App.css';
import CategorySelector from './components/CategorySelector';
import Footer from './components/Footer';
import NavBar from './components/NavBar';


function App() {
  let brand = "MusicStore";
  let hello = "OPEN...";
  let app = "...SOON";

  return (
    <>
    
    <NavBar brand={brand} />
    <CategorySelector />
    <div className="App">
      <div className="hello">{hello}</div>
      <div className="react">{app}</div>
    </div>
    <Footer />

    </>
  );
}

export default App;

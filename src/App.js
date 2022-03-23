import '../src/styles/App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import 'bulma/css/bulma.min.css';

function App() {
  let hello = "hello world";
  let app = "react app";
  


  return (
    <>
    
    <NavBar />
    <div className="App">
      <div className="hello">{hello}</div>
      <div className="react">{app}</div>
    </div>
    <Footer />

    </>
  );
}

export default App;

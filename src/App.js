import '../src/styles/App.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import 'bulma/css/bulma.min.css';

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

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

import '../src/styles/App.css';

function App() {
  let hello = "hello world";
  let app = "react app";

  return (
    <div className="App">
      <div className="hello">{hello}</div>
      <div className="react">{app}</div>
    </div>
  );
}

export default App;

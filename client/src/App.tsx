import './App.css';
import { BrowserRouter } from "react-router-dom";
import Layout from './layout/layout';
import Router from './router/router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

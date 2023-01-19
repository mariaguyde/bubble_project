import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";

import './variables.css'
import Panier from './components/Panier/Panier';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
        </Routes>
        {/* ajout du component pour pouvoir le visualiser TODO le retirer */}
        <Panier/>
    </div>
  );
}

export default App;

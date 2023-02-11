import { Routes, Route } from "react-router-dom";
import "./App.css";
import './variables.css'
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import NotFound from "./components/NotFound/NotFound";
import RecapOrder from "./components/RecapOrder/RecapOrder";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/recapitulatif" element={<RecapOrder />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );

}

export default App;

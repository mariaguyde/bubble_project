import { Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
  );

}

export default App;

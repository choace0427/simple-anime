import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import AnimeSearch from "./components/AnimeSearch";
import AnimeDetail from "./components/AnimeDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimeSearch />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

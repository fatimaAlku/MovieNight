// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import Home from "./pages/Home/Home.jsx";
import Search from "./pages/Search/Search.jsx";
import Details from "./pages/Details/Details.jsx";
import About from "./pages/About/About.jsx";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
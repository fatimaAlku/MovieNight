// components/Nav/Nav.jsx
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav(){
  return (
    <nav className="nav">
      <Link to="/"><div>HOME</div></Link>
      <Link to="/search"><div>SEARCH</div></Link>
    </nav>
  );
}
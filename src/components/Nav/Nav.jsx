// components/Nav/Nav.jsx
import { Link } from "react-router-dom";

export default function Nav(){
  return (
    <nav className="nav">
      <div className="brand">
        <Link to="/">MoviePlanner</Link>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </div>
    </nav>
  );
}
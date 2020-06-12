import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="navbar">
      <Link to="/" className="Link">
        MovieSearch
      </Link>
    </div>
  );
};
export default Header;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "./ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="nav-link">
        <Link className="nav-link-icon" to="/">
          <HomeIcon fontSize="large" />
        </Link>
      </div>
      <div className="nav-link">
        <Link to="/agregar-causa">
          <AddIcon fontSize="large" />
        </Link>
      </div>
      <div className="nav-link">
        <button className="toggle-btn" onClick={toggleTheme}>
          {theme === "dark-theme" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

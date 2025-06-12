import React, { useState } from "react";
import { Link } from "react-router-dom";
import useScreenSize from "hooks/useScreenSize";
const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const screenSize = useScreenSize();
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
  return (
    <div>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Link className="navbar-brand" to="/">
          My App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links (Home, About) */}
        <div className="collapse navbar-collapse show" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {/* Add other nav items here */}
          </ul>
        </div>
      </nav>

    </div>
  );
};

export default Navbar;

import React, { useState } from "react";
import routes from "../../routes.json";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronRight } from "react-icons/fa"; // For submenu toggle icons
import "./Sidebar.css";
const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState({});

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const toggleSubmenu = (index) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle submenu visibility
    }));
  };

  return (
    <div
      className={`sidebar ${isOpen ? "show" : "hide"}`}
      style={{
        width: "250px",
        position: "fixed",
        top: 0,
        left: isOpen ? 0 : "-250px",
        height: "100vh",
        transition: "left 0.3s ease-in-out",
        zIndex: 1000,
        backgroundColor: "#39B358FF",
      }}
    >
      <h3 className="sidebar-header">Sidebar</h3>

      <ul
        className="sidebar-list"
        style={{
          margin: "0",
          padding: "0",

          listStyleType: "none",
        }}
      >
        {routes.map((route, index) => (
          <li key={index} className={`sidebar-item ${isActive(route.path)}`}>
            {route.submenu.length > 0 ? (
              <>
                <p
                  className="text-white submenu-toggle cursor-pointer"
                  onClick={() => toggleSubmenu(index)}
                >
                  {route.name}
                  <span className="submenu-icon">
                    {openSubmenus[index] ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronRight />
                    )}
                  </span>
                </p>
                <ul
                  className={`submenu ${openSubmenus[index] ? "open" : ""}`}
                  style={{
                    display: openSubmenus[index] ? "block" : "none", // Ensure it toggles visibility
                    listStyleType: "none",
                  }}
                >
                  {route.submenu.map((sub, subIndex) => (
                    <li
                      key={subIndex}
                      className={`submenu-item ${isActive(sub.path)}`}
                    >
                      <Link
                        to={sub.path}
                        className={`submenu-link ${
                          isActive(sub.path) ? "active-link" : ""
                        }`}
                        style={{
                          color: "#ecf0f1",
                          textDecoration: "none",
                        }}
                      >
                        <h5
                          className={`submenu-link ${
                            isActive(sub.path) ? "highlight-sidebar" : ""
                          }`}
                        >
                          {sub.name}
                        </h5>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                to={route.path}
                className={`sidebar-link ${
                  isActive(route.path) ? "active-link" : ""
                }`}
                style={{
                  color: "#ecf0f1",
                  textDecoration: "none",
                }}
              >
                <h5
                  className={`${
                    isActive(route.path) ? "highlight-sidebar" : ""
                  }`}
                >
                  {route.name}
                </h5>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

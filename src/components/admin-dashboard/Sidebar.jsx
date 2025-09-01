import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsX,
  BsGridFill,
} from "react-icons/bs";
import { FaBoxOpen } from "react-icons/fa";

function Sidebar({ isCollapsed, closeSidebar }) {
  const navItems = [
    {
      id: "dashboard",
      icon: BsGrid1X2Fill,
      text: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      id: "products",
      icon: FaBoxOpen,
      text: "Products",
      path: "/admin/products",
    },
    {
      id: "categories",
      icon: BsFillGrid3X3GapFill,
      text: "Categories",
      path: "/categories",
    },
    {
      id: "customers",
      icon: BsPeopleFill,
      text: "Customers",
      path: "/customers",
    },
    {
      id: "inventory",
      icon: BsListCheck,
      text: "Inventory",
      path: "/inventory",
    },
    {
      id: "reports",
      icon: BsMenuButtonWideFill,
      text: "Reports",
      path: "/reports",
    },
    {
      id: "settings",
      icon: BsFillGearFill,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <aside className={`sidebar${!isCollapsed ? " open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <BsGridFill className="sidebar-icon" />
          <span className="sidebar-title">Admin Panel</span>
        </div>
        <button
          className="sidebar-close-btn"
          onClick={closeSidebar}
          title="Close Sidebar"
        >
          <BsX />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                onClick={() => window.innerWidth <= 768 && closeSidebar()}
              >
                <item.icon className="nav-icon" />
                <span className="nav-text">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

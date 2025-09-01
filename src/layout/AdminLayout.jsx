import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/admin-dashboard/Header";
import Sidebar from "../components/admin-dashboard/Sidebar";

const AdminLayout = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);
  const closeSidebar = () => setSidebarCollapsed(true);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <div
      className={`admin-layout${
        isSidebarCollapsed ? " sidebar-collapsed" : ""
      }${isDarkMode ? " dark-mode" : ""}`}
    >
      <Header
        toggleSidebar={toggleSidebar}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <Sidebar isCollapsed={isSidebarCollapsed} closeSidebar={closeSidebar} />
      <main className="main-content" role="main">
        <Outlet />
      </main>
      {!isSidebarCollapsed && window.innerWidth <= 768 && (
        <div className="overlay active" onClick={closeSidebar}></div>
      )}
    </div>
  );
};

export default AdminLayout;

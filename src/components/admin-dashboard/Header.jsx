import React, { useState, useEffect, useContext } from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsSearch,
  BsJustify,
  BsSun,
  BsMoon,
  BsPerson,
  BsGear,
  BsBoxArrowRight,
  BsClock,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

function Header({ toggleSidebar, toggleDarkMode, isDarkMode }) {
  const { user, logout } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let animationFrameId;
    const updateTime = () => {
      setCurrentTime(new Date());
      animationFrameId = requestAnimationFrame(updateTime);
    };
    animationFrameId = requestAnimationFrame(updateTime);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const dropdownButton = document.querySelector(".profile-btn");
    const handleShow = () => setIsDropdownOpen(true);
    const handleHide = () => setIsDropdownOpen(false);

    dropdownButton.addEventListener("show.bs.dropdown", handleShow);
    dropdownButton.addEventListener("hide.bs.dropdown", handleHide);

    return () => {
      dropdownButton.removeEventListener("show.bs.dropdown", handleShow);
      dropdownButton.removeEventListener("hide.bs.dropdown", handleHide);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <nav className="navbar navbar-expand-lg border-bottom header">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <button
            className="btn btn-icon me-3 menu-btn"
            onClick={toggleSidebar}
            title="Toggle Sidebar"
          >
            <BsJustify className="fs-5" />
          </button>
          <div className="input-group" style={{ width: "300px" }}>
            <span className="input-group-text bg-white border-end-0">
              <BsSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3 header-right">
          <div className="d-flex align-items-center rounded px-3 py-2 bg-light time-display">
            <BsClock className="me-2 icon" />
            <span>{formatTime(currentTime)}</span>
          </div>

          <button
            className="btn btn-icon p-2 header-btn"
            onClick={toggleDarkMode}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? (
              <BsSun className="fs-5" />
            ) : (
              <BsMoon className="fs-5" />
            )}
          </button>

          <button className="btn btn-icon p-2 header-btn">
            <BsFillBellFill className="fs-5" />
            {user.notifications > 0 && (
              <span className="notification-badge">{user.notifications}</span>
            )}
          </button>

          <button className="btn btn-icon p-2 header-btn">
            <BsFillEnvelopeFill className="fs-5" />
            {user.messages > 0 && (
              <span className="notification-badge">{user.messages}</span>
            )}
          </button>

          <div className="dropdown">
            <button
              className={`btn btn-light d-flex align-items-center gap-2 px-3 profile-btn ${
                isDropdownOpen ? "active" : ""
              }`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white sidebar-avatar"
                style={{ width: "32px", height: "32px" }}
              >
                {getInitials(user.name)}
              </div>
              <div className="d-none d-md-block text-start profile-info">
                <div className="fw-bold profile-name">
                  {user?.name || "User"}
                </div>
                <div className="small text-muted profile-role">
                  {user?.role || "Guest"}
                </div>
              </div>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  <BsPerson className="me-2" />
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/admin/change-password")}
                >
                  <BsGear className="me-2" />
                  Settings
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <BsBoxArrowRight className="me-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

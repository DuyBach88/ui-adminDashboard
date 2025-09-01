import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4 text-center">Welcome 👋</h2>

        <ul className="list-group mb-4">
          <li className="list-group-item">
            <strong>Name:</strong> {user?.name}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {user?.email}
          </li>
          <li className="list-group-item">
            <strong>Role:</strong> {user?.role}
          </li>
        </ul>

        <button
          className="btn btn-danger w-100 fw-semibold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;

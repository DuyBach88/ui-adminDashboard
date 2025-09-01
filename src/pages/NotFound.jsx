import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-1 text-danger fw-bold mb-3">404</h1>
      <p className="fs-4 text-secondary mb-4">Oops! Page not found.</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
};

export default NotFound;

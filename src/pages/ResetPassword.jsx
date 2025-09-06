import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../service/profileService";
import { FaLock, FaKey } from "react-icons/fa";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(token, password);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light position-relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="position-absolute opacity-25"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(13, 110, 253, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(13, 110, 253, 0.08) 0%, transparent 50%)",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />

      <div
        className="card border-0 bg-white shadow position-relative"
        style={{
          maxWidth: "480px",
          width: "100%",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="p-5">
          {/* Header with icon */}
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-3"
              style={{ width: "70px", height: "70px" }}
            >
              <FaLock className="text-primary" style={{ fontSize: "1.5rem" }} />
            </div>
            <h3
              className="text-primary fw-bold mb-2"
              style={{ fontSize: "1.75rem" }}
            >
              Reset Password
            </h3>
            <p className="text-muted mb-0 small">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {message && (
              <div
                className="alert alert-success text-center small border-0 shadow-sm mb-3"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#d1e7dd",
                  color: "#0a3622",
                }}
              >
                {message}
              </div>
            )}
            {error && (
              <div
                className="alert alert-danger text-center small border-0 shadow-sm mb-3"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                }}
              >
                {error}
              </div>
            )}

            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label fw-semibold text-dark mb-2"
              >
                New Password
              </label>
              <div className="input-group shadow-sm">
                <span
                  className="input-group-text bg-white border-end-0"
                  style={{ borderRadius: "10px 0 0 10px" }}
                >
                  <FaKey className="text-primary" />
                </span>
                <input
                  type="password"
                  id="password"
                  className="form-control border-start-0 ps-0"
                  placeholder="Enter new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    borderRadius: "0 10px 10px 0",
                    boxShadow: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0d6efd";
                    e.target.previousElementSibling.style.borderColor =
                      "#0d6efd";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ced4da";
                    e.target.previousElementSibling.style.borderColor =
                      "#ced4da";
                  }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="confirm"
                className="form-label fw-semibold text-dark mb-2"
              >
                Confirm Password
              </label>
              <div className="input-group shadow-sm">
                <span
                  className="input-group-text bg-white border-end-0"
                  style={{ borderRadius: "10px 0 0 10px" }}
                >
                  <FaKey className="text-primary" />
                </span>
                <input
                  type="password"
                  id="confirm"
                  className="form-control border-start-0 ps-0"
                  placeholder="Confirm new password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  style={{
                    borderRadius: "0 10px 10px 0",
                    boxShadow: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#0d6efd";
                    e.target.previousElementSibling.style.borderColor =
                      "#0d6efd";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ced4da";
                    e.target.previousElementSibling.style.borderColor =
                      "#ced4da";
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 fw-semibold border-0 shadow-sm py-2"
              disabled={loading}
              style={{
                fontSize: "1.05rem",
                borderRadius: "10px",
                background: loading
                  ? "linear-gradient(135deg, #6c757d 0%, #5a6268 100%)"
                  : "linear-gradient(135deg, #0d6efd 0%, #0056b3 100%)",
                color: "white",
                transition: "all 0.3s ease",
                transform: loading ? "scale(0.98)" : "scale(1)",
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-1px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(13, 110, 253, 0.25)";
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                }
              }}
            >
              {loading ? (
                <div className="d-flex align-items-center justify-content-center">
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted mb-0 small">
              Back to{" "}
              <span
                role="button"
                className="text-primary fw-semibold cursor-pointer text-decoration-none"
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => navigate("/login")}
                onMouseOver={(e) =>
                  (e.target.style.textDecoration = "underline")
                }
                onMouseOut={(e) => (e.target.style.textDecoration = "none")}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

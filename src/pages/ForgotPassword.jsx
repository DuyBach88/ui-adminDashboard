import React, { useState } from "react";
import { forgotPassword } from "../service/profileService";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      const res = await forgotPassword(email);
      setMsg(res.data.message);
    } catch (error) {
      setErr(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light position-relative overflow-hidden">
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
              <FaEnvelope
                className="text-primary"
                style={{ fontSize: "1.5rem" }}
              />
            </div>
            <h2
              className="text-primary fw-bold mb-2"
              style={{ fontSize: "1.75rem" }}
            >
              Forgot Password?
            </h2>
            <p className="text-muted mb-0 small">
              Enter your email to receive a reset link
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {msg && (
              <div
                className="alert alert-success text-center small border-0 shadow-sm"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#d1e7dd",
                  color: "#0a3622",
                }}
              >
                {msg}
              </div>
            )}
            {err && (
              <div
                className="alert alert-danger text-center small border-0 shadow-sm"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                }}
              >
                {err}
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="form-label fw-semibold text-dark mb-2"
              >
                Email Address
              </label>
              <div className="input-group shadow-sm">
                <span
                  className="input-group-text bg-white border-end-0"
                  style={{ borderRadius: "10px 0 0 10px" }}
                >
                  <FaEnvelope className="text-primary" />
                </span>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control border-start-0 ps-0"
                  placeholder="Enter your email"
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
              disabled={loading}
              className="btn w-100 fw-semibold border-0 shadow-sm py-2"
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
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-muted mb-0 small">
              Remembered?{" "}
              <span
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

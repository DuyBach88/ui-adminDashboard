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
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card p-4 shadow rounded-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <div className="bg-primary p-3 rounded-circle d-inline-block text-white shadow">
            <FaEnvelope size={24} />
          </div>
        </div>
        <h2 className="text-center fw-bold mb-2">Forgot Your Password?</h2>
        <p className="text-center text-muted mb-4">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit}>
          {msg && (
            <div className="alert alert-success text-center small">{msg}</div>
          )}
          {err && (
            <div className="alert alert-danger text-center small">{err}</div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaEnvelope />
              </span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn w-100 fw-semibold text-white ${
              loading ? "btn-secondary" : "btn-primary"
            }`}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <p className="mt-4 text-center small">
          Remembered?{" "}
          <span
            className="text-primary text-decoration-underline cursor-pointer"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaRegClock, FaRedo } from "react-icons/fa";

const OTPVerification = () => {
  const [email, setEmail] = useState(
    () => localStorage.getItem("pendingEmail") || ""
  );
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút
  const [resendCount, setResendCount] = useState(0);
  const navigate = useNavigate();

  // Đếm ngược thời gian
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = Array(6)
      .fill("")
      .map((_, i) => pasted[i] || "");
    setOtp(newOtp);
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/verify-otp",
        {
          email,
          otp: code,
        }
      );

      if (res.data.success) {
        setMessage("Email verified successfully! Redirecting to login...");
        localStorage.removeItem("pendingEmail");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Verification failed.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCount >= 5) {
      setError("Maximum resend attempts reached.");
      return;
    }

    setResendLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/resend-otp",
        {
          email,
        }
      );

      if (res.data.success) {
        setMessage("New OTP sent to your email.");
        setOtp(["", "", "", "", "", ""]);
        setTimeLeft(600);
        setResendCount((prev) => prev + 1);
        document.getElementById("otp-0")?.focus();
      } else {
        setError(res.data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Container className="min-vh-100 d-flex align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <div className="border rounded-4 shadow p-4 bg-white">
            <div className="text-center mb-4">
              <FaEnvelope size={32} className="text-primary mb-2" />
              <h4 className="fw-bold">Verify Your Email</h4>
              <p className="text-muted small">
                We sent a 6-digit code to <strong>{email}</strong>
              </p>
            </div>

            <Form className="d-flex justify-content-between mb-3">
              {otp.map((digit, index) => (
                <Form.Control
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onPaste={handlePaste}
                  maxLength={1}
                  className="text-center fw-bold fs-4"
                  style={{ width: "45px", height: "55px" }}
                />
              ))}
            </Form>

            <div className="text-center text-muted mb-3">
              <FaRegClock className="me-2" />
              {timeLeft > 0
                ? `Code expires in ${formatTime(timeLeft)}`
                : "Code expired"}
            </div>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}

            <Button
              className="w-100 fw-semibold mb-3"
              variant="primary"
              onClick={handleVerify}
              disabled={loading || otp.join("").length !== 6}
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                className="text-decoration-none text-primary"
                onClick={handleResend}
                disabled={resendLoading || timeLeft > 540}
              >
                <FaRedo className="me-1" />
                {resendLoading ? "Sending..." : "Resend Code"}
              </Button>
              <div className="small text-muted">Resent: {resendCount}/5</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default OTPVerification;

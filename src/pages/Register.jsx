import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, InputGroup, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleRegister = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const res = await axios.post("http://localhost:3000/api/auth/register", {
  //       name,
  //       email,
  //       password,
  //     });

  //     toast.success(res.data.message || "Registration successful!");
  //     setTimeout(() => navigate("/login"), 1500);
  //   } catch (err) {
  //     toast.error(err.response?.data?.message || "Registration failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
      });

      toast.success(
        res.data.message || "Registration successful! Please verify your email."
      );

      localStorage.setItem("pendingEmail", email);

      setTimeout(() => navigate("/verify-email"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative overflow-hidden">
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

      <Card
        className="p-5 shadow-lg border-0 bg-white position-relative"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          transform: "translateY(-10px)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Header with icon */}
        <div className="text-center mb-4">
          <div
            className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 mb-3"
            style={{ width: "80px", height: "80px" }}
          >
            <FaUser className="text-primary" style={{ fontSize: "2rem" }} />
          </div>
          <h2
            className="text-primary fw-bold mb-1"
            style={{ fontSize: "1.8rem" }}
          >
            Create Account
          </h2>
          <p className="text-muted mb-0 small">Join us today and get started</p>
        </div>

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Full Name
            </Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text
                className="bg-white border-end-0"
                style={{ borderRadius: "12px 0 0 12px" }}
              >
                <FaUser className="text-primary" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control-lg border-start-0 ps-0"
                style={{
                  borderRadius: "0 12px 12px 0",
                  boxShadow: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0d6efd";
                  e.target.previousElementSibling.style.borderColor = "#0d6efd";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ced4da";
                  e.target.previousElementSibling.style.borderColor = "#ced4da";
                }}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Email Address
            </Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text
                className="bg-white border-end-0"
                style={{ borderRadius: "12px 0 0 12px" }}
              >
                <FaEnvelope className="text-primary" />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-lg border-start-0 ps-0"
                style={{
                  borderRadius: "0 12px 12px 0",
                  boxShadow: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0d6efd";
                  e.target.previousElementSibling.style.borderColor = "#0d6efd";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ced4da";
                  e.target.previousElementSibling.style.borderColor = "#ced4da";
                }}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold text-dark mb-2">
              Password
            </Form.Label>
            <InputGroup className="shadow-sm">
              <InputGroup.Text
                className="bg-white border-end-0"
                style={{ borderRadius: "12px 0 0 12px" }}
              >
                <FaLock className="text-primary" />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Choose a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-lg border-start-0 ps-0"
                style={{
                  borderRadius: "0 12px 12px 0",
                  boxShadow: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#0d6efd";
                  e.target.previousElementSibling.style.borderColor = "#0d6efd";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ced4da";
                  e.target.previousElementSibling.style.borderColor = "#ced4da";
                }}
                required
              />
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 fw-semibold py-3 border-0 shadow-sm"
            style={{
              fontSize: "1.1rem",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #0d6efd 0%, #0056b3 100%)",
              transition: "all 0.3s ease",
              transform: loading ? "scale(0.98)" : "scale(1)",
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 8px 25px rgba(13, 110, 253, 0.3)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <div className="d-flex align-items-center justify-content-center">
                <Spinner animation="border" size="sm" className="me-2" />
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </Form>

        <div className="text-center mt-4">
          <p className="text-muted mb-0 small">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary fw-semibold text-decoration-none"
              style={{ transition: "all 0.2s ease" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Login
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;

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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card
        className="p-5 shadow rounded-4 border-0 bg-white"
        style={{ maxWidth: "480px", width: "100%" }} // tăng chiều rộng
      >
        <h2 className="text-center mb-4 text-primary fw-bold">
          Create Account
        </h2>

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Full Name</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control-lg" // tăng kích thước
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaEnvelope />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control-lg"
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-lg"
                required
              />
            </InputGroup>
          </Form.Group>

          <Button
            type="submit"
            className="w-100 fw-semibold py-2 fs-5"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Register"}
          </Button>
        </Form>

        <p className="mt-4 text-center small text-muted">
          Already have an account?{" "}
          <a href="/login" className="text-primary fw-semibold">
            Login
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Register;

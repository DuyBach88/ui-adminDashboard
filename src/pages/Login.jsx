import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import {
  Form,
  Button,
  Card,
  InputGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  /*
 try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      const userData = response.data.user;

      login(userData, token);

      toast.success("Login successful!", { autoClose: 3000 });

      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      const userData = response.data.data;

      if (!userData.isEmailVerified) {
        toast.warn("Please verify your email before logging in.");
        localStorage.setItem("pendingEmail", email);
        return navigate("/verify-email");
      }

      // Thành công
      login(userData, token);
      toast.success("Login successful!", { autoClose: 3000 });

      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      }, 1000);
    } catch (error) {
      const errRes = error.response;

      // Trường hợp cần xác minh email
      if (
        errRes?.status === 401 &&
        errRes.data?.needsEmailVerification &&
        errRes.data?.email
      ) {
        const userEmail = errRes.data.email;
        try {
          // Gọi API resend OTP
          await axios.post("http://localhost:3000/api/auth/resend-otp", {
            email: userEmail,
          });

          toast.warn(
            "OTP resent to your email. Please verify before logging in."
          );
        } catch (resendError) {
          toast.error(
            resendError.response?.data?.message || "Failed to resend OTP."
          );
        }

        // Lưu email để dùng trong trang verify
        localStorage.setItem("pendingEmail", userEmail);
        return navigate("/verify-email");
      }

      toast.error(errRes?.data?.message || "Login failed!", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center bg-light position-relative overflow-hidden">
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

      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card
              className="shadow border-0 bg-white position-relative"
              style={{
                borderRadius: "16px",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
            >
              <div className="p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <h3
                    className="text-primary fw-bold mb-2"
                    style={{ fontSize: "1.75rem" }}
                  >
                    Login
                  </h3>
                  <p className="text-muted mb-0 small">
                    Welcome back! Please sign in
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-dark mb-2">
                      Email
                    </Form.Label>
                    <InputGroup className="shadow-sm">
                      <InputGroup.Text
                        className="bg-white border-end-0"
                        style={{ borderRadius: "10px 0 0 10px" }}
                      >
                        <FaUser className="text-primary" />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-start-0 ps-0"
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
                        style={{ borderRadius: "10px 0 0 10px" }}
                      >
                        <FaLock className="text-primary" />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-start-0 ps-0"
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
                        required
                      />
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="text-dark small"
                      style={{ userSelect: "none" }}
                    />
                    <a
                      href="/forgot-password"
                      className="text-primary text-decoration-none small fw-medium"
                      style={{ transition: "all 0.2s ease" }}
                      onMouseOver={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 fw-semibold py-2 border-0 shadow-sm"
                    style={{
                      fontSize: "1.05rem",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(135deg, #0d6efd 0%, #0056b3 100%)",
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
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <p className="text-muted mb-0 small">
                    Don't have an account?{" "}
                    <a
                      href="/register"
                      className="text-primary fw-semibold text-decoration-none"
                      style={{ transition: "all 0.2s ease" }}
                      onMouseOver={(e) =>
                        (e.target.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.textDecoration = "none")
                      }
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;

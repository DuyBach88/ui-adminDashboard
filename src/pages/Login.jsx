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
    <div className="vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow p-4 border-0 rounded-4">
              <h3 className="text-center mb-4 text-primary fw-bold">Login</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white">
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-white">
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                  <a
                    href="/forgot-password"
                    className="text-decoration-none small"
                  >
                    Forgot password?
                  </a>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 fw-semibold"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Form>

              <p className="mt-4 text-center text-muted small">
                Don't have an account?{" "}
                <a href="/register" className="text-primary">
                  Sign up
                </a>
              </p>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;

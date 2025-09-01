import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Lấy user/token từ localStorage nếu có
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [loading, setLoading] = useState(true);

  // Khi login thành công, lưu vào localStorage
  const login = (userData, token) => {
    // Chuẩn hóa role về chữ thường
    const normalizedUser = { ...userData, role: userData.role?.toLowerCase() };
    setUser(normalizedUser);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
  };

  // Khi logout, xóa khỏi localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Xác minh token khi app load
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/verify",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (response.data.success) {
          // Chuẩn hóa role về chữ thường khi xác minh
          const normalizedUser = {
            ...response.data.user,
            role: response.data.user.role?.toLowerCase(),
          };
          setUser(normalizedUser);
          setToken(storedToken);
          localStorage.setItem("user", JSON.stringify(normalizedUser));
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token verification failed", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // Nếu muốn đồng bộ khi localStorage thay đổi ở tab khác
  useEffect(() => {
    const syncAuth = () => {
      setUser(
        localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null
      );
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

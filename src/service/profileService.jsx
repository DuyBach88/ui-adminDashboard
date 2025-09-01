import axios from "axios";

const API_URL = "http://localhost:3000/api/setting";
const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const changePassword = (oldPassword, newPassword) =>
  axios.put(
    `${API_URL}/change-password`,
    { oldPassword, newPassword },
    getAuthHeaders()
  );

// Get employee by userId
export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};
export const resetPassword = (token, newPassword) =>
  axios.post(`${API_URL}/reset-password`, { token, password: newPassword });

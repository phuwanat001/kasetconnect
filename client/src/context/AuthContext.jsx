import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setCurrentUser(null);
    }
    setLoading(false);
  }, []);

  const registerUser = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", data);
      return res.data;
    } catch (error) {
      console.error("Register failed:", error);
      if (error.response) {
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: "Network or server error" };
    }
  };

  const loginUser = async ({ username, password }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      setCurrentUser(res.data.user);
      return res.data;
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: "Network or server error" };
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    setCurrentUser(null);
  };

  const createRental = async (rentalData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/rentals", rentalData);
      return res.data;
    } catch (error) {
      console.error("Create rental failed:", error);
      if (error.response) {
        return { success: false, message: error.response.data.message };
      }
      return { success: false, message: "Network or server error" };
    }
  };


  const value = {
    currentUser,
    registerUser,
    loginUser,
    logout,
    createRental,
    loading,
    
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, login, register, logout } from "../api/authenticationApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(
    () => {
      if (user) {
        setIsAuthenticated(true);
        if (user.email === "admin@abv.bg") {
          setIsAdmin(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    },
    [user]
  );

  const registerSubmitHandler = async (e, email, password, rePass, setErrorMessage) => {
    e.preventDefault();
    try {
        const response = await register(email, password, rePass);
        
        // Check if response contains user data
        if (response && (response.email || response.userId)) {
            setUser(response);
            navigate("/");
            return { success: true };
        } else {
            // Handle case where response doesn't contain expected user data
            setErrorMessage("Registration successful, but user data not received");
            return { error: true, message: "Registration successful, but user data not received" };
        }
    } catch (err) {
        // Handle both error objects and string messages
        const errorMessage = err.message || err.error || "Registration failed";
        setErrorMessage(errorMessage);
        return { error: true, message: errorMessage };
    }
  };

  const loginSubmitHandler = async (e, email, password, setErrorMessage) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      setUser(getUserInfo());
      navigate("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const logoutHandler = async () => {
    try {
      const data = await logout();

      setUser(null);
      setIsAuthenticated(false);
      navigate("/users/login");
    } catch (err) {
      console.log(err.message);
      throw err.message;
    }
  };

  const value = {
    user,
    isAuthenticated,
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;

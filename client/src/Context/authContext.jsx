import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, login, register, logout } from "../api/authenticationApi";

// Create the auth context
const AuthContext = createContext();



// Provide AuthContext to the rest of the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (email, userId)
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status
  const navigate = useNavigate(); // To redirect user after login/logout

  // Get the user info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        // console.log("User is", userInfo);
        setUser(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, []);


  // Function to check if user is authenticated
  useEffect(() => {
    // Check if user is set, if yes, then user is authenticated
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user]);

  const registerSubmitHandler = async (e, email, password, rePass, setErrorMessage) => {
    e.preventDefault();
    try{
        const user = await register(email, password, rePass);

        setUser(getUserInfo());
        navigate("/");
    }catch(err){
      setErrorMessage(err.message)
        // console.log(err.message);
    }
  };

  const loginSubmitHandler = async (e, email, password, setErrorMessage) => {
    e.preventDefault();
    try {
        const user = await login(email, password);
        setUser(getUserInfo()); // Refresh user info after login
        navigate("/");
    } catch (err) {
        // console.log(err.message);
        setErrorMessage(err.message)
        // throw err;
    }
  };

  // Function to handle logout
  const logoutHandler = async () => {
    // Call the backend to log out (clear the cookie on the server)
    try {
        const data = await logout();
    
        // Clear user state
        setUser(null);
        setIsAuthenticated(false);
        navigate("/users/login"); // Redirect to login page after logout
        
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
  };

  // console.log("User:", user);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;

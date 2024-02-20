import { createContext, useState, useContext } from "react";
import { loginRequest } from "../api/auths";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.log("NO hay contexto.");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const singIn = async (user) => {
    try {
      const results = await loginRequest(user);
      const resultStatus = results.status;
      const token = results.headers.authorization      
      setUser(results.data);
      setIsAuthenticated(true);
      return { resultStatus: resultStatus, token: token };

      // manejo de errores
    } catch (error) {
      if (error.response) {
        const errData = error.response.data;
        const errResponse = error.response.status;
        return { errData: errData, errResponse: errResponse };
      } else {
        console.log(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        singIn,
        user,
        isAuthenticated,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

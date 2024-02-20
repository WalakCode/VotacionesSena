import { createContext, useState, useContext } from "react";
import { loginRequest } from "../api/auths";

// Se crea un contexto para gestionar la autenticación
export const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  // Obtener el contexto de autenticación
  const context = useContext(AuthContext);
  // Verificar si el contexto está presente
  if (!context) {
    console.log("NO hay contexto.");
  }
  // Devolver el contexto de autenticación
  return context;
};

export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState();

  // Estado para controlar el estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para realizar la autenticación del usuario
  const singIn = async (user) => {
    try {
      // Realizar la solicitud de inicio de sesión
      const results = await loginRequest(user);

      // Obtener el estado de la respuesta de la solicitud
      const resStatus = results.status;

      // Establecer la información del usuario y autenticar
      setUser(results.data);
      setIsAuthenticated(true);

      // Devolver información sobre la respuesta exitosa
      return { resStatus: resStatus, results: results };
    } catch (error) {
      // Manejar errores durante la solicitud
      if (error.response) {
        // Si la solicitud tuvo una respuesta, obtener detalles del error
        const errorData = error.response.data;
        const errorResponse = error.response.status;

        // Devolver información sobre el error de la respuesta
        return { errorData: errorData, errorResponse: errorResponse };
      } else {
        // Manejar errores no relacionados con la respuesta de la solicitud
        console.log(error);
      }
    }
  };

  // Proporcionar el contexto de autenticación a los componentes descendientes
  return (
    <AuthContext.Provider
      value={{
        singIn,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

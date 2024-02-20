import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import VotoPage from "../page/VotoPage";
import { AuthProvider } from "../context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Se crean las rutas de la pagina  */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/voto" element={<VotoPage />} />

          {/* Renderiza si no existe la ruta */}
          <Route path="*" element={<p>Ruta no encontrada</p>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

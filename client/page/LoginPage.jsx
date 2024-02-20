import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../public/style/style.css";
import logoSena from "../public/img/logo-sena.png";

function LoginPage() {
  // Obtener funciones de react-hook-form
  const { register, handleSubmit } = useForm();
  const navegate = useNavigate();
  const { singIn } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const cerrarVentanaEmergente = () => {
    setMensaje(false);
  };

  // Definir la lógica a ejecutar al enviar el formulario
  const onSubmit = handleSubmit(async (values) => {
    try {
      const results = await singIn(values);
      console.log(results);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  });

  return (
      <div className="Body-login">
        <h1>Centro pecuario y agroempresarial</h1>
    <div className="container-Body-login">
        <div className="container-logo">
          <img
            src={logoSena}
            alt="Logo de la institucion"
            className="img-logo"
          />
          <div className="container-login">
            <div className="container-form">
              <form onSubmit={onSubmit}>
                <p>Inicio de sesion</p>
                <hr />
                <input
                  type="number"
                  {...register("cedula", { required: true })}
                />
                <input
                  type="number"
                  {...register("ficha", { required: true })}
                />
                <hr />
                <button type="submit">Iniciar sesión</button>
              </form>
              {mensaje && (
                <div className="container-mensaje">
                  <div className="mensaje">
                    <p>Ficha o numero de cudula erroneo</p>
                    <button onClick={cerrarVentanaEmergente}>Close</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

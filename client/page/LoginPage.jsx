import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { decodeToken } from "react-jwt";
import "../public/style/style.css";

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
      const token = results.token;

      const tokenValue = token.substring(7);
      const tokenDatos = decodeToken(tokenValue);
      
      // console.log(tokenDatos.rol)
      // if(results.resultStatus  )
      if(tokenDatos.rol === "user"){
        if(results.resultStatus === 202){
          navegate("/voto")
        }
      }

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="Body-login">
      <div className="container-login">
        <div className="container-form">
          <form onSubmit={onSubmit}>
            <p>Ingrese su numero de cedula</p>
            <input type="number" {...register("cedula", { required: true })} />
            <p>Ingrese su numero de ficha</p>
            <input type="number" {...register("ficha", { required: true })} />
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
  );
}

export default LoginPage;

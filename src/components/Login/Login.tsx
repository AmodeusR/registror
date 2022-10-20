import { useForm } from "react-hook-form";
import "./login.scss";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../contexts/data.context";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useCookies } from "react-cookie";

export interface FormProps {
  email: string;
  senha: string;
  confirmarSenha?: string;
}

const Login = () => {
  const { setUser } = useContext(DataContext);
  const [isRegisterSelected, setIsRegisterSelected] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormProps>();
  const navigate = useNavigate();
  const [cookies, setCookie ] = useCookies(["user"]);

  useEffect(() => {
    if (cookies.user) {
      setUser(cookies.user);
      navigate("/inicio");
    }

  }, []);

  return (
    <div className="login-background">
      <h1 className="login__title">Sistema de cadastro de visitantes</h1>
      <div className="login-container">
        <div className="login__buttons">
          <button
            className={`login__button ${!isRegisterSelected && "selected"}`}
            type="button"
            onClick={() => setIsRegisterSelected(false)}
          >
            Entrar
          </button>
          <button
            className={`login__button ${isRegisterSelected && "selected"}`}
            type="button"
            onClick={() => setIsRegisterSelected(true)}
          >
            Registrar
          </button>
        </div>
        { isRegisterSelected ?
          <RegisterForm handleSubmit={handleSubmit} register={register} errors={errors} setError={setError} /> :
          <LoginForm handleSubmit={handleSubmit} register={register} errors={errors} setError={setError} />
        }

          {/* <button type="submit" className="login__submit">
            {isRegisterSelected ? "Registrar" : "Entrar"}
          </button> */}
        
      </div>
    </div>
  );
};

export default Login;

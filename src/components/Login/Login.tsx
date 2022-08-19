import InputLabel from "../InputLabel/InputLabel";
import { useForm } from "react-hook-form";

import "./login.scss";
import { useState } from "react";

interface FormProps {
  email: string;
  senha: string;
  confirmarSenha?: string;
}

const Login = () => {
  const [isRegisterSelected, setIsRegisterSelected] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormProps>();

  const { email, senha, confirmarSenha } = errors;

  const onSubmission = (data: FormProps) => {
    if (isRegisterSelected && data.senha !== data.confirmarSenha) {
      setError(
        "confirmarSenha",
        { type: "string", message: "As senhas precisam ser iguais" },
      );
      
      console.log(confirmarSenha);
      
      return;
    }

    console.log("funcionando");
  };

  return (
    <div className="login-background">
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
        <form onSubmit={handleSubmit(onSubmission)} className="login">
          <div className="create-guest__inputlabel">
            <label htmlFor="email" className="create-guest__label">
              Email
            </label>
            <input
              id="email"
              className="create-guest__input"
              type="email"
              {...register("email", {
                required: "Um email precisa ser fornecido",
              })}
              style={{
                borderColor: email ? "crimson" : "",
              }}
            />
            {email && (
              <p className="create-guest__error">{String(email.message)}</p>
            )}
          </div>
          <div className="create-guest__inputlabel">
            <label htmlFor="senha" className="create-guest__label">
              Senha
            </label>
            <input
              id="senha"
              className="create-guest__input"
              type="password"
              {...register("senha", {
                required: "Uma senha precisa ser fornecida",
              })}
              style={{
                borderColor: senha ? "crimson" : "",
              }}
            />
            {senha && (
              <p className="create-guest__error">{String(senha.message)}</p>
            )}
          </div>
          {isRegisterSelected && (
            <div className="create-guest__inputlabel">
              <label htmlFor="confirmarSenha" className="create-guest__label">
                Confirmar senha
              </label>
              <input
                id="confirmarSenha"
                className="create-guest__input"
                type="password"
                {...register("confirmarSenha", {
                  required: "A senha precisa ser igual a inserida acima",
                })}
                style={{
                  borderColor: senha ? "crimson" : "",
                }}
              />
              {confirmarSenha && (
                <p className="create-guest__error">
                  {String(confirmarSenha.message)}
                </p>
              )}
            </div>
          )}

          <button type="submit" className="login__submit">
            {isRegisterSelected ? "Registrar" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

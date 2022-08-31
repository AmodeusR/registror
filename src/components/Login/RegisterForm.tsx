import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";
import { FormProps } from "./Login";
import { userRegistration } from "../../utils/firebase";
import { useContext } from "react";
import DataContext from "../../contexts/data.context";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<FormProps>;
  register: UseFormRegister<FormProps>;
  errors: FieldErrorsImpl;
  setError: UseFormSetError<FormProps>;
}

const LoginForm = ({ handleSubmit, register, errors, setError }: LoginFormProps) => {
  const { email, senha, confirmarSenha } = errors;
  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [ cookies, setCookie ] = useCookies(["user"]);

  const onSubmission = async (data: FormProps) => {
    if (data.senha !== data.confirmarSenha) {
      setError(
        "confirmarSenha",
        { type: "string", message: "As senhas precisam ser iguais" },
      );
      
      return;
    }

    try {
      const userCredentials = await userRegistration({
        email: data.email,
        senha: data.senha
      });

      if (userCredentials !== undefined) {
        setUser(userCredentials.user);
        setCookie("user", userCredentials.user, {path: "/"});
      }

      navigate("/inicio");      
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          setError("email", {type: "string", message: "Este-email já está registrado"})
        }
      }
      
    }    
  };

  return (
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
            minLength: {
              value: 6,
              message: "A senha precisa ter ao menos 6 caracteres"
            }
          })}
          style={{
            borderColor: senha ? "crimson" : "",
          }}
        />
        {senha && (
          <p className="create-guest__error">{String(senha.message)}</p>
        )}
      </div>
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
      <button type="submit" className="login__submit">
        Criar conta
      </button>
    </form>
  );
};

export default LoginForm;

import { FirebaseError } from "firebase/app";
import { useContext } from "react";
import { useCookies } from "react-cookie";
import {
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetError,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DataContext from "../../contexts/data.context";
import { userLogin } from "../../utils/firebase";
import { FormProps } from "./Login";

interface LoginFormProps {
  handleSubmit: UseFormHandleSubmit<FormProps>;
  register: UseFormRegister<FormProps>;
  errors: FieldErrorsImpl;
  setError: UseFormSetError<FormProps>;

}

const LoginForm = ({ handleSubmit, register, errors, setError }: LoginFormProps) => {
  const { email, senha } = errors;
  const { setUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [cookies, setCookie ] = useCookies(["user"]);  
 
  const onSubmission = async (data: FormProps) => {

    try {
      const userCredentials = await userLogin({
        email: data.email,
        senha: data.senha
      });
      
      setUser(userCredentials.user);
      setCookie("user", userCredentials.user, {path: "/"})

      navigate("/inicio");
    } catch (error: unknown) {
      console.log(error);
      
      if (error instanceof FirebaseError) {
        
        if (error.code === "auth/user-not-found") {
          setError("email", {type: "string", message:"Não há um usuário registrado com este e-mail"});
        } else if (error.code === "auth/wrong-password") {
          setError("senha", {type: "string", message:"A senha informada está incorreta"});
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
          })}
          style={{
            borderColor: senha ? "crimson" : "",
          }}
        />
        {senha && (
          <p className="create-guest__error">{String(senha.message)}</p>
        )}
      </div>
      <button type="submit" className="login__submit">
        Entrar
      </button>
    </form>
  );
};

export default LoginForm;

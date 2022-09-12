import { UseFormRegister } from "react-hook-form";
import { GuestCardProps } from "../Cards/cards.types";

interface CPFLabelProps {
  register: UseFormRegister<GuestCardProps>;
  type: string;
  required?: boolean | string;
  error?: {
    message?: string;
  };
}

const CPFInputLabel = ({
  register,
  type,
  required = false,
  error,
}: CPFLabelProps) => {

  return (
    <div className="create-guest__inputlabel">
      <label htmlFor="cpf" className="create-guest__label">
        CPF
      </label>
      <input
        id="cpf"
        className="create-guest__input"
        type={type}
        {...register("cpf", {
          required: required,
          minLength: {
            value: 11,
            message: "11 dígitos são necessários"
          },
          maxLength: {
            value: 11,
            message: "Há mais de 11 dígitos"
          }
        })}
        style={{
          borderColor: error ? "crimson" : "",
        }}
        
      />
      {error && <p className="create-guest__error">{error.message}</p>}
    </div>
  );
};

export default CPFInputLabel;

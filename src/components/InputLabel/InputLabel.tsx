import { UseFormRegister } from "react-hook-form";
import { GuestCardProps } from "../Cards/cards.types";

interface InputLabelProps {
  register: UseFormRegister<GuestCardProps>;
  type: string;
  data: "guestPicture" | "nome" | "cidade" | "bairro" | "rua" | "numero" | "complemento";
  required?: boolean | string;
  error?: {
    message?: string
  };
}

const InputLabel = ({ register, type, data, required = false, error}: InputLabelProps) => {
  
  return (
    <div className="create-guest__inputlabel">
      <label htmlFor={data} className="create-guest__label">
        {data === "numero" ?
         "número" :
          data
        }
      </label>
      <input
        id={data}
        className="create-guest__input"
        type={type}
        {...register(data, {required: required})}
        style={{
          borderColor: error ? "crimson" : ""
        }}
      />
      {error &&
        <p className="create-guest__error">{error.message}</p>
      }
    </div>
  );
};

export default InputLabel;

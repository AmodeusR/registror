import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputLabelProps {
  register: UseFormRegister<FieldValues>;
  type: string;
  data: string;
  required?: boolean | string;
  error?: {
    message?: string
  };
}

const InputLabel = ({ register, type, data, required = false, error}: InputLabelProps) => {
  
  return (
    <div className="create-user__inputlabel">
      <label htmlFor={data} className="create-user__label">
        {data}
      </label>
      <input
        id={data}
        className="create-user__input"
        type={type}
        {...register(data, {required: required})}
        style={{
          borderColor: error ? "crimson" : ""
        }}
      />
      {error &&
        <p className="create-user__error">{error.message}</p>
      }
    </div>
  );
};

export default InputLabel;

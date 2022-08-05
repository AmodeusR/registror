import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputLabelProps {
  register: UseFormRegister<FieldValues>;
  type: string;
  data: string;
  required?: boolean;
}

const InputLabel = ({ register, type, data, required = false }: InputLabelProps) => {

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
      />
    </div>
  );
};

export default InputLabel;

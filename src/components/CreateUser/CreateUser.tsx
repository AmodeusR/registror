import { useContext, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import DataContext from "../../contexts/data.context";
import { X } from "phosphor-react";
import InputLabel from "../InputLabel/InputLabel";
import CPFInput from "../InputLabel/CPFInput";

import "./create-user.scss";

const CreateUser = () => {
  const { setIsModalOpen } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { CPF, nome } = errors;

  const onSubmission = () => {};

  const handleModalClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "DIV") {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="create-user-background"
      onClick={(e) => handleModalClose(e)}
    >
      <form onSubmit={handleSubmit(onSubmission)} className="create-user">
        <h2>Cadastro de Visitante</h2>
        <X
          weight="bold"
          size={32}
          className="create-user__close-button"
          onClick={() => setIsModalOpen(false)}
        />

        <span className="create-user__section-title">Dados pessoais</span>

        <InputLabel
          register={register}
          type="text"
          data="nome"
          required="Um nome precisa ser fornecido"
          error={nome}
        />
        <CPFInput
          register={register}
          type="number"
          data="CPF"
          required="Um CPF precisa ser fornecido"
          error={CPF}
        />

        <span className="create-user__section-title">Endereço</span>

        <InputLabel register={register} type="text" data="cidade" />
        <InputLabel register={register} type="text" data="bairro" />
        <div className="create-user__flex">
          <InputLabel register={register} type="text" data="rua" />
          <InputLabel register={register} type="number" data="número" />
        </div>
        <InputLabel register={register} type="text" data="complemento" />
        <button type="submit" className="create-user__button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CreateUser;

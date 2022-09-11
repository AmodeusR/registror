import { useContext, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import DataContext from "../../contexts/data.context";
import { X } from "phosphor-react";
import InputLabel from "../InputLabel/InputLabel";
import CPFInput from "../InputLabel/CPFInput";

import "./create-guest.scss";
import { createNewGuest } from "../../utils/firebase";
import { GuestCardProps } from "../Cards/cards.types";

const CreateGuest = () => {
  const { setIsRegisterModalOpen, setGuestCardInfoModalId } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<GuestCardProps>();
  const { cpf, nome } = errors;

  const onSubmission = async (data: GuestCardProps) => {

    const error = await createNewGuest(data);
    if (error) {
      setError("cpf", {type: "string", message: error})
    } else {
      setIsRegisterModalOpen(false);
      setGuestCardInfoModalId(data.cpf);
    }    

  };

  const handleModalClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.tagName === "DIV") {
      setIsRegisterModalOpen(false);
    }
  };

  return (
    <div
      className="create-guest-background"
      onClick={(e) => handleModalClose(e)}
    >
      <form onSubmit={handleSubmit(onSubmission)} className="create-guest">
        <h2>Cadastro de Visitante</h2>
        <X
          weight="bold"
          size={32}
          className="create-guest__close-button"
          onClick={() => setIsRegisterModalOpen(false)}
        />


        <span className="create-guest__section-title">Dados pessoais</span>

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
          required="Um CPF precisa ser fornecido"
          error={cpf}
        />

        <span className="create-guest__section-title">Endereço</span>

        <InputLabel register={register} type="text" data="cidade" />
        <InputLabel register={register} type="text" data="bairro" />
        <div className="create-guest__flex">
          <InputLabel register={register} type="text" data="rua" />
          <InputLabel register={register} type="number" data="numero" />
        </div>
        <InputLabel register={register} type="text" data="complemento" />
        <button type="submit" className="create-guest__button">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CreateGuest;

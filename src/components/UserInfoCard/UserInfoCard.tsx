import { useContext, MouseEvent } from "react";
import DataContext from "../../contexts/data.context";
import { X } from "phosphor-react";
import { UserCardProps } from "../Cards/cards.types";
import { formatCPF } from "../../utils/formatCPF";
import profilePicturePlaceholder from "../../assets/profile-placeholder.webp";

import "./userinfo.scss";
import ImageShooterModal from "../ImageShooterModal/ImageShooterModal";

const UserInfoCard = ({
  userPicture,
  nome,
  cpf,
  cidade,
  bairro,
  rua,
  numero,
  complemento,
}: UserCardProps) => {
  const { setUserCardInfoModalId, setIsImageModalOpen } = useContext(DataContext);

  const handleModalClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.id === "background-closer") {
      setUserCardInfoModalId("");
    }
  };

  const handlePictureChange = () => {
    console.log("funcionando");
    
  }

  return (
    <div
      className="create-user-background"
      onClick={(e) => handleModalClose(e)}
      id="background-closer"
    >
        <div className="userinfo">
          <X
            weight="bold"
            size={32}
            className="create-user__close-button"
            onClick={() => setUserCardInfoModalId("")}
          />
          <img className="userinfo__image" src={userPicture || profilePicturePlaceholder} alt="" onClick={handlePictureChange} />
          <ImageShooterModal />
          
          <span className="create-user__section-title">Dados pessoais</span>
          
          <div className="userinfo__info">
            <h2 className="userinfo__title">Nome</h2>
            <p className="userinfo__description">{nome}</p>
          </div>
          <div className="userinfo__info">
            <h2 className="userinfo__title">CPF</h2>
            <p className="userinfo__description">{formatCPF(cpf)}</p>
          </div>

          <span className="create-user__section-title">Endereço</span>
          
          <div className="userinfo__info">
            <h2 className="userinfo__title">Cidade</h2>
            <p className="userinfo__description">{cidade || "Não informado"}</p>
          </div>
          <div className="userinfo__info">
            <h2 className="userinfo__title">Bairro</h2>
            <p className="userinfo__description">{bairro || "Não informado"}</p>
          </div>
          <div className="userinfo__flex">
            <div className="userinfo__info">
              <h2 className="userinfo__title">Rua</h2>
              <p className="userinfo__description">{rua || "Não informado"}</p>
            </div>
            <div className="userinfo__info">
              <h2 className="userinfo__title">Número</h2>
              <p className="userinfo__description">{numero || "Não informado"}</p>
            </div>
          </div>
          <div className="userinfo__info">
            <h2 className="userinfo__title">Complemento</h2>
            <p className="userinfo__description">{complemento || "Não informado"}</p>
          </div>
          <button type="button" className="userinfo__button">
            Registrar visita
          </button>
        </div>
    </div>
  );
};

export default UserInfoCard;

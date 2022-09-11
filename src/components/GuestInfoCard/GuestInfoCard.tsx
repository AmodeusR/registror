import { useContext, MouseEvent } from "react";
import DataContext from "../../contexts/data.context";
import { X } from "phosphor-react";
import { GuestCardProps } from "../Cards/cards.types";
import { formatCPF } from "../../utils/formatCPF";
import profilePicturePlaceholder from "../../assets/profile-placeholder.webp";

import "./guestinfo.scss";
import ImageShooterModal from "../ImageShooterModal/ImageShooterModal";

const GuestInfoCard = ({
  guestPicture,
  nome,
  cpf,
  cidade,
  bairro,
  rua,
  numero,
  complemento,
}: GuestCardProps) => {
  const { setGuestCardInfoModalId, setIsImageModalOpen } = useContext(DataContext);

  const handleModalClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.id === "background-closer") {
      setGuestCardInfoModalId(null);
    }
  };

  const handlePictureChange = () => {
    console.log("funcionando");
    
  }

  return (
    <div
      className="create-guest-background"
      onClick={(e) => handleModalClose(e)}
      id="background-closer"
    >
        <div className="guestinfo">
          <X
            weight="bold"
            size={32}
            className="create-guest__close-button"
            onClick={() => setGuestCardInfoModalId(null)}
          />
          <img className="guestinfo__image" src={guestPicture || profilePicturePlaceholder} alt="" onClick={handlePictureChange} />
          <ImageShooterModal />
          
          <span className="create-guest__section-title">Dados pessoais</span>
          
          <div className="guestinfo__info">
            <h2 className="guestinfo__title">Nome</h2>
            <p className="guestinfo__description">{nome}</p>
          </div>
          <div className="guestinfo__info">
            <h2 className="guestinfo__title">CPF</h2>
            <p className="guestinfo__description">{formatCPF(cpf)}</p>
          </div>

          <span className="create-guest__section-title">Endereço</span>
          
          <div className="guestinfo__info">
            <h2 className="guestinfo__title">Cidade</h2>
            <p className="guestinfo__description">{cidade || "Não informado"}</p>
          </div>
          <div className="guestinfo__info">
            <h2 className="guestinfo__title">Bairro</h2>
            <p className="guestinfo__description">{bairro || "Não informado"}</p>
          </div>
          <div className="guestinfo__flex">
            <div className="guestinfo__info">
              <h2 className="guestinfo__title">Rua</h2>
              <p className="guestinfo__description">{rua || "Não informado"}</p>
            </div>
            <div className="guestinfo__info">
              <h2 className="guestinfo__title">Número</h2>
              <p className="guestinfo__description">{numero || "Não informado"}</p>
            </div>
          </div>
          <div className="guestinfo__info">
            <h2 className="guestinfo__title">Complemento</h2>
            <p className="guestinfo__description">{complemento || "Não informado"}</p>
          </div>
          <button type="button" className="guestinfo__button">
            Registrar visita
          </button>
        </div>
    </div>
  );
};

export default GuestInfoCard;

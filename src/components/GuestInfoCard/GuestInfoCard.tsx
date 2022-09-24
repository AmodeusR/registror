import { useContext, useState, MouseEvent } from "react";
import DataContext from "../../contexts/data.context";
import { X } from "phosphor-react";
import { GuestCardProps } from "../Cards/cards.types";
import { formatCPF } from "../../utils/formatCPF";
import profilePicturePlaceholder from "../../assets/profile-placeholder.webp";
import { Timestamp } from "firebase/firestore";

import "./guestinfo.scss";
import ImageShooterModal from "../ImageShooterModal/ImageShooterModal";
import { fetchFirestoreData, registerVisit, removeGuest } from "../../utils/firebase";

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
  const { setGuestCardInfoModalId, setIsImageModalOpen, isImageModalOpen, fetchedData, setFetchedData } = useContext(DataContext);
  const [imageSrc, setImageSrc] = useState<string>("");
  const handleVisitRegister = async () => {
    const visitorToRegister = {
      guestPicture,
      nome,
      cpf,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
      entrada: Timestamp.fromDate(new Date())
    };

    try {
      await registerVisit(visitorToRegister);
      const updatedData = await fetchFirestoreData();
      setFetchedData(updatedData);
      
      setGuestCardInfoModalId(null);
    } catch (error) {
      console.log(error);      
    }

  }

  const handleModalClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.id === "background-closer") {
      setGuestCardInfoModalId(null);
    }
  };

  const handlePictureChange = () => {
    setIsImageModalOpen(!isImageModalOpen);    
  }

  const handleGuestRemove = async () => {
    const guestToRemove = fetchedData["guests"].filter(guest => guest.cpf === cpf)[0];
    
    removeGuest(guestToRemove);
    const data = await fetchFirestoreData();
    setGuestCardInfoModalId(null);

    if(!data) return;
    setFetchedData(data);
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
          <img className="guestinfo__image" src={imageSrc || guestPicture || profilePicturePlaceholder} alt="" onClick={handlePictureChange} />
          {isImageModalOpen &&
            <ImageShooterModal cpf={cpf} setImageSrc={setImageSrc} />
          }
          
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
          <div className="guestinfo__buttons">
            <button type="button" className="guestinfo__button delete" onClick={handleGuestRemove}>
              Deletar
            </button>
            <button type="button" className="guestinfo__button" onClick={handleVisitRegister}>
              Registrar visita
            </button>
          </div>
        </div>
    </div>
  );
};

export default GuestInfoCard;

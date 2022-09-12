import React, { useContext } from "react";
import DataContext from "../../contexts/data.context";
import { formatCPF } from "../../utils/formatCPF";
import { GuestCardProps } from "./cards.types";
import "./card.scss";
import ProfilePlaceHolder from "../../assets/profile-placeholder.webp";

interface AdressInfoType {
  cidade: String | undefined;
  rua: String | undefined;
  numero: String | undefined;
}

const GuestCard = ({
  guestPicture,
  nome,
  cpf,
  cidade,
  bairro,
  rua,
  numero,
  complemento,
}: GuestCardProps) => {
  const { setGuestCardInfoModalId } = useContext(DataContext);

  const handleClick = () => {
    setGuestCardInfoModalId(cpf);
  }

  const handleCardAdressInfo = ({ cidade, rua, numero }: AdressInfoType) => {
    if (cidade && rua && numero) {
      return `${cidade} – ${rua}, ${numero}`;
    } else if (cidade && rua) {
      return `${cidade} – ${rua}`
    } else if (cidade) {
      return `${cidade}`;
    } else {
      return "Não informado"
    }
  }

  return (
    <button className="card" onClick={handleClick}>
      <img
        className="card__image"
        src={guestPicture || ProfilePlaceHolder}
        alt=""
      />
      <div className="card__section">
        <span className="card__label">nome</span>
        <p className="card__info">{nome}</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">cpf</span>
        <p className="card__info">{formatCPF(cpf)}</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">endereço</span>
        <p className="card__info">{handleCardAdressInfo({cidade, rua, numero})}</p>
      </div>
    </button>
  );
};

export default GuestCard;

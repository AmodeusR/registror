import { useContext } from "react";
import DataContext from "../../contexts/data.context";
import { formatCPF } from "../../utils/formatCPF";
import { formatAddress } from "../../utils/formatAddress";
import { GuestCardProps } from "./cards.types";
import "./card.scss";
import ProfilePlaceholder from "../../assets/profile-placeholder.webp";

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

  return (
    <button className="card" onClick={handleClick}>
      <img
        className="card__image"
        src={guestPicture || ProfilePlaceholder}
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
        <p className="card__info">{formatAddress({cidade, rua, numero})}</p>
      </div>
    </button>
  );
};

export default GuestCard;

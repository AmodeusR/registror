import { formatAddress } from "../../utils/formatAddress";
import { formatCPF } from "../../utils/formatCPF";
import { VisitorCardProps } from "./cards.types";
import ProfilePlaceholder from "../../assets/profile-placeholder.webp";
import { formatDateRelative, formatDate } from "../../utils/formatDate";
import { useContext } from "react";
import DataContext from "../../contexts/data.context";
import { capitalize } from "../../utils/capitalize";

const VisitorCard = ({
  guestPicture,
  nome,
  cpf,
  cidade,
  bairro,
  rua,
  numero,
  complemento,
  entrada,
  visitando,
  visitado,
  tipoDaVisita
}: VisitorCardProps) => {
  const { setVisitorCardInfoModalId } = useContext(DataContext);

  const handleClick = () => {
    setVisitorCardInfoModalId(cpf);
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
        <span className="card__label">visitante é</span>
        <p className="card__info">{capitalize(tipoDaVisita)}</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">visitando</span>
        <p className="card__info">{capitalize(visitado)} - apart. {visitando}</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">entrada</span>
        <p className="card__info">{formatDateRelative(entrada)}</p>
      </div>

    </button>
  );
};

export default VisitorCard;

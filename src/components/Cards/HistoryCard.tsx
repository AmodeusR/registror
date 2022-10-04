import "./card.scss";
import { HistoryCardProps } from "./cards.types";
import ProfilePlaceholder from "../../assets/profile-placeholder.webp";
import { formatCPF } from "../../utils/formatCPF";
import { formatAddress } from "../../utils/formatAddress";
import { formatDateRelative } from "../../utils/formatDate";
import DataContext from "../../contexts/data.context";
import { useContext } from "react";
import { capitalize } from "../../utils/capitalize";

const HistoryCard = ({
  id,
  guestPicture,
  nome,
  cpf,
  cidade,
  bairro,
  rua,
  numero,
  complemento,
  entrada,
  saida,
  visitando,
  visitado,
  tipoDaVisita
}: HistoryCardProps) => {
  const { setHistoryCardInfoModalId } = useContext(DataContext);

  const handleClick = () => {
    if (!id) return;
    
    setHistoryCardInfoModalId(id);
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
        <span className="card__label">visitou</span>
        <p className="card__info">{capitalize(visitado)} - apart. {visitando}</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">visitante é</span>
        <p className="card__info">{capitalize(tipoDaVisita)}</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">entrada</span>
        <p className="card__info">{formatDateRelative(entrada)}</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">saída</span>
        <p className="card__info">{formatDateRelative(saida)}</p>
      </div>
    </button>
  );
};

export default HistoryCard;

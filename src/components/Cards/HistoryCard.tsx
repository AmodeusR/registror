import "./card.scss";
import { HistoryCardProps } from "./cards.types";
import ProfilePlaceholder from "../../assets/profile-placeholder.webp";
import { formatCPF } from "../../utils/formatCPF";
import { formatAddress } from "../../utils/formatAddress";
import { formatDateRelative } from "../../utils/formatDate";

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
  saida
}: HistoryCardProps) => {
  return (
    <button className="card">
      <img
        className="card__image"
        src={guestPicture || ProfilePlaceholder}
        alt="imagem aleatória"
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
        <span className="card__label">visitando</span>
        <p className="card__info">{formatAddress({cidade, rua, numero})}</p>
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

export default VisitorCard;

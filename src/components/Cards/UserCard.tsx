import { formatCPF } from "../../utils/formatCPF";
import "./card.scss";

interface UserCardProps {
  userPicture?: string;
  nome: string;
  cpf: number;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
}

const UserCard = ({
  userPicture,
  nome,
  cpf,
  cidade,
  bairro,
  rua,
  numero,
  complemento,
}: UserCardProps) => {

  return (
    <button className="card">
      <img
        className="card__image"
        src={userPicture}
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
        <span className="card__label">endereço</span>
        <p className="card__info">{`${cidade} – ${rua}, ${numero}`}</p>
      </div>
    </button>
  );
};

export default UserCard;

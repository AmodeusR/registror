import React, { useContext } from "react";
import DataContext from "../../contexts/data.context";
import { formatCPF } from "../../utils/formatCPF";
import "./card.scss";
import { UserCardProps } from "./cards.types";

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
  const { setUserCardInfoModalId } = useContext(DataContext);

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    setUserCardInfoModalId(target.id);

  }

  return (
    <button className="card" id={String(cpf)} onClick={(e) => handleClick(e)}>
      <img
        className="card__image"
        src={userPicture}
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
        <p className="card__info">{`${cidade} – ${rua}, ${numero}`}</p>
      </div>
    </button>
  );
};

export default UserCard;

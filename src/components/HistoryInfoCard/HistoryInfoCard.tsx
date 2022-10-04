import { MouseEvent } from "react";
import { X } from "phosphor-react";
import { useContext } from "react";
import DataContext from "../../contexts/data.context";
import { HistoryCardProps } from "../Cards/cards.types";
import profilePicturePlaceholder from "../../assets/profile-placeholder.webp";
import { formatCPF } from "../../utils/formatCPF";
import { formatDate } from "../../utils/formatDate";

const HistoryInfoCard = ({
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

  const handleModalClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (target.id === "background-closer") {
      setHistoryCardInfoModalId(null);
    }
  };
  
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
          onClick={() => setHistoryCardInfoModalId(null)}
        />
        <img
          className="guestinfo__image"
          src={guestPicture || profilePicturePlaceholder}
          alt=""
          style={{
            cursor: "auto"
          }}
        />

        <span className="create-guest__section-title">Dados pessoais</span>

        <div className="guestinfo__info">
          <h2 className="guestinfo__title">Nome</h2>
          <p className="guestinfo__description">{nome}</p>
        </div>
        <div className="guestinfo__info">
          <h2 className="guestinfo__title">CPF</h2>
          <p className="guestinfo__description">{formatCPF(cpf)}</p>
        </div>

        <span className="create-guest__section-title">Visita</span>

        <div
          style={{ display: "flex", justifyContent: "flex-start", gap: "4rem", width: "100%" }}
        >
          <div className="guestinfo__info">
            <h2 className="guestinfo__title">Visitou</h2>
            <p className="guestinfo__description card__date">
              {visitado} – apart. {visitando}
            </p>
          </div>

          <div className="guestinfo__info">
            <h2 className="guestinfo__title">Visitante é</h2>
            <p className="guestinfo__description card__date">{tipoDaVisita}</p>
          </div>
        </div>

        <div className="guestinfo__info">
          <h2 className="guestinfo__title">Entrou</h2>
          <p className="guestinfo__description card__date">
            {formatDate(entrada)}
          </p>
        </div>
        <div className="guestinfo__info">
          <h2 className="guestinfo__title">Saiu</h2>
          <p className="guestinfo__description card__date">
            {formatDate(saida)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryInfoCard;

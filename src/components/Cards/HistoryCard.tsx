import "./card.scss";

const VisitorCard = () => {
  return (
    <button className="card">
      <img
        className="card__image"
        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        alt="imagem aleatória"
      />
      <div className="card__section">
        <span className="card__label">nome</span>
        <p className="card__info">André Aquino de Bragança</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">cpf</span>
        <p className="card__info">123.456.789-0</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">visitando</span>
        <p className="card__info">Av. Alameda, 222 — Fortaleza</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">entrada</span>
        <p className="card__info">Domingo, às 14h16</p>
      </div>

      <div className="card__vertical-line" />

      <div className="card__section">
        <span className="card__label">saída</span>
        <p className="card__info">Domingo, às 16h00</p>
      </div>
    </button>
  );
};

export default VisitorCard;


const VisitConfirmationModal = () => {
  return (
    <div className="guestinfo__confirm-modal">
      <div className="confirm-modal__flex">
        <div>
          <p className="confirm-modal__title">Apart. de Destino</p>
          <select className="confirm-modal__input">
            <option value="teste1">Casa</option>
            <option value="teste2">Maguita</option>
            <option value="teste3">Apartamento</option>
          </select>
        </div>
        <div className="confirm-modal__grow">
          <p className="confirm-modal__title">Visitando</p>
          <input type="text" className="confirm-modal__input grow" required />
        </div>
      </div>
        <div>
          <p className="confirm-modal__title">Visitante é:</p>
          <select className="confirm-modal__input grow">
            <option value="teste1">Familiar</option>
            <option value="teste2">Prestador de serviço</option>
          </select>
        </div>


      <button className="confirm-modal__button">Confirmar</button>
    </div>
  );
};

export default VisitConfirmationModal;

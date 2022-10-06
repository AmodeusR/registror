import { Timestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import Select from "react-select";
import DataContext, { ApartmentOption } from "../../contexts/data.context";
import { fetchFirestoreData, registerVisit } from "../../utils/firebase";
import { GuestCardProps } from "../Cards/cards.types";



interface VisitorIsOption {
  readonly label: string;
  readonly value: string;
}

const placeholderApartments: ApartmentOption[] = [
  {
    label: 101,
    value: 101
  },
  {
    label: 102,
    value: 102
  },
  {
    label: 201,
    value: 201
  },
  {
    label: 202,
    value: 202
  },
  {
    label: 301,
    value: 301
  },
  {
    label: 302,
    value: 302
  },
  {
    label: 401,
    value: 401
  },
  {
    label: 402,
    value: 402
  },
  {
    label: 501,
    value: 501
  },
  {
    label: 502,
    value: 502
  },
  {
    label: 601,
    value: 601
  },
  {
    label: 602,
    value: 602
  }
]


const visitorIsOptions: VisitorIsOption[] = [
  {
    label: "Conhecido",
    value: "conhecido"
  },
  {
    label: "Familiar",
    value: "familiar"
  },
  {
    label: "Prestador de serviços",
    value: "prestador de serviços"
  },
  {
    label: "Entregador",
    value: "entregador"
  }
];

interface VisitorConfirmationModalProps {
  visitorData: GuestCardProps;
}

const VisitConfirmationModal = ({ visitorData }: VisitorConfirmationModalProps) => {
  const { setFetchedData, setGuestCardInfoModalId, fetchedApartments } = useContext(DataContext);
  const [visiting, setVisiting] = useState<ApartmentOption | null>(null);
  const [visitedName, setVisitedName] = useState("");
  const [visitorIs, setVisitorIs] = useState<VisitorIsOption | null>(null);

  const handleSubmission = async () => {
    if (!visiting) {
      alert("Você deve selecionar o apartamento a ser visitado");

      return;
    } else if (visitedName.length === 0) {
      alert("Você deve informar o nome de quem está sendo visitado");

      return;
    } else if (!visitorIs) {
      alert("Você deve especificar se o visitante é familiar ou prestador de serviços");

      return;
    }

    const visitorToRegister = {
      ...visitorData,
      entrada: Timestamp.fromDate(new Date()),
      visitando: visiting?.value,
      visitado: visitedName.toLowerCase(),
      tipoDaVisita: visitorIs?.value
    };    

    try {
      await registerVisit(visitorToRegister);
      const updatedData = await fetchFirestoreData();
      setFetchedData(updatedData);
      
      setGuestCardInfoModalId(null);
    } catch (error) {
      console.log(error);      
    }
  };

  return (
    <div className="guestinfo__confirm-modal">
      <div className="confirm-modal__flex">
        <div className="confirm-modal__inputlabel">
          <p className="confirm-modal__title">
            Apart. de Destino
          </p>
          <Select
            className="confirm-modal__input"
            onChange={setVisiting}
            options={fetchedApartments || placeholderApartments}
            placeholder="Selecione..."
          />
        </div>
        <div className="confirm-modal__grow confirm-modal__inputlabel">
          <p className="confirm-modal__title">
            Visitando
          </p>
          <input
            id="visitor-is"
            type="text"
            className="confirm-modal__input grow visiting"
            required
            value={visitedName}
            onChange={(e) => setVisitedName(e.target.value)}
          />
        </div>
      </div>
      <div className="confirm-modal__inputlabel">
        <p className="confirm-modal__title">
          Visitante é:
        </p>
        <Select
          className="confirm-modal__input grow"
          onChange={setVisitorIs}
          options={visitorIsOptions}
          placeholder="Selecione..."
        />
      </div>

      <button className="confirm-modal__button" onClick={handleSubmission}>
        Confirmar
      </button>
    </div>
  );
};

export default VisitConfirmationModal;

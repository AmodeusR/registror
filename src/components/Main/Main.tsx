import { useContext } from "react";
import DataContext from "../../contexts/data.context";

import GuestCard from "../Cards/GuestCard";
import VisitorCard from "../Cards/VisitorCard";
import HistoryCard from "../Cards/HistoryCard";

import "./main.scss";

const Main = () => {
  const { search, fetchedData, selectedSidebarTab } = useContext(DataContext);
  
  return (
    <main className="main-section">
      {Object.keys(fetchedData).length !== 0 && fetchedData[selectedSidebarTab].length ?
        fetchedData[selectedSidebarTab].filter(({ nome, cpf }) =>
          nome.toLowerCase().includes(search.toLowerCase()) ||
          String(cpf).includes(search)
        )
        .map((guest) => (
          <GuestCard
            key={guest.cpf}
            guestPicture={guest.guestPicture}
            nome={guest.nome}
            cpf={guest.cpf}
            cidade={guest.cidade}
            bairro={guest.bairro}
            rua={guest.rua}
            numero={guest.numero}
          />
        )) :
        <p className="main-section__error-message">Banco de dados inacessível.</p>
      }
    </main>
  );
};

export default Main;

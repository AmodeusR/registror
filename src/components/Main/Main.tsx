import { useContext } from "react";
import DataContext from "../../contexts/data.context";

import GuestCard from "../Cards/GuestCard";
import VisitorCard from "../Cards/VisitorCard";
import HistoryCard from "../Cards/HistoryCard";

import "./main.scss";

const Main = () => {
  const { search, fetchedData, selectedSidebarTab } = useContext(DataContext);

  const dataToShow = fetchedData[selectedSidebarTab];
  
  
  return (
    <main className="main-section">
      {dataToShow.filter(({ nome, cpf }) => 
          nome.toLowerCase().includes(search.toLowerCase()) || String(cpf).includes(search)
        ).map(user => {
          if (selectedSidebarTab === "guests") {
            return (
              <GuestCard
              key={user.cpf}
              guestPicture={user.guestPicture}
              nome={user.nome}
              cpf={user.cpf}
              cidade={user.cidade}
              bairro={user.bairro}
              rua={user.rua}
              numero={user.numero}
              />
            );
          } else if (selectedSidebarTab === "visiting") {
            return (
              <VisitorCard
              key={user.cpf}
              guestPicture={user.guestPicture}
              nome={user.nome}
              cpf={user.cpf}
              cidade={user.cidade}
              bairro={user.bairro}
              rua={user.rua}
              numero={user.numero}
              //@ts-ignore
              entrada={user.entrada}
              />
              );
            } else if (selectedSidebarTab === "history") {
            return (
              <HistoryCard
              //@ts-ignore
                key={user.id}
                guestPicture={user.guestPicture}
                nome={user.nome}
                cpf={user.cpf}
                cidade={user.cidade}
                bairro={user.bairro}
                rua={user.rua}
                numero={user.numero}
                //@ts-ignore
                entrada={user.entrada}
                //@ts-ignore
                saida={user.saida}
              />
            );
          }            
        }).reverse() || 
        <p className="main-section__error-message">Banco de dados inacessível.</p>
      }
    </main>
  );
};

export default Main;

import { useContext } from "react";
import DataContext from "../../contexts/data.context";

import GuestCard from "../Cards/GuestCard";
import VisitorCard from "../Cards/VisitorCard";
import HistoryCard from "../Cards/HistoryCard";

import "./main-section.scss";

const Main = () => {
  const { search, fetchedData, selectedSidebarTab } = useContext(DataContext);

  const dataToShow = fetchedData[selectedSidebarTab] || [];
  
  
  return (
    <main className="main-section">
      {dataToShow && dataToShow.filter(({ nome, cpf }) => 
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
                // @ts-ignore
                entrada={user.entrada}
                // @ts-ignore
                visitando={user.visitando}
                // @ts-ignore
                visitado={user.visitado}
                // @ts-ignore
                tipoDaVisita={user.tipoDaVisita}
              />
              );
            } else if (selectedSidebarTab === "history") {
            return (
              <HistoryCard
                //@ts-ignore
                key={user.id}
                //@ts-ignore
                id={user.id}
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
                //@ts-ignore
                visitando={user.visitando}
                //@ts-ignore
                visitado={user.visitado}
                //@ts-ignore
                tipoDaVisita={user.tipoDaVisita}
              />
            );
          }            
        }).reverse()
      }
      {dataToShow.length === 0 &&
      <div>
        <p className="main-section__empty-message">Parece que não há nada aqui</p>
      </div>
      }
    </main>
  );
};

export default Main;

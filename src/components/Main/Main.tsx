import { useContext, useEffect, useState } from "react";
import DataContext from "../../contexts/data.context";
import { useNavigate } from "react-router-dom";

import GuestCard from "../Cards/GuestCard";
import VisitorCard from "../Cards/VisitorCard";
import HistoryCard from "../Cards/HistoryCard";

import { GuestCardProps } from "../Cards/cards.types";
import "./main.scss";

const Main = () => {
  const { search, user } = useContext(DataContext);
  const [fetchedGuests, setFetchedGuests] = useState<GuestCardProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/guests");
      const data = await response.json();

      setFetchedGuests(data);
    }

    fetchData();
  }, []);

  return (
    <main className="main-section">
      {fetchedGuests.length ?
        fetchedGuests.filter(({ nome, cpf }) =>
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

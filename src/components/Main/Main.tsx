import UserCard from "../Cards/UserCard";
import VisitorCard from "../Cards/VisitorCard";
import HistoryCard from "../Cards/HistoryCard";

import "./main.scss";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../contexts/data.context";
import { UserCardProps } from "../Cards/cards.types";

const Main = () => {
  const { search } = useContext(DataContext);
  const [fetchedUsers, setFetchedUsers] = useState<UserCardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();

      setFetchedUsers(data);
    }

    fetchData();
  }, []);

  return (
    <main className="main-section">
      {fetchedUsers
        .filter(({ nome, cpf }) =>
          nome.toLowerCase().includes(search.toLowerCase()) ||
          String(cpf).includes(search)
        )
        .map((user) => (
          <UserCard
            key={user.cpf}
            userPicture={user.userPicture}
            nome={user.nome}
            cpf={user.cpf}
            cidade={user.cidade}
            bairro={user.bairro}
            rua={user.rua}
            numero={user.numero}
          />
        ))}
    </main>
  );
};

export default Main;

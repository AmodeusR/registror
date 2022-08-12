import { useContext, useEffect, useState } from "react";
import { Header, Sidebar, Main, UserInfoCard } from "./components";
import { UserCardProps } from "./components/Cards/cards.types";
import DataContext from "./contexts/data.context";

function App() {
  const [user, setUser] = useState({} as UserCardProps);

  const { userCardInfoModalId } = useContext(DataContext);

  useEffect(() => {
    const fetchUser = async () => {
      const usersPromise = await fetch("http://localhost:3000/users");
      const users = await usersPromise.json();
      
      const selectedUser = users.find((user: UserCardProps) => user.cpf === Number(userCardInfoModalId));

      setUser(selectedUser);
    }

    fetchUser();
  }, [userCardInfoModalId]);
  return (
    <div className="app">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <Main />
        {userCardInfoModalId && user &&
         <UserInfoCard
          nome={user.nome}
          cpf={user.cpf}
          cidade={user.cidade}
          bairro={user.bairro}
          rua={user.rua}
          numero={user.numero}
          complemento={user.complemento}
          userPicture={user.userPicture}
        />
        }
      </div>
    </div>
  );
}

export default App;

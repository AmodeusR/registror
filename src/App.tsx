import { useContext, useEffect, useState } from "react";
import { Header, Sidebar, Main, GuestInfoCard } from "./components";
import { GuestCardProps } from "./components/Cards/cards.types";
import DataContext from "./contexts/data.context";

function App() {
  const [guest, setGuest] = useState({} as GuestCardProps);

  const { GuestCardInfoModalId } = useContext(DataContext);
  
  useEffect(() => {
    const fetchGuests = async () => {
      const guestsPromise = await fetch("http://localhost:3000/guests");
      const guests = await guestsPromise.json();
      
      const selectedGuest = guests.find((guest: GuestCardProps) => guest.cpf === Number(GuestCardInfoModalId));

      setGuest(selectedGuest);
    }

    fetchGuests();
  }, [GuestCardInfoModalId]);
  return (
    <div className="app">
      <Header />
      <div className="main-wrapper">
        <Sidebar />
        <Main />
        {GuestCardInfoModalId && guest &&
         <GuestInfoCard
          nome={guest.nome}
          cpf={guest.cpf}
          cidade={guest.cidade}
          bairro={guest.bairro}
          rua={guest.rua}
          numero={guest.numero}
          complemento={guest.complemento}
          guestPicture={guest.guestPicture}
        />
        }
      </div>
    </div>
  );
}

export default App;

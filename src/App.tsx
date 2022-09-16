import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Header, Sidebar, Main, GuestInfoCard } from "./components";
import { GuestCardProps } from "./components/Cards/cards.types";
import DataContext from "./contexts/data.context";
import { fetchFirestoreData, onAuthStateChangedListener } from "./utils/firebase";

function App() {
  const { setUser } = useContext(DataContext);
  const [guest, setGuest] = useState({} as GuestCardProps);
  const [ cookies ] = useCookies();
  const navigate = useNavigate();

  const { GuestCardInfoModalId, fetchedData, setFetchedData, selectedSidebarTab } = useContext(DataContext);
  
  useEffect(() => {
    
    if (!cookies.user) {
      navigate("/");
    } else {
      setUser(cookies.user);
    }    
  }, []);
  
  useEffect(() => {
    const setSelectedGuest = async () => {
      const selectedGuest = fetchedData["guests"].find((guest: GuestCardProps) => guest.cpf === GuestCardInfoModalId);
      
      if (!selectedGuest) return;

      setGuest(selectedGuest);
    }

    setSelectedGuest();
  }, [GuestCardInfoModalId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFirestoreData();

      return data;
    }

    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setUser(user);

      if (user) {
        const data = await fetchData();
        
        if (!data) return;
        setFetchedData(data);        
      }
    });

    return unsubscribe;
  }, []);

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

import { User } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Header, Sidebar, Main, GuestInfoCard, VisitorInfoCard } from "./components";
import { GuestCardProps, VisitorCardProps } from "./components/Cards/cards.types";
import DataContext from "./contexts/data.context";
import { fetchFirestoreData, onAuthStateChangedListener } from "./utils/firebase";

function App() {
  const { setUser } = useContext(DataContext);
  const [guest, setGuest] = useState({} as GuestCardProps);
  const [visitor, setVisitor] = useState({} as VisitorCardProps);
  const [ cookies ] = useCookies();
  const navigate = useNavigate();

  const { guestCardInfoModalId, visitorCardInfoModalId, fetchedData, setFetchedData } = useContext(DataContext);
  
  useEffect(() => {
    
    if (!cookies.user) {
      navigate("/");
    } else {
      setUser(cookies.user);
    }    
  }, []);
  
  useEffect(() => {
    const setSelectedGuest = () => {
      const selectedGuest = fetchedData["guests"].find((guest: GuestCardProps) => guest.cpf === guestCardInfoModalId);
      
      if (!selectedGuest) return;

      setGuest(selectedGuest);
    }

    setSelectedGuest();
  }, [guestCardInfoModalId]);

  useEffect(() => {
    const setSelectedVisitor = () => {
      const selectedVisitor = fetchedData["visiting"].find((visitor: VisitorCardProps) => visitor.cpf === visitorCardInfoModalId);

      if (!selectedVisitor) return;

      setVisitor(selectedVisitor);
    }

    setSelectedVisitor();
  }, [visitorCardInfoModalId]);

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
        {guestCardInfoModalId && guest &&
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
        {visitorCardInfoModalId && visitor &&
          <VisitorInfoCard
            guestPicture={visitor.guestPicture}
            nome={visitor.nome}
            cpf={visitor.cpf}
            cidade={visitor.cidade}
            bairro={visitor.bairro}
            rua={visitor.rua}
            numero={visitor.numero}
            complemento={visitor.complemento}
            entrada={visitor.entrada}
          />
        }
      </div>
    </div>
  );
}

export default App;

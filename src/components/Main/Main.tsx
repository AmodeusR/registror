import UserCard from "../Cards/UserCard";
import VisitorCard from "../Cards/VisitorCard";
import HistoryCard from "../Cards/HistoryCard";

import "./main.scss";
import { useContext } from "react";
import DataContext from "../../contexts/data.context";

const users = [{
  "userPicture": "https://robohash.org/quaesapientequo.jpg?size=250x250&set=set1",
  "nome": "Wilt Maxweell",
  "cpf": 43457976217,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Rockefeller",
  "numero": "7923"
}, {
  "userPicture": "https://robohash.org/magnamremvoluptas.jpg?size=250x250&set=set1",
  "nome": "Malissia Schouthede",
  "cpf": 58322125074,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Briar Crest",
  "numero": "83"
}, {
  "userPicture": "https://robohash.org/inetreprehenderit.jpg?size=250x250&set=set1",
  "nome": "Davie Verick",
  "cpf": 54856923707,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Ridge Oak",
  "numero": "0"
}, {
  "userPicture": "https://robohash.org/quiiuresequi.jpg?size=250x250&set=set1",
  "nome": "Dagny Prisk",
  "cpf": 71514785358,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Fordem",
  "numero": "5"
}, {
  "userPicture": "https://robohash.org/rerumrepellatad.jpg?size=250x250&set=set1",
  "nome": "Debi Blackley",
  "cpf": 69170343658,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Donald",
  "numero": "41772"
}, {
  "userPicture": "https://robohash.org/aliquamvoluptatemaut.jpg?size=250x250&set=set1",
  "nome": "Ricki Titcombe",
  "cpf": 59618994108,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Mifflin",
  "numero": "696"
}, {
  "userPicture": "https://robohash.org/voluptatemconsequunturlaudantium.jpg?size=250x250&set=set1",
  "nome": "Francois Franklen",
  "cpf": 84007267800,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Victoria",
  "numero": "59"
}, {
  "userPicture": "https://robohash.org/consequaturquiadoloribus.jpg?size=250x250&set=set1",
  "nome": "Martelle Geeve",
  "cpf": 74765159055,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Packers",
  "numero": "254"
}, {
  "userPicture": "https://robohash.org/cupiditatepossimusest.jpg?size=250x250&set=set1",
  "nome": "Fredelia Giacomoni",
  "cpf": 19424708181,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Moland",
  "numero": "7"
}, {
  "userPicture": "https://robohash.org/evenietperferendisprovident.jpg?size=250x250&set=set1",
  "nome": "Wesley Knoton",
  "cpf": 90527970852,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Forster",
  "numero": "8"
}, {
  "userPicture": "https://robohash.org/mollitiaetab.jpg?size=250x250&set=set1",
  "nome": "Currey Lyfe",
  "cpf": 23813930866,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Hauk",
  "numero": "03"
}, {
  "userPicture": "https://robohash.org/nihilaliquamveritatis.jpg?size=250x250&set=set1",
  "nome": "Terrence Fortun",
  "cpf": 83555259106,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Esker",
  "numero": "2458"
}, {
  "userPicture": "https://robohash.org/utquiavelit.jpg?size=250x250&set=set1",
  "nome": "Stearne McCarron",
  "cpf": 72052121520,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Browning",
  "numero": "3996"
}, {
  "userPicture": "https://robohash.org/etvelitvoluptas.jpg?size=250x250&set=set1",
  "nome": "Paxton Grieveson",
  "cpf": 79980275056,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Pleasure",
  "numero": "17"
}, {
  "userPicture": "https://robohash.org/ullamiddeserunt.jpg?size=250x250&set=set1",
  "nome": "Ambrosio Bridat",
  "cpf": 47259672093,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Butternut",
  "numero": "1582"
}, {
  "userPicture": "https://robohash.org/possimuscupiditateculpa.jpg?size=250x250&set=set1",
  "nome": "Harald Savidge",
  "cpf": 79745418814,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Onsgard",
  "numero": "20"
}, {
  "userPicture": "https://robohash.org/quosvoluptatemin.jpg?size=250x250&set=set1",
  "nome": "Gibb Rubega",
  "cpf": 82738437521,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Bultman",
  "numero": "54620"
}, {
  "userPicture": "https://robohash.org/adipisciquodolorum.jpg?size=250x250&set=set1",
  "nome": "Georgeanne Josh",
  "cpf": 43532710771,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Steensland",
  "numero": "955"
}, {
  "userPicture": "https://robohash.org/officiisfacilisest.jpg?size=250x250&set=set1",
  "nome": "Dennis Dryburgh",
  "cpf": 62432575881,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Ridgeway",
  "numero": "49672"
}, {
  "userPicture": "https://robohash.org/etvoluptatemnemo.jpg?size=250x250&set=set1",
  "nome": "Rees Bilborough",
  "cpf": 54003668768,
  "cidade": "Pescara",
  "bairro": "Abruzzi",
  "rua": "Havey",
  "numero": "9"
}];

const Main = () => {
  const { search } = useContext(DataContext);

  return (
    <main className="main-section">
      {users
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


import { useContext, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DataContext from "../../contexts/data.context";
import { userSignOut } from "../../utils/firebase";
import CreateGuest from "../CreateGuest/CreateGuest";
import "./header.scss";


const Header = () => {
  const input = useRef<HTMLInputElement>(null);
  const { isRegisterModalOpen, setIsRegisterModalOpen, search, setSearch, user } = useContext(DataContext);
  const [cookies, setCookie, removeCookie ] = useCookies(["user"]);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    removeCookie("user");
    await userSignOut();
    navigate("/");
  }
  
  const handleInputFocus = (e:KeyboardEvent) => {
    const isK = e.key === "k";

    if (isK && e.ctrlKey) {
      e.preventDefault();

      if (input.current === null) return;
      input.current.focus();
    }
  }

  const openModal = () => {
    setIsRegisterModalOpen(true);
  }
  
  useEffect(() => {
    document.addEventListener("keydown", handleInputFocus);

    return () => document.removeEventListener("keydown", handleInputFocus);
  }, []);

  return (
    <header className="header">
      <h1 className="header__title">Registro de Visitantes</h1>
      <div className="header__search">
        <label htmlFor="busca">Pesquisa</label>
        <input type="text" name="busca" id="busca" ref={input} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="header__actions">
        <div className="header__user-info">
          <span className="header__user-name">{user?.email}</span>
          <button onClick={handleSignOut} className="header__user-signout" type="button">Sair</button>
        </div>
        <button type="button" className="header__button" onClick={openModal}>Cadastrar usuário</button>
      </div>

      {isRegisterModalOpen &&
        <CreateGuest />
      }
    </header>
  );
};

export default Header;

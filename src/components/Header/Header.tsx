
import { useEffect, useRef } from "react";
import "./header.scss";


const Header = () => {
  const input = useRef<HTMLInputElement>(null);

  const handleInputFocus = (e:KeyboardEvent) => {
    const isK = e.key === "k";

    if (isK && e.ctrlKey) {
      e.preventDefault();

      if (input.current === null) return;
      input.current.focus();
    }
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
        <input type="text" name="busca" id="busca" ref={input} />
      </div>
      <button type="button" className="header__button">Cadastrar Visitante</button>
    </header>
  );
};

export default Header;

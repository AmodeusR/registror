
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header__title">Registro de Visitantes</h1>
      <div className="header__search">
        <label htmlFor="busca">Pesquisa</label>
        <input type="text" name="busca" id="busca" />
      </div>
      <button type="button" className="header__button">Cadastrar Visitante</button>
    </header>
  );
};

export default Header;

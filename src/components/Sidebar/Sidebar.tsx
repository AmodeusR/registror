import "./sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__options">
        <a href="#" className="sidebar__option">Cadastros</a>
        <a href="#" className="sidebar__option">Visitantes</a>
        <a href="#" className="sidebar__option">Registros</a>
      </div>
    </aside>
  );
};

export default Sidebar;

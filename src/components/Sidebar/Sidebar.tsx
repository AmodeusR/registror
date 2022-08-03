import { useContext } from "react";
import DataContext, { selectionOptions } from "../../contexts/data.context";

import "./sidebar.scss";

const Sidebar = () => {
  const { setSelected } = useContext(DataContext);

  const handleClick = (buttonClicked: selectionOptions, e: MouseEvent) => {
    setSelected(buttonClicked);
    
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__options">
        <button className="sidebar__option" onClick={(e) => handleClick("users", e)}>Cadastros</button>
        <button className="sidebar__option" onClick={(e) => handleClick("visitors", e)}>Visitantes</button>
        <button className="sidebar__option" onClick={(e) => handleClick("history", e)}>Histórico de visitas</button>
      </div>
    </aside>
  );
};

export default Sidebar;

import React, { useContext } from "react";
import DataContext, { selectionOptions } from "../../contexts/data.context";

import "./sidebar.scss";

const Sidebar = () => {
  const { setSelectedSidebarTab } = useContext(DataContext);

  const handleClick = (buttonClicked: selectionOptions, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedSidebarTab(buttonClicked);
    
    const typeAssertion = e.target as HTMLElement;
    const options = typeAssertion.parentElement?.children;
    
    if (!options) return;    
    const optionsArray = Array.from(options);
    
    optionsArray.map(option => option.classList.remove("sidebar__selected"));
    const buttonToAddClassName = optionsArray.find(option => option === e.target);
    buttonToAddClassName?.classList.add("sidebar__selected");
    
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__options">
        <button className="sidebar__option sidebar__selected" onClick={(e) => handleClick("users", e)}>Cadastros</button>
        <button className="sidebar__option" onClick={(e) => handleClick("visitors", e)}>Visitantes</button>
        <button className="sidebar__option" onClick={(e) => handleClick("history", e)}>Histórico de visitas</button>
      </div>
    </aside>
  );
};

export default Sidebar;

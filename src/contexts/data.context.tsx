import { createContext, ReactNode, useState } from "react";

interface ContextType {
  selected: null |"users" | "visitors" | "history";
  setSelected: (buttonClicked: selectionOptions) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  userCardInfoModalId: string;
  setUserCardInfoModalId: (isOpen: string) => void;
  search: string;
  setSearch: (searchTerm: string) => void;
}

const DataContext = createContext({} as ContextType);


interface DataProvider {
  children: ReactNode;
}

export type selectionOptions = null |"users" | "visitors" | "history";

export const DataProvider = ({ children }: DataProvider) => {
  const [selected, setSelected] = useState<selectionOptions>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [userCardInfoModalId, setUserCardInfoModalId] = useState("");
  const [search, setSearch] = useState("");

  return (
    <DataContext.Provider value={{
      selected,
      setSelected,
      isRegisterModalOpen,
      setIsRegisterModalOpen,
      search,
      setSearch,
      userCardInfoModalId,
      setUserCardInfoModalId
      
    }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
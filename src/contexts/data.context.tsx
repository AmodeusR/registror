import { createContext, ReactNode, useState } from "react";

interface ContextType {
  selected: null |"users" | "visitors" | "history";
  setSelected: (buttonClicked: selectionOptions) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <DataContext.Provider value={{
      selected,
      setSelected,
      isModalOpen,
      setIsModalOpen,
      search,
      setSearch
    }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
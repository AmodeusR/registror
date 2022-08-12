import { createContext, ReactNode, useState } from "react";

interface ContextType {
  selectedSidebarTab: null |"users" | "visitors" | "history";
  setSelectedSidebarTab: (buttonClicked: selectionOptions) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  userCardInfoModalId: string;
  setUserCardInfoModalId: (isOpen: string) => void;
  search: string;
  setSearch: (searchTerm: string) => void;
  isImageModalOpen: boolean;
  setIsImageModalOpen: (isModalOpen: boolean) => void;
}

const DataContext = createContext({} as ContextType);


interface DataProvider {
  children: ReactNode;
}

export type selectionOptions = null |"users" | "visitors" | "history";

export const DataProvider = ({ children }: DataProvider) => {
  const [selectedSidebarTab, setSelectedSidebarTab] = useState<selectionOptions>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [userCardInfoModalId, setUserCardInfoModalId] = useState("");
  const [search, setSearch] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <DataContext.Provider value={{
      selectedSidebarTab,
      setSelectedSidebarTab,
      isRegisterModalOpen,
      setIsRegisterModalOpen,
      search,
      setSearch,
      userCardInfoModalId,
      setUserCardInfoModalId,
      isImageModalOpen,
      setIsImageModalOpen
    }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
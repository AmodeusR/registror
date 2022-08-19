import { createContext, ReactNode, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";

interface ContextType {
  selectedSidebarTab: null |"guests" | "visiting" | "history";
  setSelectedSidebarTab: (buttonClicked: selectionOptions) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  GuestCardInfoModalId: string;
  setGuestCardInfoModalId: (isOpen: string) => void;
  search: string;
  setSearch: (searchTerm: string) => void;
  isImageModalOpen: boolean;
  setIsImageModalOpen: (isModalOpen: boolean) => void;
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
}

const DataContext = createContext({} as ContextType);


interface DataProvider {
  children: ReactNode;
}

export type selectionOptions = null |"guests" | "visiting" | "history";

export const DataProvider = ({ children }: DataProvider) => {
  const [selectedSidebarTab, setSelectedSidebarTab] = useState<selectionOptions>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [GuestCardInfoModalId, setGuestCardInfoModalId] = useState("");
  const [search, setSearch] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  return (
    <DataContext.Provider value={{
      selectedSidebarTab,
      setSelectedSidebarTab,
      isRegisterModalOpen,
      setIsRegisterModalOpen,
      search,
      setSearch,
      GuestCardInfoModalId,
      setGuestCardInfoModalId,
      isImageModalOpen,
      setIsImageModalOpen,
      user,
      setUser
    }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
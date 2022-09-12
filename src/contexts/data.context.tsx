import { createContext, ReactNode, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { GuestCardProps } from "../components/Cards/cards.types";

interface ContextType {
  selectedSidebarTab: null |"guests" | "visiting" | "history";
  setSelectedSidebarTab: (buttonClicked: selectionOptions) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  GuestCardInfoModalId: number | null;
  setGuestCardInfoModalId: (isOpen: number | null) => void;
  search: string;
  setSearch: (searchTerm: string) => void;
  isImageModalOpen: boolean;
  setIsImageModalOpen: (isModalOpen: boolean) => void;
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  fetchedGuests: GuestCardProps[];
  setFetchedGuests: (guests: GuestCardProps[]) => void;
}

const DataContext = createContext({} as ContextType);


interface DataProvider {
  children: ReactNode;
}

export type selectionOptions = null |"guests" | "visiting" | "history";

export const DataProvider = ({ children }: DataProvider) => {
  const [selectedSidebarTab, setSelectedSidebarTab] = useState<selectionOptions>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [GuestCardInfoModalId, setGuestCardInfoModalId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [fetchedGuests, setFetchedGuests] = useState<GuestCardProps[]>([]);


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
      setUser,
      fetchedGuests,
      setFetchedGuests
    }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
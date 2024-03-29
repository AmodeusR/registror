import { createContext, ReactNode, useState } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { GuestCardProps, VisitorCardProps, HistoryCardProps } from "../components/Cards/cards.types";
import { DocumentData, Firestore } from "firebase/firestore";

interface FirestoreData {
  guests: GuestCardProps[];
  visiting: VisitorCardProps[];
  history: HistoryCardProps[];
}

interface ContextType {
  selectedSidebarTab: "guests" | "visiting" | "history";
  setSelectedSidebarTab: (buttonClicked: selectionOptions) => void;
  isRegisterModalOpen: boolean;
  setIsRegisterModalOpen: (isOpen: boolean) => void;
  guestCardInfoModalId: number | null;
  setGuestCardInfoModalId: (isOpen: number | null) => void;
  visitorCardInfoModalId: number | null;
  setVisitorCardInfoModalId: (isOpen: number | null) => void;
  historyCardInfoModalId: string | null;
  setHistoryCardInfoModalId: (isOpen: string | null) => void;
  search: string;
  setSearch: (searchTerm: string) => void;
  isImageModalOpen: boolean;
  setIsImageModalOpen: (isModalOpen: boolean) => void;
  user: FirebaseUser | null;
  setUser: (user: FirebaseUser | null) => void;
  fetchedData: FirestoreData;
  setFetchedData: (fetchedData: FirestoreData) => void;
  fetchedApartments: ApartmentOption[];
  setFetchedApartments: (apartments: ApartmentOption[]) => void;
}

const DataContext = createContext({} as ContextType);

export interface ApartmentOption {
  readonly label: number;
  readonly value: number;
}

interface DataProvider {
  children: ReactNode;
}

export type selectionOptions = "guests" | "visiting" | "history";

export const DataProvider = ({ children }: DataProvider) => {
  const [selectedSidebarTab, setSelectedSidebarTab] = useState<selectionOptions>("guests");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [guestCardInfoModalId, setGuestCardInfoModalId] = useState<number | null>(null);
  const [visitorCardInfoModalId, setVisitorCardInfoModalId] = useState<number | null>(null);
  const [historyCardInfoModalId, setHistoryCardInfoModalId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [fetchedData, setFetchedData] = useState<FirestoreData>({guests: [], visiting: [], history: []} as FirestoreData);
  const [fetchedApartments, setFetchedApartments] = useState<ApartmentOption[]>([]);


  return (
    <DataContext.Provider value={{
      selectedSidebarTab,
      setSelectedSidebarTab,
      isRegisterModalOpen,
      setIsRegisterModalOpen,
      search,
      setSearch,
      guestCardInfoModalId,
      setGuestCardInfoModalId,
      visitorCardInfoModalId,
      setVisitorCardInfoModalId,
      historyCardInfoModalId,
      setHistoryCardInfoModalId,
      isImageModalOpen,
      setIsImageModalOpen,
      user,
      setUser,
      fetchedData,
      setFetchedData,
      fetchedApartments,
      setFetchedApartments
    }}>
      { children }
    </DataContext.Provider>
  );
};

export default DataContext;
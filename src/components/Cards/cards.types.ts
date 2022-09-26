import { Timestamp } from "firebase/firestore";

export interface GuestCardProps {
  guestPicture: string | null;
  nome: string;
  cpf: number;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
}

export interface VisitorCardProps extends GuestCardProps {
  entrada: Timestamp
}

export interface HistoryCardProps extends GuestCardProps {
  id?: string;
  entrada: Timestamp;
  saida: Timestamp;
}
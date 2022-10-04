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
  entrada: Timestamp;
  visitando: number;
  visitado: string;
  tipoDaVisita: string;
}

export interface HistoryCardProps extends VisitorCardProps {
  id?: string;
  saida: Timestamp;
}
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

export interface VisitorCardProps {
  guestPicture: string | null;
  nome: string;
  cpf: number;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  entrada: Date
}

export interface HistoryCardProps {
  guestPicture: string | null;
  nome: string;
  cpf: number;
  cidade?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  entrada: Date;
  saida: Date;
  
}
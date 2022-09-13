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
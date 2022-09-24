export const formatAddress = ({ cidade, rua, numero }: AddressInfoType) => {
  if (cidade && rua && numero) {
    return `${cidade} – ${rua}, ${numero}`;
  } else if (cidade && rua) {
    return `${cidade} – ${rua}`
  } else if (cidade) {
    return `${cidade}`;
  } else {
    return "Não informado";
  }
}

interface AddressInfoType {
  cidade: String | undefined;
  rua: String | undefined;
  numero: String | undefined;
}
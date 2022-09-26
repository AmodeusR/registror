import { formatRelative, format } from "date-fns";
import { pt } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";


export const formatDateRelative = (date: Timestamp) => {
  if (!date) return "Falha na exibição de data";

  const jsDate = date.toDate();
  const formattedDate = formatRelative(jsDate, new Date(), { locale: pt });
  
  return formattedDate;
}

export const formatDate = (date: Timestamp) => {
  if (!date) return "Falha na exibição de data";
  
  const jsDate = date.toDate();  
  const formattedDate = format(jsDate, "EEEE',' d 'de' MMMM 'às' H':'mm", { locale: pt });

  return formattedDate;  
}
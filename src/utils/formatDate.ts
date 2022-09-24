import { formatRelative, format } from "date-fns";
import { pt } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";


export const formatDateRelative = (date: Timestamp) => {
  const formattedDate = formatRelative(date.toDate(), new Date(), { locale: pt });
  
  return formattedDate;
}

export const formatDate = (date: Timestamp) => {
  const formattedDate = format(new Date(), "EEEE',' d 'de' MMMM 'às' H':'m", { locale: pt });

  return formattedDate;  
}
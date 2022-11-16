import { DocumentData } from "firebase/firestore";

type CurrentArrayProps = {
  data: object[];
}

export const normalizeData = (dataToNormalize: DocumentData): DocumentData => {

  const normalizedData = dataToNormalize.reduce((acc: object[], currentArray: CurrentArrayProps) => {
    
    return [...acc, ...currentArray.data]  
  }, []);

  return normalizedData;
}
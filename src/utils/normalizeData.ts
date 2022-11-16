import { DocumentData, QuerySnapshot } from "firebase/firestore";

type NormalizeDataReturn = {
  normalizedData: DocumentData;
  mappedDocs?: DocumentData[] | null;
}

export const normalizeData = (collectionSnapshot: QuerySnapshot<DocumentData>, getMappedDocs = false): DocumentData | NormalizeDataReturn => {
  const dataToNormalize = collectionSnapshot.docs.map(coll => coll.data());

  const normalizedData = dataToNormalize.reduce((acc: object[], currentArray) => {
    
    return [...acc, ...currentArray.data];
  }, []);
  
  
  if (getMappedDocs) {
    const mappedDocs = getMappedDocs ? dataToNormalize : null;
    return {
      normalizedData,
      mappedDocs
    };
  }

  return normalizedData;
  
}
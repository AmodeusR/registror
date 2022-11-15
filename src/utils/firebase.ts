import { GuestCardProps, VisitorCardProps } from "./../components/Cards/cards.types";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  NextOrObserver,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
  collection,
  getDocs,
  DocumentData
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyAdOdJBtVMM0VHzpIyDuYIuV_9h6GgJDe0",
  authDomain: "registrador-de-visitas.firebaseapp.com",
  projectId: "registrador-de-visitas",
  storageBucket: "registrador-de-visitas.appspot.com",
  messagingSenderId: "460062881217",
  appId: "1:460062881217:web:615c31b48aecbef232ab40",
};


// User Functions

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();

export const userRegistration = async ({ email, senha }: UserDataProps) => {
  if (!email || !senha) return;

  return await createUserWithEmailAndPassword(auth, email, senha);
};

export const userLogin = async ({ email, senha }: UserDataProps) => {
  return await signInWithEmailAndPassword(auth, email, senha);
};

export const userSignOut = async () => {
  return signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore Functions

const db = getFirestore();

export const uploadContent = async (collectionKey: string, userKey: string, data: object) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  const docRef = doc(collectionRef, userKey);
  batch.set(docRef, data);

  await batch.commit();

  console.log("Finalizado");  
}


export const createUserDocument = async (user: User) => {
  const docsToCreate = ["guests", "visiting", "history"];
  docsToCreate.forEach(async (docToCreate) => {
    const docRef = doc(db, "users", user.uid, "data", docToCreate);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      try {
        await setDoc(docRef, {
          excerpt1: []
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

  // Legado

  // const userDocRef = doc(db, "users", user.uid);

  // const dataSnapshot = await getDoc(userDocRef);

  // if (!dataSnapshot.exists()) {
  //   try {
  //     await setDoc(userDocRef, {
  //       guests: [],
  //       visiting: [],
  //       history: [],
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
};

export const fetchFirestoreData = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];

  const userDocRef = doc(db, "users", currentUser.uid);
  const dataSnapshot = await getDoc(userDocRef);
  const data = dataSnapshot.data();  

  const docsToCreate = ["guests", "visiting", "history"];

  const newData = await docsToCreate.reduce(async (acc, docToCreate) => {
    const docRef = doc(db, "users", currentUser.uid, "data", docToCreate);
    const docSnapshot = await getDoc(docRef);
    const docData = docSnapshot.data();

    if (!docSnapshot.exists()) {
      const finalData = data ? data[docToCreate] : [];
      try {
        await setDoc(docRef, {
          excerpt1: finalData
        });

        console.log("feito!")
      } catch (error) {
        console.log(error);
      }
    }
    
    if (docData !== undefined) {
      const docKeys = docData && Object.keys(docData);
      const result = docKeys?.reduce((acc, docKey) => {
        
        return [...acc, ...docData[docKey]];
      }, [] as object[]);

      const cumulativeData = await acc;
      
      return {...cumulativeData, [docToCreate]: result};
    }

    return acc;
  }, {});

  console.log(newData);
  
  
  return Object(data);
};

export const fetchFirestoreApartments = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];

  const apartmentDocRef = doc(db, "apartments", currentUser.uid);
  const dataSnapshot = await getDoc(apartmentDocRef);
  const data = dataSnapshot.data();  
  
  return data?.apartments;
}


export const createNewGuest = async (newGuest: GuestCardProps) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);

  const dataSnapshot = await getDoc(userDocRef);
  const data = dataSnapshot.data();
  const guestsCPF = data?.guests.map((guest: GuestCardProps) => guest.cpf);
  const isCPFRegistered = guestsCPF.some(
    (guestCPF: number) => guestCPF === newGuest.cpf
  );

  if (isCPFRegistered) {
    return "Este CPF já está registrado";
  }
  
  try {
    await updateDoc(userDocRef, {
      guests: arrayUnion(newGuest)
    });
  } catch (error) {
    console.log(error);
  }

  return null;
};

export const registerVisit = async (visitorToRegister: VisitorCardProps) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);
  const dataSnapshot = await getDoc(userDocRef);
  const visiting = dataSnapshot.data()?.visiting;
  const isVisitorAlreadyVisiting = visiting.some((visitor: VisitorCardProps) => visitor.cpf === visitorToRegister.cpf);  
  
  if (isVisitorAlreadyVisiting) {
    alert("Esta pessoa já tem sua visita sendo registrada no momento!");
    throw new Error("Visita já registrada");
  }

  try {
    await updateDoc(userDocRef, {
      visiting: arrayUnion(visitorToRegister)
    });
  } catch (error) {
    console.log(error);
  }
}

export const finishVisit = async (visitor: VisitorCardProps) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);

  const historyVisitor = {...visitor, saida: new Date(), id: v4()};

  try {
    await updateDoc(userDocRef, {
      visiting: arrayRemove(visitor)
    })

    await updateDoc(userDocRef, {
      history: arrayUnion(historyVisitor)
    })
  } catch (error) {
    console.log(error);    
  }

}

export const updateGuestPicture = async (guestToUpdate: GuestCardProps) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);

  const dataSnapshot = await getDoc(userDocRef);
  const data = dataSnapshot.data();
  const guests = data?.guests.filter((guest: GuestCardProps) => guest.cpf !== guestToUpdate.cpf);
    
  try {
    await updateDoc(userDocRef, {
      guests: [...guests, guestToUpdate]
    });
  } catch (error) {
    console.log(error);
  }
}

export const removeGuest = async (guestToRemove: GuestCardProps) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);

  try {
    await updateDoc(userDocRef, {
      guests: arrayRemove(guestToRemove)
    });
  } catch (error) {
    console.log(error);
  }
}

// Storage Functions

  export const uploadUserPicture = ({img, userID}: UploadDataProps) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const userPictureRef = ref(storage, `userPictures/${currentUser.uid}/${userID}`);

    try {
      const imgLink = uploadBytes(userPictureRef, img)
        .then(snapshot => snapshot.ref)
        .then(snapshotRef => getDownloadURL(snapshotRef));

        return imgLink;
    } catch (error) {
      console.log(error);
    }

  }

// Types

interface UserDataProps {
  email: string;
  senha: string;
}

interface UploadDataProps {
  img: Blob;
  userID: number;
}

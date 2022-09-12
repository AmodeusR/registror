import { GuestCardProps } from "./../components/Cards/cards.types";
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
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

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

  return onAuthStateChanged(auth, callback)
}


// Firestore Functions

const db = getFirestore();

export const createUserDocument = async (user: User) => {
  const userDocRef = doc(db, "users", user.uid);

  const dataSnapshot = await getDoc(userDocRef);

  if (!dataSnapshot.exists()) {
    try {
      await setDoc(userDocRef, {
        guests: [],
        visiting: [],
        history: []
      });
    } catch (error) {
      console.log(error);
    }
  }  
}

export const fetchFirestoreData = async (user: User | null) => {    
  if(!user) return [];

  const userDocRef = doc(db, "users", user.uid);
  const dataSnapshot = await getDoc(userDocRef);
  const data = dataSnapshot.data();  
  
  return data;
}

export const createNewGuest = async (newGuest: GuestCardProps) => {  
  if (!auth.currentUser) return;

  const userDocRef = doc(db, "users", auth.currentUser.uid);

  const dataSnapshot = await getDoc(userDocRef);
  const data = dataSnapshot.data()
  const guestsCPF = data?.guests.map((guest: GuestCardProps) => guest.cpf);
  
  const isCPFRegistered = guestsCPF.some((guestCPF: number) => guestCPF === newGuest.cpf);

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
}

// Types

interface UserDataProps {
  email: string;
  senha: string;
}

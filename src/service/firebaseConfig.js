import { initializeApp } from "firebase/app";
import {getFirestore,collection,addDoc,getDocs,query,where} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getClients(){
    const clients=[];
    const docsRef = collection(db,"clients");
    const response = await getDocs(docsRef)
    response.forEach(doc=>{
        clients.push(doc.data());
    })
    return clients;
}

export async function existsClient(id) {
  console.log(id)
  const clients = [];
  const q = query(collection(db, "clients"), where("id", "==", id));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    clients.push(doc.data());
  });
  console.log(clients)
  return clients.length > 0 ? true : false;
}

export async function addClient(client){
  const docsRef = collection(db, "clients");
    const res = await addDoc(docsRef, client);
    return res;
}
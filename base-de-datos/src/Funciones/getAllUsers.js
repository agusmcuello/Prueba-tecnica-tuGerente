import firebaseApp from "../Firebase/firebase";
import {getFirestore, collection, getDocs} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

export default async function getAllUsers(){
    const usuarios= []
    const collectionRef= collection(firestore,"usuarios")
    const snapshots = await getDocs(collectionRef);
    snapshots.forEach(doc=>{
        usuarios.push(doc.data())
    })
    return usuarios;
}
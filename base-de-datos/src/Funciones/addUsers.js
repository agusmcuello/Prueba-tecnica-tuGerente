import firebaseApp from "../Firebase/firebase";
import {getFirestore, collection, doc, setDoc} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

function addUser(infoUser){
    const collectionRef = collection(firestore, "usuarios");
    const docRef = doc(collectionRef, infoUser.codigo);
    setDoc(docRef, infoUser);
}

export default addUser;
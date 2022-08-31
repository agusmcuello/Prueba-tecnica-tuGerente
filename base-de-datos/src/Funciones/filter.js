import firebaseApp from "../Firebase/firebase";
import {getFirestore, collection, query, where, getDocs} from 'firebase/firestore';

const firestore = getFirestore(firebaseApp);

async function filter(stringBusqueda){
    const usuariosFiltrados =[]
    const collectionRef= collection(firestore, "usuarios");
    const queryNombre = query(collectionRef,where("nombre", "==", stringBusqueda));
    const queryRazon = query(collectionRef,where("razon", "==", stringBusqueda));
    const queryNit = query(collectionRef,where("nit", "==", stringBusqueda));
    const queryTelefono = query(collectionRef,where("telefono", "==", stringBusqueda));
    const queryCodigo = query(collectionRef,where("codigo", "==", stringBusqueda));

    const arraySnapshots= await Promise.all([
        getDocs(queryNombre),
        getDocs(queryRazon),
        getDocs(queryNit),
        getDocs(queryTelefono),
        getDocs(queryCodigo),
    ]);

    arraySnapshots.forEach((snapshot)=>{
        snapshot.forEach((doc)=>{
            usuariosFiltrados.push(doc.data())
        })
    })
    return usuariosFiltrados;
}

export default filter;


// you will find 2 imports already there, add the configuration and instantiate the app and database:
import app from "./firebaseConfig.js";
import { getDatabase, ref, get, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth"; 
const db= getDatabase(app);
const rf= ref(db, PATH+"/"+model.user.uid);
const PATH="LeafSwap";

function modelToPersistence(model) {
    return {}
}

function persistenceToModel(data, model) {

}

function readFromFirebase(model) {
    model.ready = false;
    if(model.user) {
        get(rf).then(readyACB).then(e=>model.ready = true);
        function readyACB(snap) {return persistenceToModel(snap.val(), model)}
    }
}

function saveToFirebase(model) {
    if(model.ready) {
        set(rf, modelToPersistence(model));
    }
}

function connectToFirebase(model, watchFunction) {
    readFromFirebase(model);
    function modelChangeWatchACB() {
        return [];
    }
    function sideEffectACB(data) {
        saveToFirebase(model);
    }
    watchFunction(modelChangeWatchACB, sideEffectACB);
}

export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase};
export default connectToFirebase;
import { getDatabase, ref, update, onValue} from "firebase/database";
import {app} from './firebaseConfig';


export function PersistModel(model) {
    if (!model.user) return;
    const db = getDatabase(app); 
    const userRef = ref(db, 'users/' + model.user.uid);
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            model.setBooks(data.books || []);
            model.collections = data.collections || {};
            model.notifyObservers();
        }
    }, {
        onlyOnce: true 
    });
}

export function PersistUpdate(model) {
    if(!model.user) return;
    const db = getDatabase(app); 
    update(ref(db, 'users/'+ model.user.uid), {
      books: model.books,
      collections: model.collections
  })
  .then(()=>{
    return;
  })
  .catch((error)=>{
    console.error(error); 
  });
  }

  export function fetchUserProfile(uid, setProfileData) {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${uid}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfileData(data);
      }
    });
  }
  
  export function updateProfileData(uid, userData) {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${uid}`);
    return update(userRef, userData);
  }

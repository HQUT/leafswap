import { BookSource } from "./bookSource";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { PersistUpdate, PersistModel,updateProfileData, fetchUserProfile} from "../firebaseModel";
import { app } from "../firebaseConfig";

export class Model {
    constructor(user = null, books = [], id = null) {
        this.observers = [];
        this.collections = { "Quick Add": [] , ...this.collections };
        this.setCurrentBook(id);
        this.books = books;
        this.setUser(user);
        this.profileData = {
         name: '',
         avatar: '',
         email: '', 
         phone: '',
         occupation: 'Web Designer',
     };
        this.savedState();
    }

   savedState() {
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence).then(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.setUser(user);
                    fetchUserProfile(user.uid, this.setProfileData.bind(this));
                    PersistModel(this);
                    
                } else {
                    this.setUser(null);
                }
            });
        }).catch((error) => {
            console.error(error.code);
        });
    }

    setBooks(books) {
        this.books = [...books];
        PersistUpdate(this)
        this.notifyObservers();
    }

    setProfileData(data) {
      this.profileData = data;
      this.notifyObservers();
  }
    
    saveUserProfile(profileData) {
      const auth = getAuth(app);
      if (auth.currentUser) {
        updateProfileData(auth.currentUser.uid, profileData).then(() => {
          console.log('Profil uppdaterad i Firebase');
        }).catch((error) => {
          console.error('Ett fel inträffade vid uppdatering av profil i Firebase', error);
        });
      }
    }


    setUser(user) {
      if (this.user !== user) {
          this.user = user;
          if (user) {
              PersistModel(this);
          }
          this.notifyObservers();
      }
  }


   setCurrentBook(id) {
      if (this.currentBook === id) return;
      if (!id) 
         id = localStorage.getItem("currentBook")
      localStorage.setItem("currentBook", id)
      
      this.currentBook = id;
      this.currentBookDetails = null;
      this.currentBookError = null;
      this.notifyObservers();
      if (this.currentBook) {
         BookSource.getBookDetails(id)
            .then(response => {
               if (this.currentBook === id) { 
                  this.currentBookDetails = response;
                  this.notifyObservers();
               }
            })
            .catch(error => {
               if (this.currentBook === id) {
                  this.currentBookError = error;
                  this.notifyObservers();
               }
            });
      }
   }

   createCollection(collectionName) {
      if (!this.collections[collectionName]) {
        this.collections[collectionName] = [];
        PersistUpdate(this);
        this.notifyObservers();
      } else {
        throw new Error(`Collection "${collectionName}" already exists!`);
      }
   }



 addToCollection(bok, collectionName) {
   this.collections[collectionName] = this.collections[collectionName] || [];
   let find_book = this.collections[collectionName].find(d => d.id === bok.id);
   
   if (!find_book) {
     this.collections[collectionName].push(bok);
     PersistUpdate(this)
     this.notifyObservers();
   } else {
     throw new Error(`This book is already in the list!`);
   }
 }
 
 

    removeFromCollection(bookId) {
      for (const collectionName in this.collections) {
        this.collections[collectionName] = this.collections[collectionName].filter(book => book.id !== bookId);
      }
      PersistUpdate(this)
      this.notifyObservers();

      return this.collections;
    }

    
    
   
    deleteCollection(collectionName) {
      if (this.collections[collectionName]) {
        delete this.collections[collectionName];
        PersistUpdate(this)
        this.notifyObservers();
      } else {
        throw new Error(`Collection not found!`);
      }
    }
  
   addObserver(callback) {
      this.observers = [callback, ...this.observers]
   }

   removeObserver(callback) {
      this.observers = this.observers.filter(observer => observer !== callback)
   }

   notifyObservers() {
      this.observers.forEach(cb => { 
         try { 
            cb();
         } catch(error) { 
            console.error(error); 
         }
      });
   }

   doSearch(searchCriteria) {
    BookSource.searchBookByCategory(searchCriteria)
      .then(books => {
        this.setBooks(books); 
      })
      .catch(error => {
        console.error("Search error:", error);
     
      });
  }
}

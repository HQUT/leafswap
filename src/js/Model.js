import { BookSource } from "./bookSource";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { PersistUpdate, PersistModel } from "../firebaseModel";


export class Model {
    constructor(user = null, books = [], id = null, observers = []) {
        this.observers = [];
        this.collections = this.collections || {};
        this.collections["Quick Add"] = this.collections["Quick Add"] || [];
        this.setCurrentBook(id);
        this.books = books;
        this.setUser(user);
        this.savedState();
    }

   savedState() {
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence).then(() => {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.setUser(user);
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
        throw new Error(`Collection already exists!`);
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
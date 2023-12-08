import { BookSource } from "./bookSource";

class Model {
  constructor(user = null, books = [], currentBook = null, observers = []) {
    this.user = user;
    this.books = books;
    this.currentBook = currentBook;
    this.currentBookDetails = null;
    this.currentBookError = null;
    this.observers = observers;

    this.loadBooksFromLocalStorage();
    this.setCurrentBook(currentBook);
  }

  updateUserProfile({ name, email, phone, avatar, occupation }) {
    if (this.user) {
      this.user.name = name;
      this.user.email = email;
      this.user.phone = phone;
      this.user.avatar = avatar;
      this.user.occupation = occupation;
      
      this.saveUserProfileToFirebase(); 
      this.notifyObservers();
    }
  }

  loadBooksFromLocalStorage() {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      this.books = JSON.parse(savedBooks);
    }
  }

  saveBooksToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  setUser(user) {
    if (this.user !== user) {
      this.user = user;
      this.notifyObservers();
    }
  }

  setBooks(books) {
    this.books = [...books];
    this.saveBooksToLocalStorage();
    this.notifyObservers();
  }

  setCurrentBook(id) {
    if (this.currentBook === id) return;

    this.currentBook = id;
    localStorage.setItem("currentBook", id);

    this.currentBookDetails = null;
    this.currentBookError = null;
    this.notifyObservers();

    if (this.currentBook) {
      this.fetchBookDetails(this.currentBook);
    }
  }

  async fetchBookDetails(id) {
    try {
      const bookDetails = await BookSource.getBookDetails(id);
      this.currentBookDetails = bookDetails;
      this.notifyObservers();
    } catch (error) {
      console.error("Error fetching book details:", error);
      this.currentBookError = error;
      this.notifyObservers();
    }
  }

  addToList(book) {
    if (this.bookExists(book.id)) {
      throw new Error(`This book is already in the list!`);
    }
    this.books = [book, ...this.books];
    this.saveBooksToLocalStorage();
    this.notifyObservers();
  }

  removeFromList(id) {
    if (!this.bookExists(id)) {
      throw new Error("The book is not in the list!");
    }
    this.books = this.books.filter((book) => book.id !== id);
    this.saveBooksToLocalStorage();
    this.notifyObservers();
  }

  bookExists(id) {
    return this.books.some((book) => book.id === id);
  }

  getBookById(id) {
    return this.books.find((book) => book.id === id);
  }

  getCurrentBookDetails() {
    return this.currentBookDetails;
  }

  addObserver(callback) {
    if (!this.observers.includes(callback)) {
      this.observers.push(callback);
    }
  }

  removeObserver(callback) {
    this.observers = this.observers.filter((observer) => observer !== callback);
  }

  notifyObservers() {
    this.observers.forEach((callback) => {
      try {
        callback();
      } catch (error) {
        console.error("Error notifying observers:", error);
      }
    });
  }
}

export default Model;

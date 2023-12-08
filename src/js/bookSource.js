import { API_KEY } from "./apiConfig";

const BASE_URL = "https://www.googleapis.com/books/v1";

const BookSource = {
  apiCall(endpoint) {
    const url = `${BASE_URL}/${endpoint}&key=${API_KEY}`;
    return fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Network response not ok: ${response.status} - ${response.statusText}`);
      })
      .catch(error => {
        console.error('Error during API call:', error);
        throw error;
      });
  },

  searchBooksByName(bookName) {
    if (!bookName) {
      throw new Error('Book name is required for the search');
    }
    const formattedBookName = encodeURIComponent(bookName);
    return this.apiCall(`volumes?q=${formattedBookName}`);
  },

  searchBookByCategory(category, params = '') {
    if (!category) {
      throw new Error('Category is required for the search');
    }
    const formattedCategory = encodeURIComponent(category);
    const formattedParams = params ? `&${params}` : '';
    return this.apiCall(`volumes?q=subject:${formattedCategory}${formattedParams}`);
  },

  getBookDetails(id) {
    if (!id) {
      throw new Error('Book ID is required to fetch details');
    }
    return this.apiCall(`volumes/${id}`);
  }
};

export { BookSource };

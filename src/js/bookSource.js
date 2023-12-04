import { API_KEY } from "./apiConfig";

async function apiCall(endpoint) {
    const url = `https://www.googleapis.com/books/v1/${endpoint}&key=${API_KEY}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network response not ok: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error during API call:', error);
        throw error;
    }
}

async function searchBooksByName(bookName) {
    if (!bookName) {
        throw new Error('Book name is required for the search');
    }
    const formattedBookName = encodeURIComponent(bookName);
    return apiCall(`volumes?q=${formattedBookName}`);
}

async function searchBookByCategory(category, params = '') {
    if (!category) {
        throw new Error('Category is required for the search');
    }
    const formattedCategory = encodeURIComponent(category);
    const formattedParams = params ? `&${params}` : '';
    return apiCall(`volumes?q=subject:${formattedCategory}${formattedParams}`);
}

async function getBookDetails(id) {
    if (!id) {
        throw new Error('Book ID is required to fetch details');
    }
    return apiCall(`volumes/${id}`);
}

async function fetchBookDetails(id) {
   try {
       const bookDetails = await getBookDetails(id);
       this.currentBookDetails = bookDetails;
       this.notifyObservers();
   } catch (error) {
       console.error('Error fetching book details:', error);
       this.currentBookError = error;
       this.notifyObservers();
   }
}

export { fetchBookDetails, searchBooksByName, searchBookByCategory, getBookDetails };

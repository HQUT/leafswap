import { API_KEY , BASE_URL} from "./apiConfig";


const info = new URLSearchParams({
  key: API_KEY 
}).toString();

const BookSource = {
  apiCall(endpoint) {
    const url = `${BASE_URL}/${endpoint}&${info}`; 
    console.log("API Request URL:", url); 
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
  
  
  searchBook(params) {
    const formattedParams = encodeURIComponent(params);
    return this.apiCall(`volumes?q=${formattedParams}`);
  },

  searchBookByCategory(category, params = '') {
    if (!category) {
      throw new Error('Category is required for the search');
    }
    const formattedCategory = encodeURIComponent(category);
    const formattedParams = params ? encodeURIComponent(params) : '';
    return this.apiCall(`volumes?q=subject:${formattedCategory}${formattedParams ? `+${formattedParams}` : ''}`);
  },

  searchBookByName(bookName) {
    if (!bookName) {
      throw new Error('Book name is required for the search');
    }
    const formattedBookName = encodeURIComponent(bookName);
    return this.apiCall(`volumes?q=intitle:${formattedBookName}`);
  },

  getBookDetails(id) {
    const url = `${BASE_URL}/volumes/${id}?${info}`;
    console.log(`API Request URL (GET):`, url);
    
    return fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(
          `Network response not ok: ${response.status} - ${response.statusText}`
        );
      })
      .catch((error) => {
        console.error('Error during API call:', error);
        throw error;
      });
  }
};

export { BookSource };

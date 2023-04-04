import axios from "axios";

export class PixabayAPI {
  #API_KEY = '35007429-bea2608a7749c34e123210dde'
  #BASE_URL = 'https://pixabay.com/api/';

  query = null;
  page = 1;
  count = 40; 

  baseSearchParams = {
    per_page: this.count,
    key: this.#API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true'
  };

//  fetchPhotos() {
//     const searchParams = new URLSearchParams({
//       q: this.query,
//       page: this.page,
//       ...this.baseSearchParams,
//     });
   
//     return fetch(`${this.#BASE_URL}?${searchParams}`).then(
//       res => {
//         if (!res.ok) {
//           throw new Error(res.status);
//         }

//         return res.json();
//       }
//     );
//  }
    async fetchPhotos() {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      ...this.baseSearchParams,
    });
  try {
    return await axios.get(`${this.#BASE_URL}?${searchParams}`);
  } catch (err) {
      throw new Error(err.message);
    }
}
  }
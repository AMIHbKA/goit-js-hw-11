import axios from 'axios';

const DEFAULT_PER_PAGE = 40;
const DEFAULT_IMAGE_TYPE = 'photo';
const DEFAULT_ORIENTATION = 'horizontal';
const DEFAULT_SAFESEARCH = true;

class ImageSearch {
  constructor(apiKey) {
    this.API_URL = 'https://pixabay.com/api/';
    this.API_KEY = apiKey;
    this.perPage = DEFAULT_PER_PAGE;
    this.page = 0;
    this.maxPage = 0;
    this.totalHits = 0;
    this.searchQuery = '';
    this.prevSearchQuery = '';
    this.isLoading = false;
  }

  async searchImages() {
    if (this.searchQuery === this.prevSearchQuery && !this.isLoading) {
      return;
    }

    if (!this.isLoading) {
      this.prevSearchQuery = this.searchQuery;
      this.resetPage();
    }

    try {
      this.incrementPage();
      const options = {
        params: {
          key: this.API_KEY,
          q: this.searchQuery,
          image_type: DEFAULT_IMAGE_TYPE,
          orientation: DEFAULT_ORIENTATION,
          safesearch: DEFAULT_SAFESEARCH,
          per_page: this.perPage,
          page: this.page,
        },
      };

      const response = await axios.get(this.API_URL, options);
      const { hits, totalHits } = response.data;

      if (!totalHits) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      this.totalHits = totalHits;
      if (!this.maxPage) {
        this.maxPage = Math.ceil(this.totalHits / this.perPage);
      }

      return hits;
    } catch (error) {
      this.decrementPage();
      throw error;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 0;
    this.maxPage = 0;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
    this.resetPage();
  }

  setPage(page) {
    if (page >= 1 && page <= this.maxPage) {
      this.page = page;
    }
  }

  setPerPage(perPage) {
    if (perPage >= 1 && perPage <= 200) {
      this.perPage = perPage;
    }
  }

  setOptions({ imageType, orientation, safesearch }) {
    this.imageType = imageType || DEFAULT_IMAGE_TYPE;
    this.orientation = orientation || DEFAULT_ORIENTATION;
    this.safesearch =
      safesearch !== undefined ? safesearch : DEFAULT_SAFESEARCH;
  }
}

export default ImageSearch;

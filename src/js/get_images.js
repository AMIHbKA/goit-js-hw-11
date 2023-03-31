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
    this.page = 1;
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

    try {
      const response = await axios.get(this.API_URL, options);
      const { hits, totalHits } = response.data;

      this.totalHits = totalHits;
      this.maxPage = Math.ceil(this.totalHits / this.perPage);

      if (this.maxPage === this.page) {
        throw new Error(
          "We're sorry, but you've reached the end of search results."
        );
      }

      this.incrementPage();
      console.log(this.page, 'page');

      return hits;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  incrementPage() {
    if (this.page >= this.maxPage) {
      this.page = this.maxPage;
    } else {
      this.page += 1;
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
    //
    // this.prevSearchQuery = this.searchQuery;
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

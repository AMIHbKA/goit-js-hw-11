import axios from 'axios';

class ImageSearch {
  constructor(apiKey) {
    this.API_URL = 'https://pixabay.com/api/';
    this.API_KEY = apiKey;
    this.perPage = 40;
    this.page = 1;
    this.maxPage = 0;
    this.totalHits = 0;
    this.searchQuery = '';
    this.prevSearchQuery = '';
    this.isLoading = false;
  }

  async searchImages() {
    const options = {
      params: {
        key: this.API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.perPage,
        page: this.page,
      },
    };

    if (this.searchQuery === this.prevSearchQuery && !this.isLoading) {
      return;
    } else if (!this.isLoading) {
      this.prevSearchQuery = this.searchQuery;
      this.resetPage();
    }

    try {
      const response = await axios.get(this.API_URL, options);
      const { hits, totalHits } = response.data;

      this.totalHits = totalHits;
      this.maxPage = Math.ceil(this.totalHits / this.perPage);

      if (this.maxPage === this.page) {
        //   console.log('pages', this.maxPage, this.page, this.totalHits);
        //   Если изображений нет, тогда срабатывает ошибка ниже, так как ТоталХится имеет всего 1 запись
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
  }
}

export default ImageSearch;

import ImageSearch from './js/get_images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Throttle from 'lodash.throttle';

let isLoading = false;

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadingStatus: document.querySelector('.loader'),
};

function renderGalleryImages(hits) {
  let gallery = hits.map(
    ({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `
    <div class="photo-card">
      <a class="link__photo-card" >
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
        <div class="info">
            <p class="info-item">
                <b>Likes: </b>${formattedNumber(likes)}
            </p>
            <p class="info-item">
                <b>Views: </b>${formattedNumber(views)}
            </p>
            <p class="info-item">
                <b>Comments: </b>${formattedNumber(comments)}
            </p>
            <p class="info-item">
                <b>Downloads: </b>${formattedNumber(downloads)}
            </p>
        </div>
    </div>
`;
    }
  );

  refs.gallery.insertAdjacentHTML('beforeend', gallery.join(''));
}

const newSearchImages = new ImageSearch(process.env.API_KEY);

document.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  newSearchImages.query = e.srcElement.searchQuery.value;
  newSearchImages.resetPage();
  clearGalleryContainer();

  try {
    const gallery = await newSearchImages.searchImages();

    renderGalleryImages(gallery);
  } catch (error) {
    Notify.failure(error.message);
  }
}

function formattedNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

function checkScrollPosition() {
  const scrollBottom = window.innerHeight + window.scrollY;
  if (scrollBottom >= document.documentElement.offsetHeight - 500) {
    loadMoreData();
  }
}

async function loadMoreData() {
  if (newSearchImages.isLoading) {
    return;
  }

  try {
    refs.loadingStatus.classList.add('hidden');
    newSearchImages.isLoading = true;
    const gallery = await newSearchImages.searchImages();

    renderGalleryImages(gallery);
    newSearchImages.isLoading = false;
    refs.loadingStatus.classList.remove('hidden');
  } catch (error) {
    refs.loadingStatus.classList.remove('hidden');
    Notify.failure(error.message);
  }
}

window.addEventListener('scroll', Throttle(checkScrollPosition, 1000));

import ImageSearch from './js/get_images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';

const newSearchImages = new ImageSearch(process.env.API_KEY);

document.addEventListener('submit', onSearch);

const throttleCheckScrollPosition = Throttle(checkScrollPosition, 1000);

window.addEventListener('scroll', throttleCheckScrollPosition);

let Lightbox = new SimpleLightbox('.gallery a', {
  captionSelector: 'img',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let cardHeight = 0;

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  loadingStatus: document.querySelector('.loader'),
};

const template = ({
  webformatURL,
  tags,
  likes = 0,
  views = 0,
  comments = 0,
  downloads = 0,
  largeImageURL,
}) => `
  <div class="photo-card">
    <a class="link__photo-card" href="${largeImageURL}" >
      <img class="image__photo-card" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <div class="info-item">
        <p class="info-item__header">Likes</p>
        <p class="info-item__value">${formattedNumber(likes)}</p>
      </div>
      <div class="info-item">
        <p class="info-item__header">Views</p>
        <p class="info-item__value">${formattedNumber(views)}</p>
      </div>
      <div class="info-item">
        <p class="info-item__header">Comments</p>
        <p class="info-item__value">${formattedNumber(comments)}</p>
      </div>
      <div class="info-item">
        <p class="info-item__header">Downloads</p>
        <p class="info-item__value">${formattedNumber(downloads)}</p>
      </div>
    </div>
  </div>
`;

function renderGalleryImages(hits) {
  const gallery = hits.reduce((acc, hit) => acc + template(hit), '');
  refs.gallery.insertAdjacentHTML('beforeend', gallery);
  // Получаем высоту карточки изображения
  cardHeight = refs.gallery.firstElementChild.getBoundingClientRect().height;
  Lightbox.refresh();
}

async function onSearch(e) {
  e.preventDefault();

  newSearchImages.query = e.srcElement.searchQuery.value;
  if (newSearchImages.prevSearchQuery === newSearchImages.query) {
    return;
  }
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
  Lightbox.refresh();
}

function checkScrollPosition() {
  const scrollBottom = window.innerHeight + window.scrollY;
  if (scrollBottom >= document.documentElement.offsetHeight - 500) {
    loadMoreData();
    setTimeout(() => {
      smoothScroll();
      console.log('smoothScroll');
    }, 500);
  }
}

async function loadMoreData() {
  if (newSearchImages.page === newSearchImages.maxPage) {
    refs.loadingStatus.classList.add('hidden');
    window.removeEventListener('scroll', throttleCheckScrollPosition);
    console.log('removeEventListener - scroll');
    return;
  }
  if (newSearchImages.isLoading) {
    console.log('newSearchImages.isLoading - return');
    return;
  }

  try {
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

// Функция для плавной прокрутки страницы
function smoothScroll() {
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

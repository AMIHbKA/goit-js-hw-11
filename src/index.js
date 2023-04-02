import ImageSearch from './js/get_images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';

// const newSearchImages = new ImageSearch(process.env.API_KEY);
const newSearchImages = new ImageSearch('33585066-cae5e25e756cb0d7a12760c5d');
const scrollToTopButton = document.getElementById('scrollToTopButton');
const throttleCheckScrollPosition = Throttle(checkScrollPosition, 1000);

document.addEventListener('submit', handleSearch);
document.addEventListener('scroll', throttleCheckScrollPosition);

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

async function handleSearch(e) {
  e.preventDefault();
  const searchQuery = e.target.searchQuery.value.trim();
  try {
    if (!searchQuery) {
      Notify.warning('Note that the query must not be empty!');
      return;
    }

    if (newSearchImages.prevSearchQuery === searchQuery) {
      return;
    }

    newSearchImages.query = searchQuery;
    newSearchImages.resetPage();
    clearGalleryContainer();
    document.removeEventListener('scroll', throttleCheckScrollPosition);
    document.addEventListener('scroll', throttleCheckScrollPosition);
    const gallery = await newSearchImages.searchImages();
    renderGalleryImages(gallery);
    Notify.success(`Hooray! We found ${newSearchImages.totalHits} images.`);
  } catch (error) {
    Notify.failure(error.message);
    clearGalleryContainer();
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
  if (scrollBottom >= document.documentElement.offsetHeight - 200) {
    loadMoreData();
  }

  if (window.pageYOffset > 100) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
}

async function loadMoreData() {
  try {
    if (newSearchImages.page === newSearchImages.maxPage) {
      refs.loadingStatus.classList.add('hidden');
      document.removeEventListener('scroll', throttleCheckScrollPosition);
      Notify.info("We're sorry, but you've reached the end of search results.");
      return;
    }
    if (newSearchImages.isLoading) {
      return;
    }
    newSearchImages.isLoading = true;
    const gallery = await newSearchImages.searchImages();

    renderGalleryImages(gallery);
    newSearchImages.isLoading = false;
    refs.loadingStatus.classList.remove('hidden');
    setTimeout(() => {
      smoothScroll();
    }, 500);
  } catch (error) {
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
  if (!cardHeight) {
    cardHeight = refs.gallery.firstElementChild.getBoundingClientRect().height;
  }
  Lightbox.refresh();
  if (hits.length < newSearchImages.perPage) {
    refs.loadingStatus.classList.add('hidden');
  }
}

//кнопка вверх
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  scrollToTopButton.style.display = 'none';
});

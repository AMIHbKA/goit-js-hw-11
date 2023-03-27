import ImageSearch from './js/get_images';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
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

  refs.gallery.innerHTML = gallery.join('');
}

const newSearchImages = new ImageSearch(process.env.API_KEY);

document.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();
  newSearchImages.query = e.srcElement.searchQuery.value;

  if (newSearchImages.query === '') {
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
}

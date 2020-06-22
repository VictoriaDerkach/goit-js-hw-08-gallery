import images from './gallery-items.js';

const gallery = document.getElementsByClassName('js-gallery')[0];
const lightbox = document.getElementsByClassName('js-lightbox')[0];
const largeImage = document.getElementsByClassName('lightbox__image')[0];

const imageCollection = images.map(image => {
  return `<li class="gallery__item">
  <img class="gallery__image" src="${image.preview}" data-source="${image.original}" alt="${image.description}"/>
  </li>`;
});

gallery.insertAdjacentHTML('afterbegin', imageCollection.join(''));

gallery.addEventListener('click', onGalleryClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;

  setLargeImageSrc(largeImageURL);
  lightbox.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape);
  lightbox.addEventListener('click', clickOnOverlay);
}

function setLargeImageSrc(url) {
  largeImage.src = url;
}

const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

closeModalBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
  lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onPressEscape);
  largeImage.src = '';
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
function clickOnOverlay(event) {
  if (event.target.nodeName !== 'IMG') {
    onCloseModal();
  }
}

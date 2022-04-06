const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_URL_AVATAR = 'img/muffin-grey.svg';

const avatarSelection = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoSelection = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');
const photoContainer = document.querySelector('.ad-form__photo-container');


function uploadImages(select, show, container) {
  const file = select.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    if (container) {
      const preview = show.cloneNode(true);
      show.remove();
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.style.width = '70px';
      img.style.height = '70px';
      preview.append(img);
      container.append(preview);
    } else {
      show.src = URL.createObjectURL(file);
    }
  }
}

avatarSelection.addEventListener('change', () => uploadImages(avatarSelection, avatarPreview));
photoSelection.addEventListener('change', () => uploadImages(photoSelection, photoPreview, photoContainer));

function resetImage() {
  avatarPreview.src = DEFAULT_URL_AVATAR;
  avatarSelection.value = '';
  photoSelection.value = '';
  const photosPreview = photoContainer.querySelectorAll('.ad-form__photo');
  photosPreview.forEach((el) => {
    el.remove();
  });
  photoContainer.append(photoPreview);
}

export {
  resetImage
};

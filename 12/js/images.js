const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarSelection = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoSelection = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

const photoContainer = document.querySelector('.ad-form__photo-container');

avatarSelection.addEventListener('change', () => {
  const file = avatarSelection.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});


photoSelection.addEventListener('change', () => {
  const file = photoSelection.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const preview = photoPreview.cloneNode(true);
    photoPreview.remove();
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.style.width = '70px';
    img.style.height = '70px';
    preview.append(img);
    photoContainer.append(preview);
  }
});


function resetImage () {
  avatarPreview.src = 'img/muffin-grey.svg';

  avatarSelection.value = '';

  photoSelection.value = '';

  const photosPreview = photoContainer.querySelectorAll('.ad-form__photo');
  photosPreview.forEach((el) => {
    el.remove();
  });

  photoContainer.append(photoPreview);

}

export {resetImage};
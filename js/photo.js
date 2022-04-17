const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const setOnChangePhotoInput = (photoChooser, photoPreview) => {
  photoChooser.addEventListener('change', () => {
    const file = photoChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      if (photoPreview.hasChildNodes()) {
        const image = photoPreview.querySelector('img');
        image.src = URL.createObjectURL(file);
      } else {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        photoPreview.style.display = 'flex';

        image.width = photoPreview.offsetWidth;
        image.style.alignItems = 'center';
        image.style.justifyContent = 'center';

        photoPreview.appendChild(image);
      }
    }

  });
};

export { setOnChangePhotoInput };

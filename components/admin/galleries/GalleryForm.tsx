import React, { useState, ReactElement, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/admin/Forms.module.css';
import GalleryImageForm from './GalleryImageForm';
import { Image } from 'types/Image.type';
import { Gallery } from 'types/Gallery.type';
import galleryTypes from 'lib/galleryTypes.json';

const TipTapEditor = dynamic(() => import('components/tiptap/TipTapEditor'), {
  suspense: true,
  loading: () => <p>Loading...</p>,
});

interface GalleryFromProps {
  gallery?: Gallery;
}

function GalleryForm({ gallery }: GalleryFromProps) {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      gallery_name: gallery ? gallery.gallery_name : '',
      gallery_description: gallery ? gallery.gallery_description : '',
      gallery_type: gallery ? gallery.gallery_type : '',
    },
    onSubmit: (values) => {
      axios({
        method: gallery ? 'put' : 'post',
        url: `/api/galleries/${gallery ? '/' + gallery.gallery_id : ''}`,
        data: { ...values },
      }).then(
        (response) => {
          console.log(response, 'response on gallery (put or post)');
          if (response.data) {
            window.location.href = `/admin/galleries/${
              gallery ? gallery.gallery_id : response.data.insertId
            }`; // BETTER FETCH THE POSTS THEN REFRESH PAGE
          }
        },
        (error) => {
          console.log(error, 'ERROR ON POST GALLERY');
        }
      );
    },
  });

  function handleSelectImage(galleryImage: Image) {
    let newSelectedImages = [];
    const selectedImageIndex = selectedImages.findIndex(
      (sImg) => sImg.image_src === galleryImage.image_src
    );
    if (selectedImageIndex === -1) {
      newSelectedImages = [...selectedImages, galleryImage];
    } else {
      newSelectedImages = [...selectedImages];
      newSelectedImages.splice(selectedImageIndex, 1);
    }
    setSelectedImages(newSelectedImages);
  }

  function deleteImage(galleryImage: Image) {
    console.log(galleryImage, ' GALLERY IMAGE');
    const deleteFileUrl = `http://${window.location.hostname}${
      window.location.port != '80' ? ':' + window.location.port : ''
    }/media/${galleryImage.image_src.split('/').join('+++')}`;
    const deleteFileRequest = axios.delete(deleteFileUrl);
    const deleteGalleryImageUrl = `/api/galleryimage/${galleryImage.image_id}`;
    const deleteGalleryImageRequest = axios.delete(deleteGalleryImageUrl);
    axios
      .all([deleteFileRequest, deleteGalleryImageRequest])
      .then(
        axios.spread((...responses) => {
          const deleteFileResponse = responses[0];
          const deleteGalleryImageResponse = responses[1];
          console.log(deleteFileResponse);
          console.log(deleteGalleryImageResponse);
          // const deletedImageIndex = gallery.images.findIndex(image => galleryImage.image_id === image.image_id);
          window.location.reload();
          // use/access the results
        })
      )
      .catch((errors) => {
        console.log(errors, ' ERRORS');
        // react on errors.
      });
  }

  function deleteSelectedImages() {
    console.log(selectedImages);

    let deleteRequests = [];

    if (selectedImages.length > 0) {
      console.log('FAAAAACKCKCKCKCKCKKC');

      selectedImages.forEach(function (img: Image, index: number) {
        const deleteFileUrl = `http://${window.location.hostname}${
          window.location.port !== '80' ? ':' + window.location.port : ''
        }/media/${img.image_src.split('/').join('+++')}`;
        const deleteFileRequest = axios.delete(deleteFileUrl);
        deleteRequests.push(deleteFileRequest);
        const deleteGalleryImageUrl = `/api/galleryimage/${img.image_id}`;
        const deleteGalleryImageRequest = axios.delete(deleteGalleryImageUrl);
        deleteRequests.push(deleteGalleryImageRequest);
      });

      axios
        .all([...deleteRequests])
        .then(
          axios.spread((...responses) => {
            console.log(responses);
            window.location.reload();
            // use/access the results
          })
        )
        .catch((errors) => {
          console.log(errors, ' ERRORS');
          // react on errors.
        });
    }
  }

  let galleryImagesSectionDisplay: ReactElement;
  if (gallery) {
    let galleryImagesDisplay: ReactElement[] | string =
      'no images in gallery, upload something!';
    if (gallery.images) {
      galleryImagesDisplay = gallery.images.map((galleryImage: Image) => (
        <GalleryImageForm
          key={galleryImage.image_id}
          galleryImage={galleryImage}
          galleryId={gallery.gallery_id}
          handleSelectImage={() => handleSelectImage(galleryImage)}
          isSelected={
            selectedImages.findIndex(
              (sImg) => sImg.image_src === galleryImage.image_src
            ) > -1
          }
        />
      ));
    }

    galleryImagesSectionDisplay = (
      <div>
        <h2>Add Image</h2>
        <GalleryImageForm galleryId={gallery.gallery_id} />
        <h2>Gallery Images</h2>
        {galleryImagesDisplay}
      </div>
    );
  }
  return (
    <React.Fragment>
      <div className={styles.container}>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles['form-row']}>
            <label htmlFor='gallery_name'>GALLERY NAME</label>
            <input
              id='gallery_name'
              name='gallery_name'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.gallery_name}
            />
          </div>

          <div className={styles['form-row']}>
            <label htmlFor='gallery_type'>GALLERY TYPE</label>
            <select
              id='gallery_type'
              name='gallery_type'
              value={formik.values.gallery_type}
              onChange={formik.handleChange}
            >
              <option>select type</option>
              {galleryTypes.map((gt: string, index: number) => (
                <option value={gt} key={index + Date.now()}>
                  {gt}
                </option>
              ))}
            </select>
          </div>

          <div className={styles['form-row']}>
            <label htmlFor='gallery_description'>GALLERY DESCRIPTION</label>
            <Suspense fallback={'LOADING...'}>
              <TipTapEditor
                onChange={(val) =>
                  formik.setFieldValue('gallery_description', val, true)
                }
                value={formik.values.gallery_description}
              />
            </Suspense>
          </div>
          <div className={styles['form-row']}>
            <button type='submit'>
              {gallery ? 'update gallery' : 'create gallery'}
            </button>
          </div>
        </form>
      </div>
      <button onClick={() => deleteSelectedImages()}>
        DELETE SELECTED IMAGES
      </button>
      {galleryImagesSectionDisplay}
    </React.Fragment>
  );
}

export default GalleryForm;

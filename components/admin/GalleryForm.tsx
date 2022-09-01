import React, { ReactElement, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/forms/Styles.module.css';
import GalleryImageForm from './GalleryImageForm';
import { Image } from 'types/Image.type';
import { Gallery } from 'types/Gallery.type';
import galleryTypes from 'lib/galleryTypes.json';

const DynamicTiptapEditor = dynamic(() => import('../tiptap/TipTapEditor'), {
  suspense: true,
});

interface GalleryFromProps {
  gallery: Gallery;
}

function GalleryForm({ gallery }: GalleryFromProps) {
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

  let galleryImagesSectionDisplay: ReactElement;
  if (gallery) {
    let galleryImagesDisplay: ReactElement[] | string =
      'no images in gallery, upload something!';
    if (gallery.images) {
      galleryImagesDisplay = gallery.images.map(
        (galleryImage: Image, index: number) => (
          <div key={index} className='gallery-form-image'>
            <a
              href={`/admin/galleries/${gallery.gallery_id}/${galleryImage.image_id}`}
            >
              <img
                src={`/wp-content/uploads/${galleryImage.image_src}`}
                width='300'
              />
            </a>
            <button onClick={() => deleteImage(galleryImage)}>DELETE</button>
          </div>
        )
      );
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
              <DynamicTiptapEditor
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
      {galleryImagesSectionDisplay}
    </React.Fragment>
  );
}

export default GalleryForm;

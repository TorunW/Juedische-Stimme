import React, { Suspense, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/forms/Styles.module.css';
import { generateFileName } from 'helpers/generateFileName';

const DynamicTiptapEditor = dynamic(() => import('../tiptap/TipTapEditor'), {
  suspense: true,
});

interface GalleryImageFormProps {
  galleryId:number | string;
  galleryImage?:any;
}

function GalleryImageForm({ galleryId, galleryImage }:GalleryImageFormProps) {

  const fileInputRef: any = useRef();

  function onUpladImageClick() {
    fileInputRef.current.click();
  }

  const onImageInputChangeHanlder = (event) => {
    if (!event.target.files?.length) {
      return;
    }
    const formData = new FormData();
    let fileName = event.target.files[0].name;
    Array.from(event.target.files).forEach((file: string | Blob) => {
      console.log(event.target.name, file);
      formData.append(event.target.name, file);
    });
    uploadImage(formData, fileName);
    //   fileInputRef.current?.reset();
  };

  const uploadImage = async (formData, fileName) => {
    // UPLOAD THE FILE
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    const response = await axios.post('/api/uploads', formData, config);
    console.log(response, ' RESPONSE OF UPLOAD');
    formik.setFieldValue(
      'image_src',
      generateFileName(fileName)
    );
  };

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      image_src: galleryImage ? galleryImage.image_src : '',
      image_title: galleryImage ? galleryImage.image_title : '',
      image_description: galleryImage ? galleryImage.image_description : '',
      image_gallery: galleryImage ? galleryImage.image_gallery : galleryId,
    },
    onSubmit: (values) => {
      console.log(values, ' VALJUES ON SUBMIT');

      axios({
        method: galleryImage ? 'put' : 'post',
        url: `/api/galleryimage${
          galleryImage ? '/' + galleryImage.image_id : ''
        }`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, 'response on gallery image (put or post)');
          if (response.data) {
            console.log(response.data);
            // addImageToGallery({image_id: (galleryImage ? galleryImage.image_id : response.data.insertId ), ...values })
            window.location.href = `/admin/galleries/${values.image_gallery}`; // BETTER FETCH THE POSTS THEN REFRESH PAGE
          }
        },
        (error) => {
          console.log(error, 'ERROR on gallery image');
        }
      );
    },
  });

  let imageDisplay;
  if (formik.values.image_src) {
    imageDisplay = (
      <div className={styles['from-row']}>
        <img src={`/wp-content/uploads/${formik.values.image_src}`} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {imageDisplay}
      <form onSubmit={formik.handleSubmit}>
        <div className={styles['form-row']}>
          <label htmlFor='image_title'>IMAGE TITLE</label>
          <input
            id='image_title'
            name='image_title'
            type='image_title'
            onChange={formik.handleChange}
            value={formik.values.image_title}
          />
        </div>
        <div className={styles['form-row']}>
          <label htmlFor='image_description'>IMAGE DESCRIPTION</label>
          <Suspense fallback={'LOADING...'}>
            <DynamicTiptapEditor
              onChange={(val) =>
                formik.setFieldValue('image_description', val, true)
              }
              value={formik.values.image_description}
              showMenu={false}
              height={200}
            />
          </Suspense>
        </div>
        <a
          style={{ border: '1px solid black', cursor: 'pointer' }}
          onClick={onUpladImageClick}
        >
          INSERT IMAGE BUTTON!!
          <input
            accept={'.*'}
            multiple={false}
            name={'theFiles'}
            onChange={onImageInputChangeHanlder}
            ref={fileInputRef}
            style={{ display: 'none' }}
            type='file'
          />
        </a>
        <div className={styles['form-row']}>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default GalleryImageForm;

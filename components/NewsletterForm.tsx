import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import styles from 'styles/Form.module.css';

const NewsletterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3, '* too short!'),
      email: Yup.string().email().required('* required!'),
    }),
    onSubmit: (values) => {
      axios({
        method: 'post',
        url: `/api/newsletter`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, 'response on send contact');
        },
        (error) => {
          console.log(error, 'ERROR on send contact');
        }
      );
    },
  });

  return (
    <div id='newsletter' className={styles.newsletterForm}>
      <h3>Signup to Newsletter</h3>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formCol}>
          <input
            id='name'
            name='name'
            type='name'
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder='Name'
          />
          {formik.errors && formik.errors.name ? (
            <div className={styles.error}>{formik.errors.name}</div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.formCol}>
          <input
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder='Email'
          />
          {formik.errors && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : (
            ''
          )}
        </div>
        <div className='button whiteBg formBtn'>
          <button type='submit'>Senden</button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;

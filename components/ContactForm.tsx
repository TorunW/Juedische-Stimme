import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'styles/Form.module.css';
import * as Yup from 'yup';

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().min(3, '* too short!').required('* required!'),
      email: Yup.string().email().required('* required!'),
      message: Yup.string().required('* required!'),
    }),
    onSubmit: (values) => {
      axios({
        method: 'post',
        url: `/api/contact`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, 'response on send newsletter');
        },
        (error) => {
          console.log(error, 'ERROR on send newsletter');
        }
      );
    },
  });

  return (
    <div id='contact' className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2>Kontakt</h2>
        <div className={styles.formRow}>
          <input
            id='name'
            name='name'
            type='name'
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder='Name'
            data-testid='name-input'
          />
          {formik.errors && formik.errors.name && formik.touched && formik.touched.name ? (
            <div data-testid='name-error' className={styles.error}>
              {formik.errors.name}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.formRow}>
          <input
            id='email'
            name='email'
            type='email'
            data-testid='email-input'
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder='Email'
          ></input>
          {formik.errors && formik.errors.email  && formik.touched && formik.touched.email  ? (
            <div data-testid='email-error' className={styles.error}>
              {formik.errors.email}
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.formRow}>
          <textarea
            id='message'
            name='message'
            onChange={formik.handleChange}
            value={formik.values.message}
          />
          {formik.errors && formik.errors.message  && formik.touched && formik.touched.message  ? (
            <div data-testid='message-error' className={styles.error}>
              {formik.errors.message}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='button blackBg submitBtn'>
          <button type='submit'>Senden</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

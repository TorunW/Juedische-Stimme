import React from 'react';
import { useEffect, useCallback, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import styles from 'styles/Form.module.css';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const NewsletterForm = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [notification, setNotification] = useState('');

  const handleSumitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }
      executeRecaptcha('enquiryFormSubmit').then((gReCaptchaToken) => {
        console.log(gReCaptchaToken, 'response Google reCaptcha server');
        submitEnquiryForm(gReCaptchaToken);
      });
    },
    [executeRecaptcha]
  );

  const submitEnquiryForm = (gReCaptchaToken) => {
    fetch('/api/enquiry', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // name: name,
        // email: email,
        gRecaptchaToken: gReCaptchaToken,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, 'response from backend');
        if (res?.status === 'success') {
          setNotification(res?.message);
        } else {
          setNotification(res?.message);
        }
      });
  };

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
    <div
      id='newsletter'
      className={styles.newsletterForm + ' ' + styles.formContainer}
    >
      <h2>Signup to Newsletter</h2>
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
            placeholder='Email *'
          />
          {formik.errors && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : (
            ''
          )}
        </div>
        <div className='button whiteBg submitBtn'>
          <button type='submit' onClick={handleSumitForm}>
            Senden
          </button>
          {notification && <p>{notification}</p>}
        </div>
      </form>
    </div>
  );
};

export default NewsletterForm;

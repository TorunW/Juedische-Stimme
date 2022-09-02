import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from './Styles.module.css';
import * as Yup from 'yup';

const MembershipForm = () => {
  const formik = useFormik({
    initialValues: {
      birthdate: '',
      street: '',
      postcode: '',
      location: '',
      tel: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      birthdate: Yup.string().min(8, '* too short!').required('* required!'),
      street: Yup.string().min(3, '* too short!').required('* required!'),
      postCode: Yup.string().min(5, '* too short!').required('* required!'),
      location: Yup.string().min(3, '* too short!').required('* required!'),
      tel: Yup.string().min(3, '* too short!').required('* required!'),
      email: Yup.string().email().required('* required!'),
    }),
    onSubmit: (values) => {
      console.log('hello');
      console.log(values);
      axios({
        method: 'post',
        url: `/api/membership`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, 'did send form');
        },
        (error) => {
          console.log(error, 'error');
        }
      );
    },
  });

  function handleClick() {
    console.log('hello');
  }

  return (
    <div id='membership' className={styles.membershipFormContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.membershipForm}>
        <h3>Dein Info Aufüllen</h3>
        <input
          id='birthdate'
          name='birthdate'
          type='birthdate'
          onChange={formik.handleChange}
          value={formik.values.birthdate}
          placeholder='TT/MM/JJJJ'
        />

        <input
          id='street'
          name='street'
          type='street'
          onChange={formik.handleChange}
          value={formik.values.street}
          placeholder='Straße'
        />

        <div className={styles.formRow}>
          <input
            id='postcode'
            name='postcode'
            type='postcode'
            onChange={formik.handleChange}
            value={formik.values.postcode}
            placeholder='PLZ'
          />

          <input
            id='location'
            name='location'
            type='location'
            onChange={formik.handleChange}
            value={formik.values.location}
            placeholder='Ort'
          />
        </div>

        <input
          id='tel'
          name='tel'
          type='tel'
          onChange={formik.handleChange}
          value={formik.values.tel}
          placeholder='Tel'
        />

        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder='Email'
        />

        <div className='button blackBg submitBtn'>
          <button type='submit' onClick={handleClick}>
            Senden
          </button>
        </div>
      </form>
    </div>
  );
};

export default MembershipForm;

// fax and telephone??? is it really necessary???
// Do we need to check if person is over 18?

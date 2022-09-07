import React, { useEffect} from 'react';
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
      postcode: Yup.string().min(5, '* too short!').required('* required!'),
      location: Yup.string().min(3, '* too short!').required('* required!'),
      tel: Yup.string().min(3, '* too short!').required('* required!'),
      email: Yup.string().email().required('* required!'),
    }),
    onSubmit: (values) => {
      console.log('IM THE SUBMIT BIAZTCH');
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

  useEffect(() => {
    console.log(formik.values.birthdate.length, " LENGTH OF BIRTHDAY INPUT")
    if (formik.values.birthdate.length === 2) formik.setFieldValue('birthdate',formik.values.birthdate + "/")
  },[formik.values.birthdate])

  console.log(formik.errors)

  return (
    <div id='membership' className={styles.membershipFormContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.membershipForm}>
        <h3>Dein Info Aufüllen</h3>
        <div>
        <input
          id='birthdate'
          name='birthdate'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.birthdate}
          placeholder='TT/MM/JJJJ'
        />
        {formik.errors && formik.errors.birthdate ? <span style={{color:"white"}}>{formik.errors.birthdate}</span> : ""}
        </div>

        <input
          id='street'
          name='street'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.street}
          placeholder='Straße'
        />
        {formik.errors && formik.errors.birthdate ? <span style={{color:"white"}}>{formik.errors.street}</span> : ""}

        <div className={styles.formRow}>
          <div>
          <input
            id='postcode'
            name='postcode'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.postcode}
            placeholder='PLZ'
          />
        {formik.errors && formik.errors.birthdate ? <span style={{color:"white"}}>{formik.errors.postcode}</span> : ""}

          </div>
          <input
            id='location'
            name='location'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.location}
            placeholder='Ort'
          />

          {formik.errors && formik.errors.birthdate ? <span style={{color:"white"}}>{formik.errors.location}</span> : ""}
        </div>

        <input
          id='tel'
          name='tel'
          type='text'
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
          <button type='submit'>
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

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from './Styles.module.css';
import * as Yup from 'yup';

const MembershipForm = () => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',

      birthdateDay: '',
      birthdateMonth: '',
      birthdateYear: '',

      street: '',
      streetNr: '',
      zipcode: '',
      city: '',

      tel: '',
      email: '',
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string().min(2, '* too short!').required('* required!'),
      lastname: Yup.string().min(2, '* too short!').required('* required!'),

      birthdateDay: Yup.number()
        .min(2, '* too short!')
        .max(2, '* too long!')
        .required('* required!'),
      birthdateMonth: Yup.number()
        .min(2, '* too short!')
        .max(2, '* too long!')
        .required('* required!'),
      birthdateYear: Yup.number()
        .min(4, '* too short!')
        .max(4, '* too long!')
        .required('* required!'),

      street: Yup.string().min(3, '* too short!').required('* required!'),
      streetNr: Yup.number().min(1, '* too short!').required('* required!'),
      zipcode: Yup.string().min(5, '* too short!').required('* required!'),
      city: Yup.string().min(3, '* too short!').required('* required!'),

      tel: Yup.number().min(7, '* too short!').required('* required!'),
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

  return (
    <div id='membership' className={styles.membershipFormContainer}>
      <form onSubmit={formik.handleSubmit} className={styles.membershipForm}>
        <h3>Dein Info Ausfüllen</h3>
        <div className={styles.formRow}>
          <input
            id='firstname'
            name='firstname'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.firstname}
            placeholder='firstname'
          />
          {formik.errors.firstname && formik.touched.firstname ? (
            <span style={{ color: 'white' }}>{formik.errors.firstname}</span>
          ) : (
            ''
          )}
        </div>
        <div className={styles.formRow}>
          <input
            id='lastname'
            name='lastname'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.lastname}
            placeholder='lastname'
          />
          {formik.errors.lastname && formik.touched.lastname ? (
            <span style={{ color: 'white' }}>{formik.errors.lastname}</span>
          ) : (
            ''
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <input
              id='birthdateDay'
              name='birthdateDay'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateDay}
              placeholder='TT'
            />
          </div>
          <span>/</span>
          <div className={styles.formColumn}>
            <input
              id='birthdateMonth'
              name='birthdateMonth'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateMonth}
              placeholder='MM'
            />{' '}
          </div>
          <span>/</span>
          <div className={styles.formColumn}>
            <input
              id='birthdateYear'
              name='birthdateYear'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateYear}
              placeholder='YYYY'
            />{' '}
          </div>
          {formik.errors.birthdateDay && formik.touched.birthdateDay ? (
            <span style={{ color: 'white' }}>{formik.errors.birthdateDay}</span>
          ) : (
            ''
          )}
          {formik.errors.birthdateMonth && formik.touched.birthdateMonth ? (
            <span style={{ color: 'white' }}>
              {formik.errors.birthdateMonth}
            </span>
          ) : (
            ''
          )}
          {formik.errors.birthdateYear && formik.touched.birthdateYear ? (
            <span style={{ color: 'white' }}>
              {formik.errors.birthdateYear}
            </span>
          ) : (
            ''
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <input
              id='street'
              name='street'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.street}
              placeholder='Straße'
            />
            {formik.errors.street && formik.touched.street ? (
              <span style={{ color: 'white' }}>{formik.errors.street}</span>
            ) : (
              ''
            )}
          </div>

          <div className={styles.formColumn}>
            <input
              id='streetNr'
              name='streetNr'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.streetNr}
              placeholder='Nr'
            />
            {formik.errors.streetNr && formik.touched.streetNr ? (
              <span style={{ color: 'white' }}>{formik.errors.streetNr}</span>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <input
              id='zipcode'
              name='zipcode'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              placeholder='PLZ'
            />
            {formik.errors.zipcode && formik.touched.zipcode ? (
              <span style={{ color: 'white' }}>{formik.errors.zipcode}</span>
            ) : (
              ''
            )}
          </div>
          <div className={styles.formColumn}>
            <input
              id='city'
              name='city'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.city}
              placeholder='City'
            />
            {formik.errors.city && formik.touched.city ? (
              <span style={{ color: 'white' }}>{formik.errors.city}</span>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <input
            id='tel'
            name='tel'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.tel}
            placeholder='Tel'
          />
          {formik.errors.tel && formik.touched.tel ? (
            <span style={{ color: 'white' }}>{formik.errors.tel}</span>
          ) : (
            ''
          )}
        </div>

        <div className={styles.formRow}>
          <input
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder='Email'
          />
          {formik.errors.email && formik.touched.email ? (
            <span style={{ color: 'white' }}>{formik.errors.email}</span>
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

export default MembershipForm;

// fax and telephone??? is it really necessary???
// Do we need to check if person is over 18?

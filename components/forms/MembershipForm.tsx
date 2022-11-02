import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from './Styles.module.css';
import * as Yup from 'yup';
import { useSelector } from 'store/hooks';
import { getLabel } from 'helpers/getLabelHelper';
import { TextField, Typography, useMediaQuery } from '@mui/material';
import theme from 'config/theme';
import Grid from '@mui/material/Grid';

const MembershipForm = () => {
  const { labels } = useSelector((state) => state.labels);
  const { locale } = useSelector((state) => state.languages);

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

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

      birthdateDay: Yup.string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(2, 'too short')
        .max(2, 'too long'),
      birthdateMonth: Yup.string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(2, 'too short')
        .max(2, 'too long'),
      birthdateYear: Yup.string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(4, 'too short')
        .max(4, 'too long'),

      street: Yup.string().min(1, '* too short!').required('* required!'),
      streetNr: Yup.number().min(1, '* too short!').required('* required!'),
      zipcode: Yup.string().min(5, '* too short!').required('* required!'),
      city: Yup.string().min(1, '* too short!').required('* required!'),

      tel: Yup.number().min(7, '* too short!').required('* required!'),
      email: Yup.string().email().required('* required!'),
    }),
    onSubmit: (values) => {
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
    <div id='membership' className={styles.membershipForm}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>Dein Info Ausfüllen</h3>
        <Grid container spacing={isSmall ? 1 : 3}>
          <Grid item xs={12}>
            <TextField
              id='firstname'
              name='firstname'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.firstname}
              placeholder={getLabel(labels, locale, 'firstname', 'Vorname')}
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.firstname && formik.touched.firstname ? (
              <span style={{ color: 'white' }}>{formik.errors.firstname}</span>
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='lastname'
              name='lastname'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.lastname}
              placeholder={getLabel(labels, locale, 'lastname', 'Nachname')}
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.lastname && formik.touched.lastname ? (
              <span style={{ color: 'white' }}>{formik.errors.lastname}</span>
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={3}>
            <TextField
              id='birthdateDay'
              name='birthdateDay'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateDay}
              placeholder='TT'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.birthdateDay && formik.touched.birthdateDay ? (
              <span style={{ color: 'white' }}>
                {formik.errors.birthdateDay}
              </span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ color: 'white', marginTop: 1 }}>/</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='birthdateMonth'
              name='birthdateMonth'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateMonth}
              placeholder='MM'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.birthdateMonth && formik.touched.birthdateMonth ? (
              <span style={{ color: 'white' }}>
                {formik.errors.birthdateMonth}
              </span>
            ) : (
              ''
            )}{' '}
          </Grid>
          <Grid item xs={1}>
            <Typography sx={{ color: 'white', marginTop: 1 }}>/</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id='birthdateYear'
              name='birthdateYear'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateYear}
              placeholder='YYYY'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.birthdateYear && formik.touched.birthdateYear ? (
              <span style={{ color: 'white' }}>
                {formik.errors.birthdateYear}
              </span>
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={9}>
            <TextField
              id='street'
              name='street'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.street}
              placeholder='Straße'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.street && formik.touched.street ? (
              <span style={{ color: 'white' }}>{formik.errors.street}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='streetNr'
              name='streetNr'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.streetNr}
              placeholder='Nr'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.streetNr && formik.touched.streetNr ? (
              <span style={{ color: 'white' }}>{formik.errors.streetNr}</span>
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={5}>
            <TextField
              id='zipcode'
              name='zipcode'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              placeholder='PLZ'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.zipcode && formik.touched.zipcode ? (
              <span style={{ color: 'white' }}>{formik.errors.zipcode}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={7}>
            <TextField
              id='city'
              name='city'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.city}
              placeholder='City'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.city && formik.touched.city ? (
              <span style={{ color: 'white' }}>{formik.errors.city}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='tel'
              name='tel'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.tel}
              placeholder='Tel'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.tel && formik.touched.tel ? (
              <span style={{ color: 'white' }}>{formik.errors.tel}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder='Email'
              variant='standard'
              color='secondary'
              focused
              sx={{
                '& .MuiInputBase-root': {
                  color: 'white',
                },
              }}
              fullWidth
            />
            {formik.errors.email && formik.touched.email ? (
              <span style={{ color: 'white' }}>{formik.errors.email}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12} marginTop={2}>
            <div className='button blackBg submitBtn'>
              <button type='submit'>Senden</button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default MembershipForm;

// fax and telephone??? is it really necessary???
// Do we need to check if person is over 18?

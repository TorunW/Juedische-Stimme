import { TextField, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import theme from 'config/theme';
import { useFormik } from 'formik';
import { getLabel } from 'helpers/getLabelHelper';
import { useState } from 'react';
import { useSelector } from 'store/hooks';
import * as Yup from 'yup';
import { ButtonWithLoading } from '../atoms/ButtonWithLoading';
import styles from './Styles.module.css';

const MembershipForm = () => {
  const { labels } = useSelector((state) => state.labels);
  const { locale } = useSelector((state) => state.languages);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      setIsSubmitting(true);
      axios({
        method: 'post',
        url: `/api/membership`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          console.log(response, 'did send form');
        },
        (error) => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          console.log(error, 'error');
        }
      );
    },
  });

  const inputStyle = {
    '& .MuiFormLabel-root': {
      color: 'white !important',
    },
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#8179a6',
    },
    ' && .MuiInput-root:hover::before ': {
      borderColor: '#8179a6',
    },
  };

  return (
    <div id='membership' className={styles.membershipForm}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>
          {getLabel(labels, locale, 'fill_in_your_info', 'Dein Info Ausfüllen')}
        </h3>
        <Grid container spacing={isSmall ? 1 : 3}>
          <Grid item xs={12} sx={{ paddingTop: '0px !important' }}>
            <TextField
              id='firstname'
              name='firstname'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.firstname}
              label={getLabel(labels, locale, 'firstname', 'Vorname')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
              fullWidth
            />
            {formik.errors.firstname && formik.touched.firstname ? (
              <span style={{ color: 'white' }}>{formik.errors.firstname}</span>
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={12} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='lastname'
              name='lastname'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.lastname}
              label={getLabel(labels, locale, 'lastname', 'Nachname')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
              fullWidth
            />
            {formik.errors.lastname && formik.touched.lastname ? (
              <span style={{ color: 'white' }}>{formik.errors.lastname}</span>
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={3} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='birthdateDay'
              name='birthdateDay'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateDay}
              label={getLabel(labels, locale, 'TT', 'TT')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
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
          <Grid
            item
            xs={1}
            sx={{ paddingX: '15px !important', paddingTop: '16px !important' }}
          >
            <Typography sx={{ color: 'white', marginTop: 2.7 }}>/</Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{ paddingX: '0px !important', paddingTop: '16px !important' }}
          >
            <TextField
              id='birthdateMonth'
              name='birthdateMonth'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateMonth}
              label={getLabel(labels, locale, 'MM', 'MM')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
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
          <Grid
            item
            xs={1}
            sx={{ paddingX: '15px !important', paddingTop: '16px !important' }}
          >
            <Typography sx={{ color: 'white', marginTop: 2.7 }}>/</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{ paddingX: '0px !important', paddingTop: '16px !important' }}
          >
            <TextField
              id='birthdateYear'
              name='birthdateYear'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.birthdateYear}
              label={getLabel(labels, locale, 'YYYY', 'YYYY')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
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

          <Grid item xs={9} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='street'
              name='street'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.street}
              label={getLabel(labels, locale, 'street', 'Straße')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
              fullWidth
            />
            {formik.errors.street && formik.touched.street ? (
              <span style={{ color: 'white' }}>{formik.errors.street}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={3} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='streetNr'
              name='streetNr'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.streetNr}
              label={getLabel(labels, locale, 'street_number', 'Nr')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
              fullWidth
            />
            {formik.errors.streetNr && formik.touched.streetNr ? (
              <span style={{ color: 'white' }}>{formik.errors.streetNr}</span>
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={5} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='zipcode'
              name='zipcode'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              label={getLabel(labels, locale, 'PLZ', 'Zip')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
              fullWidth
            />
            {formik.errors.zipcode && formik.touched.zipcode ? (
              <span style={{ color: 'white' }}>{formik.errors.zipcode}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={7} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='city'
              name='city'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.city}
              label={getLabel(labels, locale, 'city', 'Stadt')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
              fullWidth
            />
            {formik.errors.city && formik.touched.city ? (
              <span style={{ color: 'white' }}>{formik.errors.city}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='tel'
              name='tel'
              type='text'
              onChange={formik.handleChange}
              value={formik.values.tel}
              label={getLabel(labels, locale, 'telephone', 'Tel')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
              fullWidth
            />
            {formik.errors.tel && formik.touched.tel ? (
              <span style={{ color: 'white' }}>{formik.errors.tel}</span>
            ) : (
              ''
            )}
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: '16px !important' }}>
            <TextField
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              label={getLabel(labels, locale, 'email', 'Email')}
              variant='standard'
              color='secondary'
              sx={inputStyle}
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
              <ButtonWithLoading
                disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  isSubmitting ||
                  isSubmitted
                }
                loading={isSubmitting && !isSubmitted}
                isFinished={isSubmitted}
                text={getLabel(labels, locale, 'send', 'Senden')}
                textAfterLoading={getLabel(labels, locale, 'sent', 'Gesendet')}
              />
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default MembershipForm;

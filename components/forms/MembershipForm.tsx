import {
  FormHelperText,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import theme from 'config/theme';
import { useFormik } from 'formik';
import { getLabel } from 'helpers/getLabelHelper';
import { useState } from 'react';
import { useSelector } from 'store/hooks';
import * as Yup from 'yup';
import { ButtonWithLoading } from '../atoms/ButtonWithLoading';
import FormTextField from './FormTextField';
import styles from './Styles.module.css';

const MembershipForm = () => {
  const { labels } = useSelector((state) => state.labels);
  const { locale } = useSelector((state) => state.languages);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  console.log(isSmall);

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
        .required('*required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(2, 'too short')
        .max(2, 'too long'),
      birthdateMonth: Yup.string()
        .required('*required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(2, 'too short')
        .max(2, 'too long'),
      birthdateYear: Yup.string()
        .required('*required')
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

  return (
    <div id='membership' className={styles.membershipForm}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>
          {getLabel(labels, locale, 'fill_in_your_info', 'Dein Info Ausfüllen')}
        </h3>
        <Grid container spacing={isSmall ? 2 : 3}>
          <Grid item xs={11} sx={{ paddingTop: '0px !important' }}>
            <FormTextField
              id={'firstname'}
              name={'firstname'}
              onChange={formik.handleChange}
              value={formik.values.firstname}
              label={getLabel(labels, locale, 'firstname', 'Vorname')}
              error={formik.errors.firstname}
              touched={formik.touched.firstname}
            />
          </Grid>
          <Grid item xs={11}>
            <FormTextField
              id={'lastname'}
              name={'lastname'}
              onChange={formik.handleChange}
              value={formik.values.lastname}
              label={getLabel(labels, locale, 'lastname', 'Nachname')}
              error={formik.errors.lastname}
              touched={formik.touched.lastname}
            />
          </Grid>
          <Grid item xs={3}>
            <FormTextField
              id='birthdateDay'
              name='birthdateDay'
              onChange={formik.handleChange}
              value={formik.values.birthdateDay}
              label={getLabel(labels, locale, 'TT', 'TT')}
              error={formik.errors.birthdateDay}
              touched={formik.touched.birthdateDay}
            />
          </Grid>
          <Grid item xs={1} sx={{ paddingX: '10px !important' }}>
            <Typography sx={{ color: 'white', marginTop: 2.7 }}>/</Typography>
          </Grid>
          <Grid item xs={3} sx={{ paddingX: '0px !important' }}>
            <FormTextField
              id='birthdateMonth'
              name='birthdateMonth'
              onChange={formik.handleChange}
              value={formik.values.birthdateMonth}
              label={getLabel(labels, locale, 'MM', 'MM')}
              error={formik.errors.birthdateMonth}
              touched={formik.touched.birthdateMonth}
            />
          </Grid>
          <Grid item xs={1} sx={{ paddingX: '10px !important' }}>
            <Typography sx={{ color: 'white', marginTop: 2.7 }}>/</Typography>
          </Grid>
          <Grid item xs={3} sx={{ paddingX: '0px !important' }}>
            <FormTextField
              id='birthdateYear'
              name='birthdateYear'
              onChange={formik.handleChange}
              value={formik.values.birthdateYear}
              label={getLabel(labels, locale, 'YYYY', 'YYYY')}
              error={formik.errors.birthdateYear}
              touched={formik.touched.birthdateYear}
            />
          </Grid>

          <Grid item xs={8}>
            <FormTextField
              id='street'
              name='street'
              onChange={formik.handleChange}
              value={formik.values.street}
              label={getLabel(labels, locale, 'street', 'Straße')}
              error={formik.errors.street}
              touched={formik.touched.street}
            />
          </Grid>
          <Grid item xs={3}>
            <FormTextField
              id='streetNr'
              name='streetNr'
              onChange={formik.handleChange}
              value={formik.values.streetNr}
              label={getLabel(labels, locale, 'street_number', 'Nr')}
              error={formik.errors.streetNr}
              touched={formik.touched.streetNr}
            />
          </Grid>

          <Grid item xs={4}>
            <FormTextField
              id='zipcode'
              name='zipcode'
              onChange={formik.handleChange}
              value={formik.values.zipcode}
              label={getLabel(labels, locale, 'PLZ', 'Zip')}
              error={formik.errors.zipcode}
              touched={formik.touched.zipcode}
            />
          </Grid>
          <Grid item xs={7}>
            <FormTextField
              id='city'
              name='city'
              onChange={formik.handleChange}
              value={formik.values.city}
              label={getLabel(labels, locale, 'city', 'Stadt')}
              error={formik.errors.city}
              touched={formik.touched.city}
            />
          </Grid>
          <Grid item xs={11}>
            <FormTextField
              id='tel'
              name='tel'
              onChange={formik.handleChange}
              value={formik.values.tel}
              label={getLabel(labels, locale, 'telephone', 'Tel')}
              error={formik.errors.tel}
              touched={formik.touched.tel}
            />
          </Grid>
          <Grid item xs={11}>
            <FormTextField
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              label={getLabel(labels, locale, 'email', 'Email')}
              error={formik.errors.email}
              touched={formik.touched.email}
            />
          </Grid>
          <Grid item xs={11}>
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

import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from './Styles.module.css';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '../atoms/Container';

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
    <div id='contact'>
      <Container>
        <form onSubmit={formik.handleSubmit} className={styles.contactForm}>
          <Grid container spacing={4} display='flex' justifyContent={'center'}>
            <Grid item xs={10}>
              <h2>Kontakt</h2>
            </Grid>

            <Grid item md={5} xs={10}>
              <TextField
                id='name'
                type='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder='Name'
                data-testid='name-input'
                fullWidth
                sx={{ background: 'white' }}
              />
              {formik.errors && formik.errors.name ? (
                <div data-testid='name-error' className={styles.error}>
                  {formik.errors.name}
                </div>
              ) : (
                ''
              )}
            </Grid>
            <Grid item md={5} xs={10}>
              <TextField
                id='email'
                type='email'
                data-testid='email-input'
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder='Email'
                fullWidth
                sx={{ background: 'white' }}
              />
              {formik.errors && formik.errors.email ? (
                <div data-testid='email-error' className={styles.error}>
                  {formik.errors.email}
                </div>
              ) : (
                ''
              )}
            </Grid>
            <Grid item md={10} xs={10}>
              <TextField
                id='message'
                name='message'
                onChange={formik.handleChange}
                value={formik.values.message}
                data-testid='message-input'
                multiline
                rows={3}
                fullWidth
                placeholder='Your messsage...'
                sx={{ background: 'white' }}
              />
              {formik.errors.message && formik.touched.message ? (
                <div data-testid='message-error' className={styles.error}>
                  {formik.errors.message}
                </div>
              ) : (
                ''
              )}
            </Grid>

            <Grid item xs={10}>
              <Button
                type='submit'
                fullWidth
                sx={{
                  border: 5,
                  borderRadius: 0,
                  borderColor: '#8179a6',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  height: '55px',
                  color: 'white',
                  '&:hover': {
                    background: '#8179a6',
                    color: 'white',
                    transition: 'all .5s ease-in-out',
                  },
                }}
              >
                Senden
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default ContactForm;

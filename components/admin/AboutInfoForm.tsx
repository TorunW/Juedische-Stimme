import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/admin/Forms.module.css';
import { useDispatch, useSelector } from 'store/hooks';
import {
  Box,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import FormError from '@/components/atoms/FormError';
import AdminTopBar from '@/components/atoms/AdminTopBar';
import FormHelp from '../atoms/FormHelp';

const TiptapEditor = dynamic(() => import('components/tiptap/TipTapEditor'), {
  suspense: true,
});

const AboutInfoForm = ({ aboutInfo }) => {
  const { galleries } = useSelector((state) => state.galleries);
  const [selectedGalleryId, setSelectedGalleryId] = useState(
    aboutInfo.about_gallery_id
  );

  const formik = useFormik({
    initialValues: {
      ...aboutInfo,
    },
    onSubmit: (values) => {
      axios({
        method: 'put',
        url: `/api/aboutinfo`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, 'response on aboutinfo (put)');
        },
        (error) => {
          console.log(error, 'ERROR on put aboutinfo');
        }
      );
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            paddingLeft: 4,
            paddingRight: 2,
            paddingY: 2,
          }}
        >
          <Grid container spacing={2} display='flex' alignItems={'center'}>
            {/* <h2>HEADER SLOGAN</h2>
                    <Suspense fallback={"LOADING..."}>
                        <TiptapEditor
                            onChange={val => formik.setFieldValue('header_slogan',val,true)}
                            value={formik.values.header_slogan}
                            height={200}
                        />
                    </Suspense> */}

            <h2>ABOUT SECTION</h2>
            <Grid container item sx={{ marginY: 2 }}>
              <Suspense fallback={'LOADING...'}>
                <TiptapEditor
                  onChange={(val) =>
                    formik.setFieldValue('text_top', val, true)
                  }
                  value={formik.values.text_top}
                  height={150}
                  title={'Top Text'}
                />
              </Suspense>
              <Grid
                item
                xs={1}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <FormHelp text={``} />
              </Grid>
              {/* {formik.errors && formik.errors.post_content ? (
                <FormError message={formik.errors.post_content} />
              ) : (
                ''
              )} */}
            </Grid>

            <Grid item container xs={11}>
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <Suspense fallback={'LOADING...'}>
                  <TextField
                    id='about_gallery_id'
                    name='about_gallery_id'
                    type='about_gallery_id'
                    label='Gallery'
                    margin='normal'
                    focused
                    placeholder='About Us Gallery'
                    onChange={formik.handleChange}
                    value={formik.values.about_gallery_id}
                  />
                </Suspense>
                {/* {formik.errors && formik.errors.post_title ? (
                  <FormError message={formik.errors.post_title} />
                ) : (
                  ''
                )} */}
              </FormControl>
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth margin='normal'>
                <InputLabel>Gallery</InputLabel>
                <Select
                  id='galleries'
                  name='galleries'
                  label='Gallery'
                  value={selectedGalleryId}
                  onChange={(e) => setSelectedGalleryId(e.target.value)}
                  placeholder='Select Gallery'
                >
                  {galleries.map((gallery, index) => (
                    <MenuItem
                      key={Date.now() + index}
                      value={gallery.gallery_id}
                    >
                      {gallery.gallery_name}
                    </MenuItem>
                  ))}
                </Select>
                {/* {formik.errors && formik.errors.post_layout ? (
                  <FormError message={formik.errors.post_layout} />
                ) : (
                  ''
                )} */}
              </FormControl>
            </Grid>

            <Grid container item sx={{ marginY: 2 }}>
              <Suspense fallback={'LOADING...'}>
                <TiptapEditor
                  onChange={(val) =>
                    formik.setFieldValue('text_bottom', val, true)
                  }
                  value={formik.values.text_bottom}
                  height={150}
                  title={'Bottom Text'}
                />
              </Suspense>
              <Grid
                item
                xs={1}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <FormHelp text={``} />
              </Grid>
              {/* {formik.errors && formik.errors.post_content ? (
                <FormError message={formik.errors.post_content} />
              ) : (
                ''
              )} */}
            </Grid>

            <Grid item sx={{ marginY: 2 }} xs={11}>
              <Grid sx={{ marginY: 2 }} xs={12}>
                <Button
                  fullWidth
                  variant='contained'
                  color='secondary'
                  type='submit'
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </form>
    </div>
  );
};

export default AboutInfoForm;

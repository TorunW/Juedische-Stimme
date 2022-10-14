import React, { useState, useEffect, FC } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/admin/Forms.module.css';
import Image from 'next/image';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import menuTypes from 'lib/menuTypes.json';
import { uuidv4 } from '@firebase/util';
import { generateFileName } from 'helpers/generateFileName';
import * as Yup from 'yup';
import FormHelp from '../../atoms/FormHelp';
import FormError from '@/components/atoms/FormError';

import {
  Box,
  Button,
  Card,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';

interface MenuItemProps {
  menuItem?: any;
}

const MenuItemForm: FC<MenuItemProps> = ({ menuItem }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageFile, setPreviewImageFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      term_id: menuItem ? menuItem.term_id : '',
      taxonomy: menuItem ? menuItem.taxonomy : '',
      previousTaxonomy: menuItem ? menuItem.taxonomy : '',
      title: menuItem ? menuItem.title : '',
      link: menuItem ? menuItem.link : '',
      term_order: menuItem ? menuItem.term_order : '',
      term_image: menuItem ? menuItem.term_image : '',
    },
    validationSchema: Yup.object().shape({
      taxonomy: Yup.string().required('Choose a menu'),
      title: Yup.string().min(2).required('Add a title'),
      link: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values, ' values ');
      let requestsArray = [];

      const menuItemUrl = `/api/menus${menuItem ? '/' + menuItem.term_id : ''}`;
      const menuItemData = {
        ...values,
      };
      const menuItemRequest = menuItem
        ? axios.put(menuItemUrl, menuItemData)
        : axios.post(menuItemUrl, menuItemData);
      requestsArray.push(menuItemRequest);

      if (previewImageFile !== null) {
        // POST IMAGE FILE ( FILE UPLOAD )
        const config = {
          headers: { 'content-type': 'multipart/form-data' },
          onUploadProgress: (event) => {
            console.log(
              `Current progress:`,
              Math.round((event.loaded * 100) / event.total)
            );
          },
        };
        const formData = new FormData();
        formData.append('theFiles', previewImageFile, values.term_image);
        const termImageFileRequest = axios.post(
          '/api/uploads',
          formData,
          config
        );
        requestsArray.push(termImageFileRequest);

        if (menuItem && menuItem.term_image) {
          const deleteFileUrl = `http://${window.location.hostname}${
            window.location.port !== '80' ? ':' + window.location.port : ''
          }/media/${menuItem.term_image.split('/').join('+++')}`;
          const deleteFileRequest = axios.delete(deleteFileUrl);
          requestsArray.push(deleteFileRequest);
        }
      }

      axios
        .all([...requestsArray])
        .then(
          axios.spread((...responses) => {
            console.log(responses, ' RESPONSES');
            if (menuItem) window.location.reload();
            else
              window.location.href = `/admin/menus/${responses[0].data.insertId}`;
          })
        )
        .catch((errors) => {
          console.log(errors, ' ERRORS');
        });

      // axios({
      //     method: menuItem ? 'put' : 'post',
      //     url: `/api/menus${menuItem ? "/" + menuItem.term_id : ''}`,
      //     data: {
      //         ...values
      //     }
      // }).then((response) => {
      //     console.log(response,"response on menuItem (put or post)");
      //     window.location.href = '/admin/menus'
      // }, (error) => {
      //     console.log(error, "ERROR on post / put menuItem");
      // });
    },
  });

  function onTermImageChange(event) {
    // read file as data uri for preview, upload it on onSubmit

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setPreviewImage(reader.result);
      },
      false
    );

    if (file) {
      setPreviewImageFile(file);
      let fileType = file.name.split('.')[file.name.split.length - 1];
      let fileName =
        file.name.split(`.${fileType}`)[0] + `__${uuidv4()}.${fileType}`;
      formik.setFieldValue('term_image', generateFileName(fileName), true);
      reader.readAsDataURL(file);
    }
  }

  function linkInputValue(value) {
    const string = value;
    let newString;

    if (
      string.includes('https://juedische-stimme.com') === true ||
      string.includes('https://juedische-stimme.de') === true
    ) {
      return (newString = string.split('/')[3]);
    } else {
      return (newString = string);
    }
  }

  console.log(menuTypes);

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            paddingX: 4,
            paddingY: 2,
          }}
        >
          <Grid container spacing={2} display='flex' alignItems={'center'}>
            <Grid item xs={11}>
              <FormControl fullWidth margin='normal'>
                <InputLabel>Choose a Menu</InputLabel>
                <Select
                  id='taxonomy'
                  name='taxonomy'
                  label='Choose Menu'
                  value={formik.values.taxonomy}
                  onChange={formik.handleChange}
                >
                  {menuTypes.map((mt, index) => (
                    <MenuItem
                      key={index + Date.now()}
                      value={mt}
                      sx={{ textTransform: 'capitalize' }}
                    >
                      {mt.split('_').join(' ')}
                    </MenuItem>
                  ))}
                </Select>
                {formik.errors && formik.errors.taxonomy ? (
                  <FormError message={formik.errors.taxonomy} />
                ) : (
                  ''
                )}
              </FormControl>
            </Grid>
            <Grid xs={1} display='flex' justifyContent={'flex-end'}>
              <FormHelp text='Choose a menu, to which you want to add a new Menu Item.' />
            </Grid>
            <Grid item xs={11}>
              <FormControl fullWidth margin='normal'>
                <TextField
                  id='title'
                  label='Name'
                  focused
                  name='title'
                  type='title'
                  placeholder='Menu Item Name...'
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {formik.errors && formik.errors.title ? (
                  <FormError message={formik.errors.title} />
                ) : (
                  ''
                )}
              </FormControl>
            </Grid>
            <Grid xs={1} display='flex' justifyContent={'flex-end'}>
              <FormHelp text='' />
            </Grid>
            <Grid item xs={11}>
              <FormControl fullWidth margin='normal'>
                <TextField
                  id='link'
                  label='Link'
                  focused
                  name='link'
                  type='link'
                  placeholder='Menu Item link...'
                  onChange={formik.handleChange}
                  value={linkInputValue(formik.values.link)}
                />
                {formik.errors && formik.errors.link ? (
                  <FormError message={formik.errors.link} />
                ) : (
                  ''
                )}
              </FormControl>
            </Grid>
            <Grid xs={1} display='flex' justifyContent={'flex-end'}>
              <FormHelp text={``} />
            </Grid>
            <Grid item xs={11}>
              <FormControl fullWidth margin='normal'>
                <TextField
                  id='term_order'
                  label='Order'
                  focused
                  name='term_order'
                  type='term_order'
                  placeholder='Menu Item Order...'
                  onChange={formik.handleChange}
                  value={formik.values.term_order}
                />
              </FormControl>
            </Grid>
            <Grid xs={1} display='flex' justifyContent={'flex-end'}>
              <FormHelp text='Here you can decide where in the menu this item will appear. If not choosen, the item will appear last in order' />
            </Grid>

            {formik.values.taxonomy === 'partner_menu' ? (
              <Grid container item>
                <Grid
                  container
                  item
                  xs={11}
                  sx={{
                    height: '215px',
                    position: 'relative',
                  }}
                >
                  <TextField
                    label='Logo'
                    focused
                    multiline
                    minRows={8}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                    }}
                  />
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{
                      width: '200px',
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%,-50%)',
                    }}
                  >
                    Upload an image
                  </Button>
                  {previewImage !== null ? (
                    <Grid xs={10} sx={{ marginTop: 2, textAlign: 'center' }}>
                      <Image
                        layout='fixed'
                        width={320}
                        height={180}
                        src={previewImage}
                      />
                    </Grid>
                  ) : menuItem && menuItem.term_image ? (
                    <Grid xs={10} sx={{ marginTop: 2, textAlign: 'center' }}>
                      <Image
                        layout='fixed'
                        width={320}
                        height={180}
                        src={generateImageUrl(menuItem.term_image)}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}

                  <input
                    id='term_image'
                    name='term_image'
                    type='file'
                    onChange={onTermImageChange}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      cursor: 'pointer',
                      background: 'blue',
                      height: '215px',
                      opacity: 0,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormHelp text={``} />
                </Grid>
                {/* {formik.errors && formik.errors.post_image ? (
                  <FormError message={formik.errors.post_image} />
                ) : (
                  ''
                )} */}
              </Grid>
            ) : (
              ''
            )}
            <Grid item xs={12}>
              <Button type='submit' variant='contained' color='secondary'>
                {' '}
                {menuItem ? 'update menu item' : 'create menu item'}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default MenuItemForm;

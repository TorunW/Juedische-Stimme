import React, { useState, Suspense, ReactElement, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch, useSelector } from 'store/hooks';
import { v4 as uuidv4 } from 'uuid';
import { generateFileName } from 'helpers/generateFileName';
import { generateImageUrl } from 'helpers/imageUrlHelper';
import { GeneratePostUrl } from 'helpers/generatePostUrl';
import dateTimeHelper from 'helpers/dateTimeHelper';
import PostTagForm from './PostTagForm';
import PostTranslations from './PostTranslations';
import FormHelp from '../../atoms/FormHelp';
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

const TipTapEditor = dynamic(() => import('components/tiptap/TipTapEditor'), {
  suspense: true,
  loading: () => <CircularProgress color='secondary' />,
});

interface PostFormProps {
  post?: any;
  nextPostId?: string | number;
  categories?: any[];
}

const PostForm = ({ post, nextPostId }: PostFormProps) => {
  const tabs = ['post', 'translations'];

  const { categories } = useSelector((state) => state.categories);
  const { loggedUser } = useSelector((state) => state.users);

  const { locales, defaultLocale } = useSelector((state) => state.languages);

  const [currentTab, setCurrentTab] = useState('post');
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageFile, setPreviewImageFile] = useState(null);

  const [previewImage2, setPreviewImage2] = useState(null);
  const [previewImage2File, setPreviewImage2File] = useState(null);

  console.log(post);
  useEffect(() => {}, []);

  const formik = useFormik({
    initialValues: {
      post_author: post
        ? post.post_author
        : loggedUser !== null
        ? loggedUser.ID
        : '', // '' --> CHANGE THIS BACK!!!!,
      post_date: post ? post.post_date : '',
      post_date_gmt: post ? post.post_date_gmt : '',
      post_content: post
        ? post.post_content.replace(/(?:\r\n|\r|\n)/g, '<br>')
        : '',
      post_content_2:
        post && post.post_content_2 !== null
          ? post.post_content_2.replace(/(?:\r\n|\r|\n)/g, '<br>')
          : '',
      post_title: post ? post.post_title : '',
      post_excerpt: post ? post.post_excerpt : '',
      post_excerpt_2: post ? post.post_excerpt_2 : '',
      post_status: post ? post.post_status : 'draft',
      ping_status: post ? post.ping_status : '',
      post_password: post ? post.post_password : '',
      post_name: post ? post.post_name : '',
      to_ping: post ? post.to_ping : '',
      pinged: post ? post.pinged : '',
      post_modified: post ? post.post_modified : '',
      post_modified_gmt: post ? post.post_modified_gmt : '',
      post_content_filtered: post ? post.post_content_filtered : '',
      post_parent: post ? post.post_parent : '',
      guid: post ? post.guid : '',
      menu_order: post ? post.menu_order : '',
      post_type: post ? post.post_type : '',
      post_mime_type: post ? post.post_mime_type : '',
      categoryId: post ? post.categoryId : 2,
      post_image: post ? post.post_image : '',
      post_image_2: post ? post.post_image_2 : '',
      post_embed_script: post ? post.post_embed_script : '',
      post_embed_html: post ? post.post_embed_html : '',
      post_layout: post ? (post.post_layout ? post.post_layout : 'legacy') : '',
    },
    validationSchema: Yup.object().shape({
      categoryId: Yup.number().when('post_type', {
        is: 'post',
        then: Yup.number().required('Choose a category'),
      }),
      post_layout: Yup.string().when('post_type', {
        is: 'post',
        then: Yup.string().min(2).required('Choose a layout for the post'),
      }),
      post_title: Yup.string().min(3).required('Add a title to the post'),
      post_image: Yup.string().when('post_type', {
        is: 'post',
        then: Yup.string().required('Add an Image'),
      }),
      post_excerpt: Yup.string().when('post_type', {
        is: 'post',
        then: Yup.string()
          .min(160)
          .max(200)
          .required('Add an excerpt from the Post'),
      }),
      post_excerpt_2: Yup.string().when('post_type', {
        is: 'post',
        then: Yup.string().min(160).max(200),
      }),
      post_content: Yup.string()
        .min(700)
        .max(900)
        .required('Add some text to the post'),
    }),

    onSubmit: (values) => {
      const requestsArray = [];

      let postAuthor = post ? post.post_author : loggedUser.ID;

      // POST
      const postUrl = `/api/posts${post ? '/' + post.postId : ''}`;
      const postData = {
        ...values,
        post_date: post ? post.post_date : dateTimeHelper(new Date()),
        // post_date_gmt: like post_date but one hour less
        post_name: values.post_title
          .replace(/\s+/g, '-')
          .toLowerCase()
          .replace(),
        post_modified: dateTimeHelper(new Date()),
        previousCategoryId: post ? post.categoryId : null,
        post_content: values.post_content.replaceAll(`'`, `"`),
        nextPostId,
        post_author: postAuthor,
      };
      console.log(postData);
      const postRequest = post
        ? axios.put(postUrl, postData)
        : axios.post(postUrl, postData);
      requestsArray.push(postRequest);

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

      if (previewImageFile !== null) {
        if (post) {
          if (post.post_image && post.post_image !== null) {
            const deleteFileUrl = `http://${window.location.hostname}${
              window.location.port !== '80' ? ':' + window.location.port : ''
            }/media/${post.post_image.split('/').join('+++')}`;
            const deleteFileRequest = axios.delete(deleteFileUrl);
            requestsArray.push(deleteFileRequest);
          }
        }
        let fileType =
          previewImageFile.name.split('.')[
            previewImageFile.name.split.length - 1
          ];
        let fileName =
          previewImageFile.name.split(`.${fileType}`)[0] +
          `__${uuidv4()}.${fileType}`;
        const postImageUrl = `/api/posts/${
          post ? +post.postId : nextPostId
        }/image`;
        const postImageData = {
          meta_value: generateFileName(fileName),
          image_number: 1,
        };
        const postImageRequest =
          post && post.post_image
            ? axios.put(postImageUrl, postImageData)
            : axios.post(postImageUrl, postImageData);
        requestsArray.push(postImageRequest);
        const formData = new FormData();
        formData.append('theFiles', previewImageFile, fileName);
        const postImageFileRequest = axios.post(
          '/api/uploads',
          formData,
          config
        );
        requestsArray.push(postImageFileRequest);
      }

      if (previewImage2File !== null) {
        if (post) {
          if (post.post_image_2 && post.post_image_2 !== null) {
            const deleteFileUrl = `http://${window.location.hostname}${
              window.location.port !== '80' ? ':' + window.location.port : ''
            }/media/${post.post_image_2.split('/').join('+++')}`;
            const deleteFileRequest = axios.delete(deleteFileUrl);
            requestsArray.push(deleteFileRequest);
          }
        }
        let fileType =
          previewImage2File.name.split('.')[
            previewImage2File.name.split.length - 1
          ];
        let fileName =
          previewImage2File.name.split(`.${fileType}`)[0] +
          `__${uuidv4()}.${fileType}`;
        const postImageUrl = `/api/posts/${
          post ? +post.postId : nextPostId
        }/image`;
        const postImageData = {
          meta_value: generateFileName(fileName),
          image_number: 2,
        };
        const postImageRequest =
          post && post.post_image_2
            ? axios.put(postImageUrl, postImageData)
            : axios.post(postImageUrl, postImageData);
        requestsArray.push(postImageRequest);
        const formData = new FormData();
        formData.append('theFiles', previewImage2File, fileName);
        const postImageFileRequest = axios.post(
          '/api/uploads',
          formData,
          config
        );
        requestsArray.push(postImageFileRequest);
      }

      axios
        .all([...requestsArray])
        .then(
          axios.spread((...responses) => {
            console.log(responses, ' RESPONSES');
            window.location.href = `/admin/posts/${values.post_title
              .replace(/\s+/g, '-')
              .toLowerCase()
              .replace()
              .replaceAll('#', ':__--__:')}`;
          })
        )
        .catch((errors) => {
          console.log(errors, ' ERRORS');
        });
    },
  });

  function onPostImageChange(event) {
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
      reader.readAsDataURL(file);
    }
  }

  function onPostImage2Change(event) {
    // read file as data uri for preview, upload it on onSubmit
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        setPreviewImage2(reader.result);
      },
      false
    );
    if (file) {
      setPreviewImage2File(file);
      reader.readAsDataURL(file);
    }
  }

  let selectCategoriesDisplay: ReactElement[];
  if (categories) {
    selectCategoriesDisplay = categories.map((category, index) => (
      <MenuItem key={Date.now() + index} value={category.term_id}>
        {category.name}
      </MenuItem>
    ));
  }

  let formDisplay: ReactElement;
  if (currentTab === 'post') {
    formDisplay = (
      <div id='post-form'>
        <form onSubmit={formik.handleSubmit}>
          <Card
            sx={{
              paddingLeft: 4,
              paddingRight: 2,
              paddingY: 2,
            }}
          >
            <Grid container spacing={2} display='flex' alignItems={'center'}>
              <Grid item xs={11}>
                <FormControl fullWidth margin='normal'>
                  {post ? (
                    <Button variant='outlined'>
                      <a
                        target={'_blank'}
                        rel='noreferrer'
                        href={'/' + GeneratePostUrl(post.post_name)}
                      >
                        View Post in Livemode
                      </a>
                    </Button>
                  ) : (
                    ''
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel>Category</InputLabel>
                  <Select
                    id='categoryId'
                    name='categoryId'
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    label='Post Category'
                  >
                    {selectCategoriesDisplay}
                  </Select>
                  {formik.errors && formik.errors.categoryId ? (
                    <FormError message={formik.errors.categoryId} />
                  ) : (
                    ''
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel>Layout</InputLabel>
                  <Select
                    id='post_layout'
                    name='post_layout'
                    label='Post Layout'
                    value={formik.values.post_layout}
                    onChange={formik.handleChange}
                    placeholder='Layout'
                  >
                    <MenuItem value={'article'}>Article</MenuItem>
                    <MenuItem value={'newsletter'}>Newsletter</MenuItem>
                    <MenuItem value={'legacy'}>Legacy</MenuItem>
                    {/* <MenuItem value={'member_form'}>Membership Page</MenuItem> */}
                    {/* <MenuItem value={'donation'}>Donation Page</MenuItem> */}
                  </Select>
                  {formik.errors && formik.errors.post_layout ? (
                    <FormError message={formik.errors.post_layout} />
                  ) : (
                    ''
                  )}
                </FormControl>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <FormHelp text={``} />
              </Grid>
              <Grid item container xs={11}>
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <TextField
                    id='post_title'
                    name='post_title'
                    label='Title'
                    margin='normal'
                    focused
                    placeholder='Title'
                    onChange={formik.handleChange}
                    value={formik.values.post_title}
                  />
                  {formik.errors && formik.errors.post_title ? (
                    <FormError message={formik.errors.post_title} />
                  ) : (
                    ''
                  )}
                </FormControl>
              </Grid>

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
                    label='Post Header Image'
                    focused
                    multiline
                    minRows={8}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                    }}
                  />
                  <Button
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
                    <Grid xs={11} sx={{ marginTop: 2, textAlign: 'center' }}>
                      <Image
                        layout='fixed'
                        width={320}
                        height={180}
                        src={previewImage}
                      />
                    </Grid>
                  ) : post && post.post_image ? (
                    <Grid xs={11} sx={{ marginTop: 2, textAlign: 'center' }}>
                      <Image
                        layout='fixed'
                        width={320}
                        height={180}
                        src={generateImageUrl(post.post_image)}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}
                  <input
                    id='post_image'
                    name='post_image'
                    type='file'
                    onChange={onPostImageChange}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      cursor: 'pointer',
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
                {formik.errors && formik.errors.post_image ? (
                  <FormError message={formik.errors.post_image} />
                ) : (
                  ''
                )}
              </Grid>

              <Grid container item sx={{ marginY: 2 }}>
                <Suspense>
                  <TipTapEditor
                    onChange={(val: string) =>
                      formik.setFieldValue('post_excerpt', val, true)
                    }
                    value={formik.values.post_excerpt}
                    itemType={'post'}
                    itemId={post ? post.postId : nextPostId}
                    height={150}
                    title={'Post Excerp/Quote'}
                  />
                </Suspense>
                {formik.errors && formik.errors.post_excerpt ? (
                  <FormError message={formik.errors.post_excerpt} />
                ) : (
                  ''
                )}
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormHelp text={``} />
                </Grid>
              </Grid>

              <Grid container item sx={{ marginY: 2 }}>
                <Suspense>
                  <TipTapEditor
                    onChange={(val: string) =>
                      formik.setFieldValue('post_content', val, true)
                    }
                    value={formik.values.post_content}
                    itemType={'post'}
                    itemId={post ? post.postId : nextPostId}
                    height={150}
                    title={'Post top content'}
                  />
                </Suspense>
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormHelp text={``} />
                </Grid>
                {formik.errors && formik.errors.post_content ? (
                  <FormError message={formik.errors.post_content} />
                ) : (
                  ''
                )}
              </Grid>

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
                    label='Post Header Image'
                    focused
                    multiline
                    minRows={8}
                    sx={{
                      position: 'absolute',
                      width: '100%',
                    }}
                  />
                  <Button
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
                  {previewImage2 !== null ? (
                    <Grid xs={11} sx={{ marginTop: 2, textAlign: 'center' }}>
                      <Image
                        layout='fixed'
                        width={320}
                        height={180}
                        src={previewImage2}
                      />
                    </Grid>
                  ) : post && post.post_image_2 ? (
                    <Grid xs={10} sx={{ marginTop: 2, textAlign: 'center' }}>
                      <Image
                        layout='fixed'
                        width={320}
                        height={180}
                        src={generateImageUrl(post.post_image_2)}
                      />
                    </Grid>
                  ) : (
                    ''
                  )}

                  <input
                    id='post_image_2'
                    name='post_image_2'
                    type='file'
                    onChange={onPostImage2Change}
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
                {formik.errors && formik.errors.post_image ? (
                  <FormError message={formik.errors.post_image} />
                ) : (
                  ''
                )}
              </Grid>

              <Grid container item sx={{ marginY: 2 }}>
                <Suspense>
                  <TipTapEditor
                    onChange={(val: string) =>
                      formik.setFieldValue('post_excerpt_2', val, true)
                    }
                    value={formik.values.post_excerpt_2}
                    itemType={'post'}
                    itemId={post ? post.postId : nextPostId}
                    height={150}
                    title={'Second post excerpt'}
                  />
                </Suspense>
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormHelp text={``} />
                </Grid>
              </Grid>

              <Grid container item sx={{ marginY: 2 }}>
                <Suspense>
                  <TipTapEditor
                    onChange={(val: string) =>
                      formik.setFieldValue('post_content_2', val, true)
                    }
                    value={formik.values.post_content_2}
                    itemType={'post'}
                    itemId={post ? post.postId : nextPostId}
                    height={150}
                    title={'Bottom Post Content'}
                  />
                </Suspense>
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormHelp text={``} />
                </Grid>
              </Grid>

              <PostTagForm postId={post ? post.postId : nextPostId} />
              <Grid item sx={{ marginY: 2 }} xs={11}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel>Post Status</InputLabel>
                  <Select
                    id='post_status'
                    name='post_status'
                    label='Post Status'
                    value={formik.values.post_status}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'publish'}>Publish post</MenuItem>
                    <MenuItem value={'draft'}>Save to drafts</MenuItem>
                  </Select>
                </FormControl>
                <Grid sx={{ marginY: 2 }} xs={12}>
                  <Button
                    fullWidth
                    variant='contained'
                    color='secondary'
                    type='submit'
                  >
                    {post ? 'update post' : 'create post'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </form>
      </div>
    );
    if (
      (post && post.post_layout === 'donation') ||
      (post && post.post_layout === 'member_form')
    ) {
      formDisplay = (
        <div id='post-form'>
          <form onSubmit={formik.handleSubmit}>
            <Card
              sx={{
                paddingX: 4,
                paddingY: 2,
              }}
            >
              <FormControl fullWidth margin='normal'>
                {post ? (
                  <Button variant='outlined'>
                    <a
                      target={'_blank'}
                      rel='noreferrer'
                      href={'/' + GeneratePostUrl(post.post_name)}
                    >
                      view on live site
                    </a>
                  </Button>
                ) : (
                  ''
                )}
              </FormControl>
              <Grid item container xs={11}>
                <FormControl fullWidth sx={{ marginBottom: 4 }}>
                  <TextField
                    id='post_title'
                    name='post_title'
                    label='Title'
                    margin='normal'
                    focused
                    placeholder='Title'
                    onChange={formik.handleChange}
                    value={formik.values.post_title}
                  />
                  {formik.errors && formik.errors.post_title ? (
                    <FormError message={formik.errors.post_title} />
                  ) : (
                    ''
                  )}
                </FormControl>
              </Grid>
              <Grid container item sx={{ marginY: 2 }}>
                <Suspense>
                  <TipTapEditor
                    onChange={(val: string) =>
                      formik.setFieldValue('post_content', val, true)
                    }
                    value={formik.values.post_content}
                    itemType={'post'}
                    itemId={post ? post.postId : nextPostId}
                    height={150}
                    title={'Page content'}
                  />
                </Suspense>
                <Grid
                  item
                  xs={1}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <FormHelp text={``} />
                </Grid>
                {formik.errors && formik.errors.post_content ? (
                  <FormError message={formik.errors.post_content} />
                ) : (
                  ''
                )}
              </Grid>
              <Button variant='outlined' type='submit'>
                update page
              </Button>
            </Card>
          </form>
        </div>
      );
    }
  } else if (currentTab === 'translations') {
    formDisplay = (
      <PostTranslations
        post={post}
        locales={locales}
        defaultLocale={defaultLocale}
      />
    );
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  let tabMenuDisplay: ReactElement;
  if (post) {
    const tabMenu: ReactElement[] = tabs.map((tab, index) => {
      return <Tab key={Date.now() + index} value={tab} label={tab} />;
    });
    tabMenuDisplay = (
      <>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor='disabled'
          indicatorColor='secondary'
          TabIndicatorProps={{
            style: {
              height: '4px',
            },
          }}
        >
          {tabMenu}
        </Tabs>
      </>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <AdminTopBar tabs={tabMenuDisplay} />
      <Box>{formDisplay}</Box>
    </Box>
  );
};

export default PostForm;

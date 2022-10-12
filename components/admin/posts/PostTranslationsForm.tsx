import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Form, useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/admin/Forms.module.css';
import FormError from '@/components/atoms/FormError';
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

const TipTapEditor = dynamic(() => import('components/tiptap/TipTapEditor'), {
  suspense: true,
  loading: () => <p>Loading...</p>,
});

const PostTranslationsForm = ({ post, language }) => {
  const formik = useFormik({
    initialValues: {
      language,
      post_id: post.postId,
      title: post[`post_title_translation_${language}`]
        ? post[`post_title_translation_${language}`]
        : '',
      content: post[`post_content_translation_${language}`]
        ? post[`post_content_translation_${language}`]
        : '',
      excerpt: post[`post_excerpt_translation_${language}`]
        ? post[`post_excerpt_translation_${language}`]
        : '',
      content_2: post[`post_content_2_translation_${language}`]
        ? post[`post_content_2_translation_${language}`]
        : '',
      excerpt_2: post[`post_excerpt_2_translation_${language}`]
        ? post[`post_excerpt_2_translation_${language}`]
        : '',
    },
    onSubmit: (values) => {
      axios({
        method: post[`post_title_translation_${language}`] ? 'put' : 'post',
        url: `/api/posts/${post.postId}/translation`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, 'response on translation (put or post)');
          window.location.reload();
        },
        (error) => {
          console.log(error, 'ERROR on post / put translation');
        }
      );
    },
  });

  const { errors } = formik;

  let postTranslationsFormDisplay;
  if (
    (post && post.post_layout === 'donation') ||
    (post && post.post_layout === 'member_form')
  ) {
    postTranslationsFormDisplay = (
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>Post Title ({language})</label>
        <input
          id={'title'}
          name={'title'}
          type='text'
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {errors && errors.title ? <FormError message={errors.title} /> : ''}

        <Suspense fallback={'LOADING...'}>
          <TipTapEditor
            onChange={(val) => formik.setFieldValue('content', val, true)}
            value={formik.values.content}
            itemType={'post'}
            itemId={post.postId}
            title={`Post Content ${language}`}
          />
        </Suspense>
        {errors && errors.content ? <FormError message={errors.content} /> : ''}

        <Button type='submit'>Submit</Button>
      </form>
    );
  } else {
    postTranslationsFormDisplay = (
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Grid container item xs={11}>
          <FormControl fullWidth margin='normal'>
            <TextField
              id={'title'}
              name={'title'}
              label={`Post Title ${language}`}
              margin='normal'
              focused
              placeholder='Title'
              onChange={formik.handleChange}
              value={formik.values.title}
            />

            {errors && errors.title ? <FormError message={errors.title} /> : ''}
          </FormControl>
        </Grid>

        <FormControl fullWidth margin='normal'>
          <Suspense>
            <TipTapEditor
              onChange={(val: string) =>
                formik.setFieldValue('excerpt', val, true)
              }
              value={formik.values.excerpt}
              itemType={'post'}
              itemId={post.postId}
              height={150}
              title={`Post EXCERPT ${language}`}
            />
          </Suspense>
          {errors && errors.excerpt ? (
            <FormError message={errors.excerpt} />
          ) : (
            ''
          )}
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <Suspense fallback={'LOADING...'}>
            <TipTapEditor
              onChange={(val) => formik.setFieldValue('content', val, true)}
              value={formik.values.content}
              itemType={'post'}
              itemId={post.postId}
              title={`Post Content ${language}`}
            />
          </Suspense>
          {errors && errors.content ? (
            <FormError message={errors.content} />
          ) : (
            ''
          )}
        </FormControl>

        <FormControl fullWidth margin='normal'>
          <Suspense>
            <TipTapEditor
              onChange={(val: string) =>
                formik.setFieldValue('excerpt_2', val, true)
              }
              value={formik.values.excerpt_2}
              itemType={'post'}
              itemId={post.postId}
              height={150}
              title={`Second post excerpt ${language}`}
            />
          </Suspense>
          {errors && errors.excerpt_2 ? (
            <FormError message={errors.excerpt_2} />
          ) : (
            ''
          )}
        </FormControl>
        <FormControl fullWidth margin='normal'>
          <Suspense fallback={'LOADING...'}>
            <TipTapEditor
              onChange={(val) => formik.setFieldValue('content_2', val, true)}
              value={formik.values.content_2}
              itemType={'post'}
              itemId={post.postId}
              title={`Second Post Content ${language}`}
            />
          </Suspense>
          {errors && errors.content_2 ? (
            <FormError message={errors.content_2} />
          ) : (
            ''
          )}
        </FormControl>
        <Grid xs={11} sx={{ marginY: 3 }}>
          <Button color='secondary' fullWidth variant='contained' type='submit'>
            Submit Translation
          </Button>
        </Grid>
      </form>
    );
  }
  return <>{postTranslationsFormDisplay}</>;
};

export default PostTranslationsForm;

import React, { FC, Suspense } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import styles from 'components/admin/Forms.module.css';
import dynamic from 'next/dynamic';
import { Tag } from 'types/Tag.type';
import {
  Card,
  Button,
  FormControl,
  TextField,
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import FormError from '@/components/atoms/FormError';
import FormHelp from '../atoms/FormHelp';

const DynamicTiptapEditor = dynamic(() => import('../tiptap/TipTapEditor'), {
  suspense: true,
});

interface TagFormProps {
  tag?: Tag;
}

const TagForm: FC<TagFormProps> = ({ tag }) => {
  const formik = useFormik({
    initialValues: {
      term_id: tag ? tag.term_id : '',
      name: tag ? tag.name : '',
      slug: tag ? tag.slug : '',
      description: tag ? tag.description : '',
      count: tag ? tag.count : '',
    },
    onSubmit: (values) => {
      // console.log(values)
      axios({
        method: tag ? 'put' : 'post',
        url: `/api/tags/tag/${tag ? '/' + tag.term_id : ''}`,
        data: {
          ...values,
          slug: values.name.toLowerCase().split(' ').join('-'),
        },
      }).then(
        (response) => {
          console.log(response, 'response on tag (put or post)');
          if (tag) window.location.href = `/admin/tags/${tag.term_id}`;
          else window.location.href = `/admin/tags`;
        },
        (error) => {
          console.log(error, 'ERROR on post / put tag');
        }
      );
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            paddingLeft: 4,
            paddingRight: 2,
            paddingY: 2,
          }}
        >
          <Grid container spacing={2} display='flex' alignItems={'center'}>
            <Grid item container xs={11}>
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField
                  id='name'
                  name='name'
                  label='Tag Name'
                  margin='normal'
                  focused
                  placeholder='Tag Name'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </FormControl>
            </Grid>

            <Grid container item sx={{ marginY: 2 }}>
              <Suspense fallback={'LOADING...'}>
                <DynamicTiptapEditor
                  onChange={(val) =>
                    formik.setFieldValue('description', val, true)
                  }
                  value={formik.values.description}
                  height={150}
                  title={'Tag Description'}
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
            <Grid item sx={{ marginY: 2 }} xs={11}>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                type='submit'
              >
                {tag ? 'update tag' : 'create tag'}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </div>
  );
};

export default TagForm;

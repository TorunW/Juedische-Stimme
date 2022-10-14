import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormHelp from '../../atoms/FormHelp';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  FormControl,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  LinearProgress,
  Card,
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

const PostTagForm = (props) => {
  const [tags, setTags] = useState([]);
  const [tagNames, setTagNames] = useState(props.tagNames);
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  useEffect(() => {
    getPostTags();
  }, []);

  useEffect(() => {
    if (tags) {
      let newTagNames = '';
      tags.forEach(function (tag, index) {
        if (newTagNames.length === 0) newTagNames = tag.name;
        else newTagNames += `,${tag.name}`;
      });
      setTagNames(newTagNames);
    }
  }, [tags]);

  useEffect(() => {
    setSuggestedTags([]);
    if (searchPhrase.length >= 3) {
      getTagsBySearchPhrase();
    }
  }, [searchPhrase]);

  async function getPostTags() {
    const res = await fetch(`/api/tags/${props.postId}`);
    const data = await res.json();
    setTags(data);
  }

  async function getTagsBySearchPhrase() {
    const res = await fetch(`/api/tags/search/${searchPhrase}`);
    const data = await res.json();
    setSuggestedTags(data);
  }

  async function createNewTag() {
    console.log(searchPhrase);

    const values = {
      name: searchPhrase,
      slug: searchPhrase.toLowerCase().split(' ').join('-'),
    };
    console.log(values, ' VALUES ');
    axios({
      method: 'post',
      url: `/api/tags/${props.postId}`,
      data: {
        ...values,
      },
    }).then(
      (response) => {
        console.log(response, 'response on add tag to post');
        setSearchPhrase('');
        getPostTags();
      },
      (error) => {
        console.log(error, 'ERROR on add tag to post');
      }
    );
  }

  async function addTagToPost(tag, tagIndex) {
    axios({
      method: 'post',
      url: `/api/tags/${props.postId}/${tag.term_id}`,
    }).then(
      (response) => {
        console.log(response, 'response on add tag to post');
        setSearchPhrase('');
        getPostTags();
      },
      (error) => {
        console.log(error, 'ERROR on add tag to post');
      }
    );
  }

  async function removeTagFromPost(tag) {
    axios({
      method: 'delete',
      url: `/api/tags/${props.postId}/${tag.term_id}`,
    }).then(
      (response) => {
        console.log(response, 'response on remove tag from post');
        getPostTags();
      },
      (error) => {
        console.log(error, 'ERROR on remove tag from post');
      }
    );
  }

  let suggestedTagsDisplay, newTagDisplay;
  if (searchPhrase.length > 0) {
    if (searchPhrase.length < 2) {
      suggestedTagsDisplay = (
        <Grid item xs={11}>
          <Box sx={{ width: 'auto', marginLeft: 3 }}>
            <LinearProgress color='secondary' />
          </Box>
        </Grid>
      );
    } else {
      newTagDisplay = (
        <a
          onClick={() => createNewTag()}
          title='Create new tag and add to post'
        >
          <Grid item spacing={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: 1,
                borderRadius: 10,
                paddingY: 1,
                paddingX: 2,
                minWidth: 100,
                '&:hover': { color: '#8179A6', cursor: 'pointer' },
              }}
            >
              {searchPhrase} <AddCircleOutlineIcon sx={{ marginLeft: 2 }} />
            </Box>
          </Grid>
        </a>
      );
      if (suggestedTags.length > 0) {
        suggestedTagsDisplay = suggestedTags.map((tag, index) => {
          // ONLY SHOW TAGS THAT THE POST DOESNT HAVE!
          if (!tagNames || tagNames.indexOf(tag.name) === -1) {
            return (
              <a key={tag.term_id} onClick={() => addTagToPost(tag, index)}>
                <Grid item spacing={2}>
                  <Box
                    title='Add tag to post'
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: 1,
                      borderRadius: 10,
                      paddingY: 1,
                      paddingX: 2,
                      marginX: 1,
                      minWidth: 100,

                      '&:hover': { color: '#8179A6', cursor: 'pointer' },
                    }}
                  >
                    {tag.name}
                    <CheckCircleOutlineIcon sx={{ marginLeft: 2 }} />
                  </Box>
                </Grid>
              </a>
            );
          }
        });
      }
    }
  }

  let tagsDisplay;
  if (tags) {
    tagsDisplay = tags.map((tag, index) => (
      <Grid item key={tag}>
        <Box
          key={tag.term_id}
          title='Remove tag from post'
          onClick={() => removeTagFromPost(tag)}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: 1,
            borderRadius: 10,
            paddingY: 1,
            paddingX: 2,
            minWidth: 100,

            '&:hover': { color: '#8179A6', cursor: 'pointer' },
          }}
        >
          {tag.name}
          <RemoveCircleOutlineIcon sx={{ marginLeft: 2 }} />
        </Box>
      </Grid>
    ));
  }

  return (
    <>
      <Grid container item spacing={2}>
        <Grid container item xs={11}>
          <h3>Tags</h3>
        </Grid>
        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormHelp
            text={`Use the field below to search for the tag you want to add to the post. 
            If the tag has a plus icon next to it it means that the tag doesn't exsist yet.
             Click anywhere in the container of the tag and it will be added to the post and to the list of exsisting tags.
             If the tag has a checkmark it means it does exists already, to use it for your post simply click on it.
             You can add several tags to your post, all added tags will appear under "Added tags:" to remove a tag simply click on it.`}
          />
        </Grid>
        <Grid container item xs={11}>
          <TextField
            fullWidth
            type='text'
            value={searchPhrase}
            label='Search or add a new tag'
            focused
            onChange={(e) => setSearchPhrase(e.target.value)}
            placeholder={'Search or add a new tag'}
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item sx={{ marginTop: 2, marginX: 3 }}>
          {newTagDisplay}
        </Grid>
        <Grid container sx={{ marginTop: 1, marginBottom: 2, marginX: 3 }}>
          {suggestedTagsDisplay}
        </Grid>
        <Grid item xs={12} sx={{ marginX: 2 }}>
          <h4>Added tags:</h4>
        </Grid>
        <Grid item container xs={11} spacing={2} sx={{ marginX: 0 }}>
          {tagsDisplay}
        </Grid>
      </Grid>
    </>
  );
};

export default PostTagForm;

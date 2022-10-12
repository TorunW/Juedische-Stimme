import React, { ReactElement, useState } from 'react';
import PostTranslationsForm from './PostTranslationsForm';
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

const PostTranslations = ({ locales, defaultLocale, post }) => {
  const languages = locales.filter((l: string) => l !== defaultLocale);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const translationFormsDisplay: ReactElement[] = languages.map(
    (l: string, index: number) => {
      if (l === selectedLanguage) {
        return (
          <div>
            <PostTranslationsForm post={post} language={l} />
          </div>
        );
      }
    }
  );

  let languagesDisplay = languages.map((l: string, index: number) => (
    <MenuItem key={Date.now() + index} value={l}>
      <a onClick={() => setSelectedLanguage(l)}>{l}</a>
    </MenuItem>
  ));

  return (
    <>
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
              <InputLabel>Languages</InputLabel>
              <Select
                id='language'
                name='language'
                label='Languages'
                placeholder='Languages'
              >
                {languagesDisplay}
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12}>
            <FormControl fullWidth margin='normal'>
              {translationFormsDisplay}
            </FormControl>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default PostTranslations;

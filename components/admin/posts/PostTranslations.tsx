import React, { ReactElement, useState } from "react";
import PostTranslationsForm from "./PostTranslationsForm";
import { Card, FormControl } from "@mui/material";
import Grid from "@mui/material/Grid";

const PostTranslations = ({ locales, defaultLocale, post }) => {
  const languages = locales.filter((l: string) => l !== defaultLocale);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const translationFormsDisplay: ReactElement[] = languages.map(
    (l: string, index: number) => {
      if (l === selectedLanguage) {
        return (
          <div>
            <PostTranslationsForm
              post={post}
              language={l}
            />
          </div>
        );
      }
    }
  );

  return (
    <>
      <Grid
        container
        spacing={2}
        display="flex"
        alignItems={"center"}
      >
        <Grid
          container
          item
          xs={12}
        >
          <FormControl
            fullWidth
            margin="normal"
          >
            {translationFormsDisplay}
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default PostTranslations;

import React, { FC, Suspense } from "react";
import { useFormik } from "formik";
import axios from "axios";
import dynamic from "next/dynamic";
import { Tag } from "types/Tag.type";
import { Card, Button, FormControl, TextField, Box } from "@mui/material";
import Grid from "@mui/material/Grid";

interface TagFormProps {
  tag?: Tag;
}

const TagForm: FC<TagFormProps> = ({ tag }) => {
  const formik = useFormik({
    initialValues: {
      term_id: tag ? tag.term_id : "",
      name: tag ? tag.name : "",
      slug: tag ? tag.slug : "",
      count: tag ? tag.count : "",
    },
    onSubmit: (values) => {
      axios({
        method: tag ? "put" : "post",
        url: `/api/tags/tag/${tag ? "/" + tag.term_id : ""}`,
        data: {
          ...values,
          slug: values.name.toLowerCase().split(" ").join("-"),
        },
      }).then(
        (response) => {
          console.log(response, "response on tag (put or post)");
          if (tag) window.location.href = `/admin/tags/${tag.term_id}`;
          else window.location.href = `/admin/tags`;
        },
        (error) => {
          console.log(error, "ERROR on post / put tag");
        }
      );
    },
  });

  return (
    <Box sx={{ maxWidth: "507px", margin: "0 auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <Card
          sx={{
            paddingLeft: 4,
            paddingRight: 2,
            paddingY: 2,
            margin: 2,
          }}
        >
          <Grid
            container
            spacing={2}
          >
            <FormControl
              fullWidth
              sx={{ marginBottom: 4 }}
            >
              <TextField
                id="name"
                name="name"
                label="Tag Name"
                margin="normal"
                focused
                placeholder="Tag Name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormControl>

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              {tag ? "update tag" : "create tag"}
            </Button>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default TagForm;

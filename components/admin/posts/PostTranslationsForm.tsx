import React from "react";
import { Form, useFormik } from "formik";
import axios from "axios";
import styles from "components/admin/Forms.module.css";
import FormError from "@/components/atoms/FormError";
import { Button, FormControl, TextField, Card } from "@mui/material";
import Grid from "@mui/material/Grid";

import TipTapEditor, { EditorHeight } from "components/tiptap/TipTapEditor";

const PostTranslationsForm = ({ post, language }) => {
  const formik = useFormik({
    initialValues: {
      language,
      post_id: post.postId,
      title: post[`post_title_translation_${language}`]
        ? post[`post_title_translation_${language}`]
        : "",
      content: post[`post_content_translation_${language}`]
        ? post[`post_content_translation_${language}`]
        : "",
      excerpt: post[`post_excerpt_translation_${language}`]
        ? post[`post_excerpt_translation_${language}`]
        : "",
      content_2: post[`post_content_2_translation_${language}`]
        ? post[`post_content_2_translation_${language}`]
        : "",
      excerpt_2: post[`post_excerpt_2_translation_${language}`]
        ? post[`post_excerpt_2_translation_${language}`]
        : "",
    },
    onSubmit: (values) => {
      axios({
        method: post[`post_title_translation_${language}`] ? "put" : "post",
        url: `/api/posts/${post.postId}/translation`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, "response on translation (put or post)");
          window.location.reload();
        },
        (error) => {
          console.log(error, "ERROR on post / put translation");
        }
      );
    },
  });

  const { errors } = formik;

  const isMinimalLayout =
    (post && post.post_layout === "donation") ||
    (post && post.post_layout === "member_form");

  return (
    <Card
      sx={{
        paddingX: 4,
        paddingY: 2,
        margin: 2,
      }}
    >
      <form
        className={styles.form}
        onSubmit={formik.handleSubmit}
      >
        <FormControl
          fullWidth
          sx={{ marginBottom: "16px" }}
        >
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Post Title (English)"
            margin="normal"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          {formik?.errors?.title ? (
            <FormError message={formik.errors.title} />
          ) : (
            ""
          )}
        </FormControl>

        {(post.post_layout === "article" ||
          post.post_layout === "newsletter") && (
          <FormControl
            fullWidth
            margin="normal"
          >
            <TipTapEditor
              onChange={(val: string) =>
                formik.setFieldValue("excerpt", val, true)
              }
              value={formik.values.excerpt}
              itemType={"post"}
              itemId={post.postId}
              height={EditorHeight.small}
              title={`Post Summary ( English )`}
              error={
                errors && errors.excerpt ? (
                  <FormError message={errors.excerpt} />
                ) : (
                  ""
                )
              }
            />
          </FormControl>
        )}

        <TipTapEditor
          onChange={(val) => formik.setFieldValue("content", val, true)}
          value={formik.values.content}
          itemType={"post"}
          itemId={post.postId}
          title={`Post Content ( English )`}
          height={EditorHeight.large}
        />
        {errors?.content ? <FormError message={errors.content} /> : ""}

        {!isMinimalLayout && (
          <>
            {(post.post_layout === "article" ||
              post.post_layout === "newsletter") && (
              <>
                <FormControl
                  fullWidth
                  margin="normal"
                >
                  <TipTapEditor
                    onChange={(val: string) =>
                      formik.setFieldValue("excerpt_2", val, true)
                    }
                    value={formik.values.excerpt_2}
                    itemType={"post"}
                    itemId={post.postId}
                    height={EditorHeight.small}
                    title={`Second Summary ( English )`}
                    error={
                      errors && errors.excerpt_2 ? (
                        <FormError message={errors.excerpt_2} />
                      ) : (
                        ""
                      )
                    }
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  margin="normal"
                >
                  <TipTapEditor
                    onChange={(val) =>
                      formik.setFieldValue("content_2", val, true)
                    }
                    height={EditorHeight.large}
                    value={formik.values.content_2}
                    itemType={"post"}
                    itemId={post.postId}
                    title={`Bottom Content ( English )`}
                    error={
                      errors && errors.content_2 ? (
                        <FormError message={errors.content_2} />
                      ) : (
                        ""
                      )
                    }
                  />
                </FormControl>
              </>
            )}

            <Grid
              xs={11}
              sx={{ marginY: 3 }}
            >
              <Button
                color="secondary"
                fullWidth
                variant="contained"
                type="submit"
              >
                Submit Translation
              </Button>
            </Grid>
          </>
        )}
      </form>
    </Card>
  );
};

export default PostTranslationsForm;

import React, { useState, Suspense, FC } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import Image from "next/image";
import { generateImageUrl } from "helpers/imageUrlHelper";
import { generateFileName } from "helpers/generateFileName";
import { uuidv4 } from "@firebase/util";
import FormError from "../atoms/FormError";
import { Button, Card, FormControl, Grid, TextField, Box } from "@mui/material";
import FormHelp from "../atoms/FormHelp";
import { Category } from "types/Category.type";

const DynamicTiptapEditor = dynamic(() => import("../tiptap/TipTapEditor"), {
  suspense: true,
});

interface TypeProps {
  category?: Category;
}

const CategoryForm: FC<TypeProps> = ({ category }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageFile, setPreviewImageFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: category ? category.name : "",
      description: category ? category.description : "",
      parent: category ? category.parent : "",
      count: category ? category.count : "",
      taxonomy: category ? category.taxonomy : "",
      term_group: category ? category.term_group : "",
      term_id: category ? category.term_id : "",
      term_taxonomy_id: category ? category.term_taxonomy_id : "",
      category_image: category ? category.category_image : "",
      hasImage: category && category.category_image !== null ? true : false,
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required!"),
    }),
    onSubmit: (values) => {
      const requestsArray = [];

      // POST IMAGE FILE ( FILE UPLOAD )
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          );
        },
      };

      let categoryImageFileName = null;
      if (previewImageFile !== null) {
        if (category) {
          if (category.category_image && category.category_image !== null) {
            const deleteFileUrl = `http://${window.location.hostname}${
              window.location.port !== "80" ? ":" + window.location.port : ""
            }/media/${category.category_image.split("/").join("+++")}`;
            const deleteFileRequest = axios.delete(deleteFileUrl);
            requestsArray.push(deleteFileRequest);
          }
        }
        let fileType =
          previewImageFile.name.split(".")[
            previewImageFile.name.split.length - 1
          ];
        categoryImageFileName =
          previewImageFile.name.split(`.${fileType}`)[0] +
          `__${uuidv4()}.${fileType}`;
        const formData = new FormData();
        formData.append("theFiles", previewImageFile, categoryImageFileName);
        const categoryImageFileRequest = axios.post(
          "/api/uploads",
          formData,
          config
        );
        requestsArray.push(categoryImageFileRequest);
      }

      const categoryRequest = axios({
        method: category ? "put" : "post",
        url: `/api/categories${category ? "/" + category.term_id : ""}`,
        data: {
          ...values,
          slug: values.name.split(" ").join("-").toLowerCase(),
          category_image: generateFileName(categoryImageFileName),
        },
      });

      requestsArray.push(categoryRequest);

      axios
        .all([...requestsArray])
        .then(
          axios.spread((...responses) => {
            let response = responses[responses.length - 1];
            console.log(response, "response on category (put or post)");
            if (response.data) {
              window.location.href = `/admin/categories/${
                category ? category.term_id : response.data.insertId
              }`;
            }
          })
        )
        .catch((errors) => {
          console.log(errors, " ERRORS");
        });
    },
  });

  function onCategoryImageChange(event) {
    // read file as data uri for preview, upload it on onSubmit
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        setPreviewImage(reader.result);
      },
      false
    );
    if (file) {
      setPreviewImageFile(file);
      //   formik.setFieldValue('category_image', generateFileName(file.name))
      reader.readAsDataURL(file);
    }
  }

  return (
    <Box sx={{ maxWidth: "1067px", margin: "0 auto" }}>
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
            display="flex"
            justifyContent="center"
          >
            <Grid
              item
              container
              xs={10}
            >
              <FormControl
                fullWidth
                sx={{ marginBottom: 1 }}
              >
                <TextField
                  id="name"
                  name="name"
                  label="Category Name"
                  margin="normal"
                  focused
                  placeholder="Category Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                {formik.errors && formik.errors.name ? (
                  <FormError message={formik.errors.name} />
                ) : (
                  ""
                )}
              </FormControl>
            </Grid>

            <Grid
              item
              xs={10}
              sx={{ marginY: 2 }}
            >
              <Suspense fallback={"LOADING..."}>
                <DynamicTiptapEditor
                  onChange={(val) =>
                    formik.setFieldValue("description", val, true)
                  }
                  value={formik.values.description}
                  height={150}
                  title={"Category Description"}
                />
              </Suspense>
            </Grid>

            <Grid
              item
              xs={10}
              sx={{
                height: "215px",
                position: "relative",
              }}
            >
              <TextField
                label="Post Header Image"
                focused
                multiline
                minRows={8}
                sx={{
                  position: "absolute",
                  width: "100%",
                }}
              />
              <Button
                sx={{
                  width: "200px",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              >
                Upload an image
              </Button>

              {previewImage !== null ? (
                <Grid
                  xs={10}
                  item
                  sx={{ marginTop: 2, textAlign: "center" }}
                >
                  <Image
                    layout="fixed"
                    width={320}
                    height={180}
                    src={previewImage}
                  />{" "}
                </Grid>
              ) : category && category.category_image ? (
                <Grid
                  item
                  xs={10}
                  sx={{ marginTop: 2, textAlign: "center" }}
                >
                  <Image
                    layout="fixed"
                    width={320}
                    height={180}
                    src={generateImageUrl(category.category_image)}
                  />
                </Grid>
              ) : (
                ""
              )}

              <input
                id="category_image"
                name="category_image"
                type="file"
                onChange={onCategoryImageChange}
                style={{
                  position: "absolute",
                  width: "100%",
                  cursor: "pointer",
                  background: "blue",
                  height: "215px",
                  opacity: 0,
                }}
              />
            </Grid>

            {/* {formik.errors && formik.errors.post_image ? (
                <FormError message={formik.errors.post_image} />
              ) : (
                ''
              )} */}
            <Grid
              item
              sx={{ marginY: 2 }}
              xs={10}
            >
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                {category ? "update category" : "create category"}
              </Button>
            </Grid>
          </Grid>
        </Card>
      </form>
    </Box>
  );
};

export default CategoryForm;

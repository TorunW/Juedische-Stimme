import React, { Suspense, useRef } from "react";
import dynamic from "next/dynamic";
import { useFormik } from "formik";
import axios from "axios";
import { generateFileName } from "helpers/generateFileName";
import { Box, Button, FormControl, TextField, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";

const TiptapEditor = dynamic(() => import("components/tiptap/TipTapEditor"), {
  suspense: true,
});

interface GalleryImageFormProps {
  galleryId: number | string;
  galleryImage?: any;
  handleSelectImage?: Function;
  isSelected?: boolean;
  galleryType?: string;
}

function GalleryImageForm({
  galleryId,
  galleryImage,
  handleSelectImage,
  isSelected,
  galleryType,
}: GalleryImageFormProps) {
  console.log(isSelected, "is sele");
  const fileInputRef: any = useRef();

  function onUpladImageClick() {
    fileInputRef.current.click();
  }

  const onImageInputChangeHanlder = (event) => {
    if (!event.target.files?.length) {
      return;
    }
    const formData = new FormData();
    let fileName = event.target.files[0].name;
    Array.from(event.target.files).forEach((file: string | Blob) => {
      console.log(event.target.name, file);
      formData.append(event.target.name, file);
    });
    uploadImage(formData, fileName);
    //   fileInputRef.current?.reset();
  };

  const uploadImage = async (formData, fileName) => {
    // UPLOAD THE FILE
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    const response = await axios.post("/api/uploads", formData, config);
    console.log(response, " RESPONSE OF UPLOAD");
    formik.setFieldValue("image_src", generateFileName(fileName));
  };

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      image_src: galleryImage ? galleryImage.image_src : "",
      image_title: galleryImage ? galleryImage.image_title : "",
      image_description: galleryImage ? galleryImage.image_description : "",
      image_gallery: galleryImage ? galleryImage.image_gallery : galleryId,
      image_order: galleryImage ? galleryImage.image_order : galleryImage,
    },
    onSubmit: (values) => {
      console.log(values, " VALJUES ON SUBMIT");

      axios({
        method: galleryImage ? "put" : "post",
        url: `/api/galleryimage${
          galleryImage ? "/" + galleryImage.image_id : ""
        }`,
        data: {
          ...values,
        },
      }).then(
        (response) => {
          console.log(response, "response on gallery image (put or post)");
          if (response.data) {
            console.log(response.data);
            // addImageToGallery({image_id: (galleryImage ? galleryImage.image_id : response.data.insertId ), ...values })
            window.location.href = `/admin/galleries/${values.image_gallery}`; // BETTER FETCH THE POSTS THEN REFRESH PAGE
          }
        },
        (error) => {
          console.log(error, "ERROR on gallery image");
        }
      );
    },
  });

  let imageDisplay;
  if (formik.values.image_src) {
    imageDisplay = (
      <img
        style={{ maxWidth: "100%" }}
        src={`/wp-content/uploads/${formik.values.image_src}`}
      />
    );
  }

  let galleryFormDisplay;
  if (galleryImage !== undefined) {
    galleryFormDisplay = (
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={galleryType === "list" ? 6 : 12}
            >
              {galleryType === "list" ? (
                <TextField
                  id="image_title"
                  label="Image Title"
                  type="text"
                  fullWidth
                  margin="normal"
                  onChange={formik.handleChange}
                  value={formik.values.image_title}
                />
              ) : null}
              <TextField
                id="image_order"
                label="Image Order"
                type="text"
                fullWidth
                margin="normal"
                onChange={formik.handleChange}
                value={formik.values.image_order}
              />
            </Grid>
            <Grid
              item
              xs={galleryType === "list" ? 6 : 12}
            >
              <FormControl
                margin="normal"
                // fullWidth
              >
                {imageDisplay}
              </FormControl>
              <FormControl
                margin="normal"
                fullWidth
              >
                <Button
                  style={{ border: "1px solid black", cursor: "pointer" }}
                  onClick={onUpladImageClick}
                >
                  change image
                  <input
                    accept={".*"}
                    multiple={false}
                    name={"theFiles"}
                    onChange={onImageInputChangeHanlder}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    type="file"
                  />
                </Button>
              </FormControl>
            </Grid>
          </Grid>
          {galleryType === "list" ? (
            <FormControl margin="normal">
              <Suspense fallback={"LOADING..."}>
                <TiptapEditor
                  onChange={(val) =>
                    formik.setFieldValue("image_description", val, true)
                  }
                  value={formik.values.image_description}
                  showMenu={false}
                  height={200}
                  title="Image Description"
                />
              </Suspense>
            </FormControl>
          ) : (
            ""
          )}
          <Grid
            container
            spacing={2}
          >
            <Grid item>
              <Button
                variant="contained"
                type="submit"
              >
                Save changes
              </Button>
            </Grid>
            <Grid item>
              {galleryImage ? (
                <a onClick={() => handleSelectImage()}>
                  {isSelected === false ? (
                    <Button variant="outlined">Selected</Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                    >
                      Selected
                    </Button>
                  )}
                </a>
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </form>
        <Divider sx={{ marginY: 6 }} />
      </Box>
    );
  } else {
    galleryFormDisplay = (
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            xs={12}
          >
            <FormControl
              margin="normal"
              fullWidth
            >
              {imageDisplay}
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <a onClick={onUpladImageClick}>
              <Button variant="outlined">Add a new Image</Button>
              <input
                accept={".*"}
                multiple={false}
                name={"theFiles"}
                onChange={onImageInputChangeHanlder}
                ref={fileInputRef}
                style={{ display: "none" }}
                type="file"
              />
            </a>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                id="image_title"
                label="Image Title"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.image_title}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <TextField
                id="image_order"
                label="Image Order"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.image_order}
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl
              fullWidth
              margin="normal"
            >
              <Suspense fallback={"LOADING..."}>
                <TiptapEditor
                  onChange={(val) =>
                    formik.setFieldValue("image_description", val, true)
                  }
                  value={formik.values.image_description}
                  showMenu={false}
                  height={200}
                  title="Image Description"
                />
              </Suspense>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={10}
          >
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
            >
              Add to gallery
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {galleryFormDisplay}
    </Box>
  );
}

export default GalleryImageForm;

import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, FormControl, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useFormik } from "formik";
import { generateFileName } from "helpers/generateFileName";
import { useRef } from "react";

import TiptapEditor, { EditorHeight } from "components/tiptap/TipTapEditor";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import Image from "next/image";

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
            window.location.reload(); // BETTER FETCH THE POSTS THEN REFRESH PAGE
          }
        },
        (error) => {
          console.log(error, "ERROR on gallery image");
        }
      );
    },
  });

  let pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const imageDisplay = formik.values.image_src && (
    <Box
      sx={{
        width: "250px",
        height: "250px",
        position: "relative",
      }}
    >
      <Image
        src={generateFileServerSrc(formik.values.image_src)}
        objectFit="contain"
        layout="fill"
      />
    </Box>
  );

  let galleryFormDisplay;
  if (galleryImage !== undefined) {
    galleryFormDisplay = (
      <Box
        display="flex"
        sx={{ borderBottom: 1 }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
            padding={2}
          >
            <Grid
              item
              xs={4}
            >
              <Box>
                {imageDisplay}
                <FormControl
                  margin="normal"
                  fullWidth
                >
                  <Button
                    variant="outlined"
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
              </Box>
            </Grid>
            <Grid
              item
              xs={8}
            >
              <Grid
                container
                xs={12}
                spacing={2}
              >
                {galleryType === "list" && (
                  <Grid
                    item
                    xs={8}
                  >
                    <TextField
                      id="image_title"
                      label="Board member name"
                      type="text"
                      fullWidth
                      margin="normal"
                      onChange={formik.handleChange}
                      value={formik.values.image_title}
                    />
                  </Grid>
                )}
                <Grid
                  item
                  xs={galleryType === "list" ? 4 : 12}
                >
                  <TextField
                    id="image_order"
                    label={
                      (pathname === "/admin/about"
                        ? "Board member"
                        : "Image ") + " order"
                    }
                    type="text"
                    fullWidth
                    margin="normal"
                    onChange={formik.handleChange}
                    value={formik.values.image_order}
                  />
                </Grid>
              </Grid>
              {galleryType === "list" && (
                <Grid
                  item
                  xs={12}
                  margin="0 auto"
                >
                  <TiptapEditor
                    onChange={(val) =>
                      formik.setFieldValue("image_description", val, true)
                    }
                    value={formik.values.image_description}
                    showMenu={false}
                    height={EditorHeight.small}
                    title="Board member about"
                  />
                </Grid>
              )}
            </Grid>
            <Grid
              item
              xs={6}
            ></Grid>
            <Grid
              xs={6}
              item
              display="flex"
              gap={1}
              justifyContent={"flex-end"}
            >
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

              <Button
                variant="contained"
                type="submit"
              >
                Save changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  } else {
    galleryFormDisplay = (
      <Box padding={4}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={6}
            >
              <Box
                display={"flex"}
                justifyContent="center"
                alignItems={"center"}
                border={1}
                width={"100%"}
                height={"100%"}
              >
                <>
                  <a onClick={onUpladImageClick}>
                    <Button
                      variant="outlined"
                      fullWidth
                    >
                      Upload Image
                    </Button>
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
                  {formik.values.image_src === "" ? (
                    <ImageIcon
                      fontSize="large"
                      sx={{ color: "gray" }}
                    />
                  ) : (
                    <>{imageDisplay}</>
                  )}
                </>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
            >
              {pathname === "/admin/about" ? (
                <FormControl
                  fullWidth
                  margin="normal"
                >
                  <TextField
                    id="image_title"
                    label="Board member name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.image_title}
                  />
                </FormControl>
              ) : null}
              <FormControl
                fullWidth
                margin="normal"
              >
                <TextField
                  id="image_order"
                  label={
                    (pathname === "/admin/about" ? "Board member" : "Image ") +
                    " order"
                  }
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.image_order}
                />
              </FormControl>
            </Grid>

            {pathname === "/admin/about" ? (
              <Grid
                item
                xs={12}
              >
                <FormControl
                  fullWidth
                  margin="normal"
                >
                  <TiptapEditor
                    onChange={(val) =>
                      formik.setFieldValue("image_description", val, true)
                    }
                    value={formik.values.image_description}
                    showMenu={false}
                    height={EditorHeight.small}
                    title="Board member about"
                  />
                </FormControl>
              </Grid>
            ) : (
              ""
            )}
            <Grid
              item
              xs={12}
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
      </Box>
    );
  }

  return <Box>{galleryFormDisplay}</Box>;
}

export default GalleryImageForm;

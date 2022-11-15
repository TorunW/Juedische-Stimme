import ImageIcon from "@mui/icons-material/Image";
import { uuidv4 } from "@firebase/util";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

import { Box, Button, FormControl, TextField, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useFormik } from "formik";
import { generateFileName } from "helpers/generateFileName";
import { useRef, useState } from "react";

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
  const [previewImage, setPreviewImage] = useState<
    string | ArrayBuffer | undefined
  >();
  const [previewImageFile, setPreviewImageFile] = useState<any>();

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

      let galleryImageFileName = null;
      if (previewImageFile !== null) {
        if (galleryImage) {
          if (!!galleryImage.image_src) {
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

        galleryImageFileName =
          previewImageFile.name.split(`.${fileType}`)[0] +
          `__${uuidv4()}.${fileType}`;

        const formData = new FormData();

        formData.append("theFiles", previewImageFile, galleryImageFileName);
        const categoryImageFileRequest = axios.post(
          "/api/uploads",
          formData,
          config
        );
        requestsArray.push(categoryImageFileRequest);
      }

      // const galleryImageRequest = axios({
      //   method: galleryImage ? "put" : "post",
      //   url: `/api/galleryimage${
      //     galleryImage ? "/" + galleryImage.image_id : ""
      //   }`,
      //   data: {
      //     ...values,
      //   },
      // });

      // requestsArray.push(galleryImageRequest);

      // axios({
      //   method: galleryImage ? "put" : "post",
      //   url: `/api/galleryimage${
      //     galleryImage ? "/" + galleryImage.image_id : ""
      //   }`,
      //   data: {
      //     ...values,
      //   },
      // }).then(
      //   (response) => {
      //     console.log(response, "response on gallery image (put or post)");
      //     if (response.data) {
      //       window.location.reload(); // BETTER FETCH THE POSTS THEN REFRESH PAGE
      //     }
      //   },
      //   (error) => {
      //     console.log(error, "ERROR on gallery image");
      //   }
      // );
    },
  });

  function onUpladImageClick() {
    fileInputRef.current.click();
  }

  const onImageInputChangeHanlder = (event) => {
    if (!event.target.files?.length) {
      return;
    }

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
      formik.setFieldValue("image_src", generateFileName(file.name));
      reader.readAsDataURL(file);
    }
  };

  const imageDisplay = previewImage ? (
    <img
      src={previewImage.toString()}
      width="100%"
    />
  ) : (
    formik.values.image_src && (
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
    )
  );

  const imageInputDisplay = (
    <Box
      p={4}
      sx={{
        display: "flex",
        background: "gray",
        alignSelf: "stretch",
        flex: 2,
        borderRadius: "3px",
        border: " 1px solid #ccc",
        backgroundColor: "#efefef",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {imageDisplay}
      <FormControl
        margin="normal"
        fullWidth
        sx={{
          position:
            formik.values.image_src || previewImage ? "absolute" : "relative",
          width: "auto",
          bottom: 5,
        }}
      >
        <Button
          className="add-img-btn"
          variant="contained"
          onClick={onUpladImageClick}
          color="secondary"
          startIcon={
            formik.values.image_src ? (
              <ChangeCircleIcon />
            ) : (
              <AddPhotoAlternateIcon />
            )
          }
        >
          {formik.values.image_src || previewImage
            ? "change image"
            : "upload image"}
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
  );

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={formik.handleSubmit}
    >
      <Box
        display="flex"
        sx={{ width: "100%" }}
      >
        <Grid
          xs={12}
          container
          spacing={2}
          padding={2}
        >
          <Grid
            item
            xs={4}
          >
            <Stack
              justifyContent="space-between"
              height="100%"
              paddingTop={2}
              paddingBottom={1}
            >
              {imageInputDisplay}
            </Stack>
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
                  xs={9}
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
                xs={galleryType === "list" ? 3 : 12}
              >
                <TextField
                  id="image_order"
                  label={"order"}
                  placeholder={"#"}
                  type="number"
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
            <Grid
              xs={12}
              item
              display="flex"
              gap={1}
              justifyContent={"flex-end"}
            >
              <Button
                variant="contained"
                color="secondary"
                type="submit"
              >
                Save changes
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default GalleryImageForm;

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";
import Image from "next/image";
import { FC, ReactElement } from "react";

type Props = {
  previewImage: string;
  postId: any;
  imageNumber: any;
  image: string;
  setPreviewImage: Function;
  setPreviewImageFile: Function;
  error?: string | ReactElement;
  onChange: any;
  onDelete?: any;
};

export const ImageUploadField: FC<Props> = ({
  previewImage,
  postId,
  imageNumber,
  image,
  setPreviewImage,
  setPreviewImageFile,
  onChange,
  onDelete,
  error,
}) => {
  function deleteImage() {
    if (postId) {
      const requestsArray = [];
      const imageDeleteRequest = axios.delete(`/api/posts/${postId}/image`, {
        data: {
          image_number: imageNumber,
        },
      });
      requestsArray.push(imageDeleteRequest);
      const deleteFileUrl = `http://${window.location.hostname}${
        window.location.port !== "80" ? ":" + window.location.port : ""
      }/media/${image}`;
      const deleteFileRequest = axios.delete(deleteFileUrl);
      requestsArray.push(deleteFileRequest);

      axios
        .all([...requestsArray])
        .then(
          axios.spread((...responses) => {
            console.log(responses, " RESPONSES");
            onDelete();
          })
        )
        .catch((errors) => {
          console.log(errors, " ERRORS");
          onDelete();
        });
    }
    // onDelete();
  }

  const onImageChange = (event) => {
    onChange(event.target.files[0]);
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
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Grid
        container
        item
        xs={12}
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

        {previewImage !== null ? (
          <Grid
            xs={12}
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            <Image
              layout="fixed"
              width={320}
              height={180}
              src={previewImage}
            />
          </Grid>
        ) : image !== "" && image != null ? (
          <Grid
            xs={12}
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            <img
              width={320}
              height={180}
              src={generateFileServerSrc(image)}
            />
          </Grid>
        ) : (
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
        )}

        {image ? (
          <Button
            onClick={() => deleteImage()}
            sx={{ position: "absolute", bottom: 0, right: 0, zIndex: 10 }}
          >
            <DeleteForeverIcon sx={{ fontSize: "50px" }} />
          </Button>
        ) : (
          ""
        )}

        <input
          id="post_image"
          name="post_image"
          type="file"
          onChange={onImageChange}
          style={{
            position: "absolute",
            width: "100%",
            cursor: "pointer",
            height: "215px",
            opacity: 0,
          }}
        />
      </Grid>
      {error}
    </>
  );
};

import React, { ReactElement, FC, ChangeEventHandler } from "react";
import { Button, TextField, Grid } from "@mui/material";
import Image from "next/image";

type Props = {
  previewImage: string;
  image: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error?: string | ReactElement;
};

export const ImageUploadField: FC<Props> = ({
  previewImage,
  image,
  onChange,
  error,
}) => {
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
        ) : image ? (
          <Grid
            xs={12}
            sx={{ marginTop: 2, textAlign: "center" }}
          >
            <Image
              layout="fixed"
              width={320}
              height={180}
              src={image}
            />
          </Grid>
        ) : (
          ""
        )}
        <input
          id="post_image"
          name="post_image"
          type="file"
          onChange={onChange}
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

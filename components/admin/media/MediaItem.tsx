import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { generateImageUrl } from "helpers/imageUrlHelper";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export const MediaItem = ({ mediaItem }) => {
  const [open, setOpen] = useState(false);

  console.log(open, " DELETE DIALOG OPEN");
  function deleteMediaItem(mediaItem) {
    const deleteFileUrl = `http://${window.location.hostname}${
      window.location.port !== "80" ? ":" + window.location.port : ""
    }/media/${mediaItem.meta_value.split("/").join("+++")}`;
    const deleteFileRequest = axios.delete(deleteFileUrl);
    const deleteMediaItemUrl = `/api/media/${mediaItem.meta_id}`;
    const deleteMediaItemRequest = axios.delete(deleteMediaItemUrl);

    axios
      .all([deleteFileRequest, deleteMediaItemRequest])
      .then(
        axios.spread((...responses) => {
          window.location.reload();
          // use/access the results
        })
      )
      .catch((errors) => {
        console.log(errors, " ERRORS");
        // react on errors.
      });
  }
  return (
    <Box
      sx={{
        height: "250px",
        width: "25%",
        maxWidth: "25%",
        padding: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e6e6e6",
          height: "100%",
          width: "100%",
          position: "relative",
          padding: 1,
        }}
      >
        <Image
          layout="fill"
          objectFit="cover"
          src={generateImageUrl(mediaItem.meta_value)}
        />
        <Box sx={{ position: "absolute", top: "8px", right: "8px" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setOpen(true)}
            sx={{
              marginRight: 1,
              backgroundColor: "red",
            }}
          >
            <DeleteForeverIcon />
          </Button>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
          >
            <DialogTitle>{"Delete Media Item?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {` Once the media item is deleted it can't be retrived again`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={() => deleteMediaItem(mediaItem)}
                autoFocus
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Button
            variant="contained"
            size="small"
            onClick={() => console.log(mediaItem)}
            sx={{
              backgroundColor: "dodgerblue",
            }}
          >
            <CloudDownloadIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

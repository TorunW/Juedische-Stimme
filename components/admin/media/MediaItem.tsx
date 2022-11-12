import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { generateFileServerSrc } from "helpers/generateFileServerSrc";

export const MediaItem = ({ mediaItem }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  console.log(mediaItem);
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
          src={generateFileServerSrc(mediaItem.meta_value)}
          onClick={() => setImageDialogOpen(true)}
        />

        <Dialog
          open={imageDialogOpen}
          onClose={() => setImageDialogOpen(false)}
        >
          <DialogContent>
            <Box sx={{ width: "600px", height: "600px", display: "flex" }}>
              <img
                style={{ maxWidth: "100%", maxHeight: "100", margin: "0 auto" }}
                src={generateFileServerSrc(mediaItem.meta_value)}
              />
            </Box>
          </DialogContent>
        </Dialog>

        <Box sx={{ position: "absolute", top: "8px", right: "8px" }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setDeleteDialogOpen(true)}
            sx={{
              marginRight: 1,
              backgroundColor: "red",
            }}
          >
            <DeleteForeverIcon />
          </Button>

          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
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
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "dodgerblue",
            }}
          >
            <a
              style={{ height: "25px" }}
              href={`/wp-content/uploads/${mediaItem.meta_value}`}
              download
            >
              <CloudDownloadIcon />
            </a>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

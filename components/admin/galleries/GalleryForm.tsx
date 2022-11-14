import React, { useState } from "react";
import axios from "axios";
import GalleryImageForm from "./GalleryImageForm";
import { Image } from "types/Image.type";
import { Gallery } from "types/Gallery.type";
import { Button, Card, FormControl, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { sortGalleryByOrder } from "helpers/sortGalleryByOrder";

interface GalleryFromProps {
  gallery?: Gallery;
  galleryType: "list" | "header";
}

function GalleryForm({ gallery, galleryType }: GalleryFromProps) {
  const [selectedImages, setSelectedImages] = useState<Image[]>([]);

  function handleSelectImage(galleryImage: Image) {
    let newSelectedImages = [];
    const selectedImageIndex = selectedImages.findIndex(
      (sImg) => sImg.image_src === galleryImage.image_src
    );
    if (selectedImageIndex === -1) {
      newSelectedImages = [...selectedImages, galleryImage];
    } else {
      newSelectedImages = [...selectedImages];
      newSelectedImages.splice(selectedImageIndex, 1);
    }
    setSelectedImages(newSelectedImages);
  }

  function deleteSelectedImages() {
    let deleteRequests = [];

    if (selectedImages.length > 0) {
      selectedImages.forEach(function (img: Image, index: number) {
        const deleteFileUrl = `http://${window.location.hostname}${
          window.location.port !== "80" ? ":" + window.location.port : ""
        }/media/${img.image_src.split("/").join("+++")}`;
        const deleteFileRequest = axios.delete(deleteFileUrl);
        deleteRequests.push(deleteFileRequest);
        const deleteGalleryImageUrl = `/api/galleryimage/${img.image_id}`;
        const deleteGalleryImageRequest = axios.delete(deleteGalleryImageUrl);
        deleteRequests.push(deleteGalleryImageRequest);
      });

      axios
        .all([...deleteRequests])
        .then(
          axios.spread((...responses) => {
            window.location.reload();
          })
        )
        .catch((errors) => {
          console.log(errors, " ERRORS");
          // react on errors.
        });
    }
  }

  return (
    <Box sx={{ width: "100%", maxWidth: "1067px", margin: "0 auto" }}>
      <Card
        sx={{
          paddingX: 4,
          paddingY: 2,
          margin: 2,
        }}
      >
        <Grid
          container
          spacing={2}
          display="flex"
          alignItems={"center"}
        >
          <GalleryImageForm
            galleryId={gallery.gallery_id}
            galleryType={gallery.gallery_type}
          />
        </Grid>
      </Card>
      <Card
        sx={{
          paddingX: 4,
          paddingY: 2,
          margin: 2,
        }}
      >
        {gallery.images &&
          gallery.images.sort(sortGalleryByOrder).map((galleryImage: Image) => (
            <GalleryImageForm
              key={galleryImage.image_id}
              galleryImage={galleryImage}
              galleryId={gallery.gallery_id}
              galleryType={gallery.gallery_type}
              handleSelectImage={() => handleSelectImage(galleryImage)}
              isSelected={
                selectedImages.findIndex(
                  (sImg) => sImg.image_src === galleryImage.image_src
                ) > -1
              }
            />
          ))}
      </Card>
    </Box>
  );
}

export default GalleryForm;

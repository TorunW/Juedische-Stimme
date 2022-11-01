import React from "react";
import { Paper, Stack } from "@mui/material";
import { Container } from "@mui/system";
import { MediaItem } from "./MediaItem";
import { useSelector } from "store/hooks";
const MediaItems = () => {
  const { mediaItems } = useSelector((state) => state.mediaItems);
  return (
    <Container>
      <Paper>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          padding={1}
        >
          {mediaItems &&
            mediaItems.map((mediaItem) => (
              <MediaItem
                mediaItem={mediaItem}
                key={Date.now()}
              />
            ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default MediaItems;

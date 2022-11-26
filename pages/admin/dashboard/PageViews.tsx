import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const getHeighestPageViews = (pageViewsArray) => {
  let heighestPageViews = 0;
  pageViewsArray.forEach((pageViews) => {
    if (pageViews > heighestPageViews) {
      heighestPageViews = pageViews;
    }
  });
  return heighestPageViews;
};

export function PageViews() {
  const [pageViews, setPageViews] = useState(null);
  if (!!pageViews) console.log(Object.values(pageViews), " PAGE VIEWS ARRAY ");
  const pageViewsArray = !!pageViews ? Object.values(pageViews) : [];
  const heighestPageViews = getHeighestPageViews(pageViewsArray);
  console.log(heighestPageViews, " PAGE VIEWS ARRAY ");

  useEffect(() => {
    fetch("/api/pageviews/count")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPageViews(data);
      });
  }, []);
  return (
    <Stack>
      <h1>Page Views</h1>
      <Stack
        flexDirection="row"
        gap={1}
        height={150}
        sx={{ backgroundColor: "common.gray", alignItems: "baseline" }}
      >
        {pageViewsArray.map((pageView: number, index: number) => {
          // calculate the height of the box based on the heighest page view
          const height = (pageView / heighestPageViews) * 100;

          return (
            <Stack
              key={pageView}
              height={150}
              flex="1"
            >
              <Box
                height={height}
                minHeight={5}
                sx={{
                  backgroundColor: "secondary.main",
                }}
              ></Box>
              <Typography>{index + 1}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

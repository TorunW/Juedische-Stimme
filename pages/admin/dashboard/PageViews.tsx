import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
enum MonthNames {
  "January",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
}
type MonthProps = {
  month: string;
  year: string;
  pageViews: number;
};

const getHeighestPageViews = (monthsArray) => {
  let heighestPageViews = 0;
  monthsArray.forEach((month: MonthProps) => {
    if (month.pageViews > heighestPageViews) {
      heighestPageViews = month.pageViews;
    }
  });
  return heighestPageViews;
};

export function PageViews() {
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState(null);
  const monthsArray = !!months ? Object.values(months) : [];
  const heighestPageViews = getHeighestPageViews(monthsArray);

  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    fetch("/api/pageviews/count")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setMonths(data);
      });
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      fetch(`/api/pageviews/${selectedMonth.year}/${selectedMonth.month}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, " DATA ");
        });
    }
  }, [selectedMonth]);

  return (
    <Stack>
      <Stack flexDirection="row">
        <VisibilityIcon sx={{ fontSize: 40, mr: 1 }} />
        <Typography
          variant="h4"
          fontWeight={800}
          mb={2}
        >
          Page Views
        </Typography>
      </Stack>
      <Stack
        flexDirection="row-reverse"
        p={1}
        gap={1}
        height={160}
        sx={{
          backgroundColor: "lightgray",
          alignItems: "baseline",
        }}
      >
        {!!loading ? (
          <Stack
            flex="1"
            height={150}
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress
              size={80}
              sx={{
                color: "secondary.main",
              }}
            />
          </Stack>
        ) : (
          monthsArray.map((month: MonthProps, index: number) => {
            // calculate the height of the box based on the heighest page view
            const height = (month.pageViews / heighestPageViews) * 100;
            return (
              <Stack
                key={`${month.month}-${month.year}`}
                height={160}
                flex="1"
                maxWidth={"100%"}
              >
                <Box
                  onClick={() => setSelectedMonth(month)}
                  height={height}
                  minHeight={5}
                  title={`${month.month} ${month.year} - ${month.pageViews} page views`}
                  sx={{
                    backgroundColor: "secondary.main",
                  }}
                ></Box>
                <Typography
                  sx={{
                    breakWord: "break-all",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {month.pageViews}
                  <br />
                  {MonthNames[month.month]}
                </Typography>
              </Stack>
            );
          })
        )}
      </Stack>
    </Stack>
  );
}

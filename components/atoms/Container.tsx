import React, { FC } from "react";
import { Box } from "@mui/material";
import { SxProps } from "@mui/material/styles";

type Props = {
  sx?: SxProps;
  children: React.ReactElement | React.ReactElement[];
};

export const Container: FC<Props> = ({ children, sx }) => {
  return (
    <Box sx={{ ...sx, maxWidth: "1067px", margin: "0 auto" }}>{children}</Box>
  );
};

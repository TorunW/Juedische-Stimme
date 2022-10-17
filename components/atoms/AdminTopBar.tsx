import React, { useState, Suspense, ReactElement, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";

interface Props {
  title?: string;
  tabs?: JSX.Element | JSX.Element[];
  // this is an object but if not jsx elemement ts be mad yo
}
const AdminTopBar: React.FC<Props> = ({ title, tabs }) => {
  return (
    <Box
      sx={{
        position: "relative",
        background: "#2e2e2e",
        color: "white",
        width: "100%",
        boxShadow: 4,
        zIndex: 3,
        paddingTop: 1,
      }}
    >
      <Box sx={{ marginX: 3, paddingBottom: 1 }}>
        <Typography variant="h4">{title}</Typography>
      </Box>
      {tabs}
    </Box>
  );
};

export default AdminTopBar;

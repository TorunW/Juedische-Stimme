import React, { useState } from "react";
import { Typography, Popover, Box, IconButton } from "@mui/material";
import HelpOutline from "@mui/icons-material/HelpOutline";

interface Props {
  text: string;
}

const FormHelp: React.FC<Props> = ({ text }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        color="secondary"
      >
        <HelpOutline color="secondary" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Typography sx={{ margin: 3 }}>{text}</Typography>
      </Popover>
    </Box>
  );
};

export default FormHelp;

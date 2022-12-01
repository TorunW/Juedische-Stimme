import FacebookIcon from '@mui/icons-material/Facebook';
import { IconButton } from '@mui/material';
import React from 'react';

export default function FacebookLink({ color }) {
  return (
    <IconButton
      href={'https://www.facebook.com/12juedischestimme'}
      target='_blank'
      rel='noopener noreferrer'
    >
      <FacebookIcon sx={{ color: color }} />
    </IconButton>
  );
}

import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton } from '@mui/material';
import React from 'react';

export default function InstagramLink({ color }) {
  return (
    <IconButton
      href={'https://www.instagram.com/juedischestimme/'}
      target='_blank'
      rel='noopener noreferrer'
    >
      <InstagramIcon sx={{ color: color }} />
    </IconButton>
  );
}

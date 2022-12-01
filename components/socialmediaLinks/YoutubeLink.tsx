import YouTubeIcon from '@mui/icons-material/YouTube';
import { IconButton } from '@mui/material';
import React from 'react';

export default function YoutubeLink({ color }) {
  return (
    <IconButton
      href={'https://www.youtube.com/@JSinternational'}
      target='_blank'
      rel='noopener noreferrer'
    >
      <YouTubeIcon sx={{ color: color }} />
    </IconButton>
  );
}

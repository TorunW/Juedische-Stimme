import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from '@mui/material';
import React from 'react';

export default function TwitterLink({ color }) {
  return (
    <IconButton
      href={'https://twitter.com/JNahost'}
      target='_blank'
      rel='noopener noreferrer'
    >
      <TwitterIcon sx={{ color: color }} />
    </IconButton>
  );
}

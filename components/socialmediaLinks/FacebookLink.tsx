import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'store/hooks';
import FacebookIcon from '@mui/icons-material/Facebook';
import { IconButton } from '@mui/material';

export default function FacebookLink({ color, type }) {
  const router = useRouter();
  const { locale } = useSelector((state) => state.languages);
  const origin = `https://www.juedische-stimme.${
    locale === 'en_US' ? 'com' : 'de'
  }`;

  const URL = `${origin}${router.asPath}`;
  return (
    <IconButton
      href={
        type === 'share'
          ? `https://www.facebook.com/sharer/sharer.php?u=${URL}`
          : 'https://www.facebook.com/12juedischestimme'
      }
      target='_blank'
      rel='noopener noreferrer'
    >
      <FacebookIcon sx={{ color: color }} />
    </IconButton>
  );
}

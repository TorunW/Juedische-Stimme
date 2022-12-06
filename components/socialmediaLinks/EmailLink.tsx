import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'store/hooks';
import EmailIcon from '@mui/icons-material/Email';
import { IconButton } from '@mui/material';

export default function EmailLink({ color, description }) {
  const router = useRouter();
  const { locale } = useSelector((state) => state.languages);
  const origin = `https://www.juedische-stimme.${
    locale === 'en_US' ? 'com' : 'de'
  }`;

  const URL = `${origin}${router.asPath}`;

  return (
    <IconButton
      href={`mailto:info@example.com?&subject=You+have+to+See+this!&cc=&bcc=&body=Check+out+this+site:${URL}\n${encodeURI(
        description.replace(/<[^>]*>?/gm, '')
      )}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <EmailIcon sx={{ color: color }} />
    </IconButton>
  );
}

import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'store/hooks';
import TwitterIcon from '@mui/icons-material/Twitter';
import { IconButton } from '@mui/material';

interface ShareProps {
  description?: string;
  color: string;
  type: string;
}

export default function TwitterLink({ color, type, description }: ShareProps) {
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
          ? `https://twitter.com/intent/tweet?url=${URL}&text=${encodeURI(
              description.replace(/<[^>]*>?/gm, '')
            )}`
          : 'https://twitter.com/JNahost'
      }
      target='_blank'
      rel='noopener noreferrer'
    >
      <TwitterIcon sx={{ color: color }} />
    </IconButton>
  );
}

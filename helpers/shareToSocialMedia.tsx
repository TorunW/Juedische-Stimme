import { useRouter } from 'next/router';
import { useSelector } from 'store/hooks';
import FacebookLink from '@/components/socialmediaLinks/FacebookLink';
import TwitterLink from '@/components/socialmediaLinks/TwitterLink';
import Email from '@mui/icons-material/Email';
import EmailLink from '@/components/socialmediaLinks/EmailLink';

interface ShareProps {
  description: string;
}

export default function Share({ description }: ShareProps) {
  return (
    <>
      <div>
        {/* Facebook */}
        <FacebookLink color={'primary'} type={'share'} />

        {/* Twitter */}
        <TwitterLink
          color={'primary'}
          type={'share'}
          description={description}
        />

        {/* Email */}
        <EmailLink color={'primary'} description={description} />
      </div>
    </>
  );
}

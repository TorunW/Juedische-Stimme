import { useRouter } from 'next/router';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import useSWR from 'swr';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Result.module.css';
import { useState } from 'react';
import FacebookLink from '@/components/socialmediaLinks/FacebookLink';
import TwitterLink from '@/components/socialmediaLinks/TwitterLink';
import InstagramLink from '@/components/socialmediaLinks/InstagramLink';
import YoutubeLink from '@/components/socialmediaLinks/YoutubeLink';

const Result: LayoutPage = (props: LayoutPageProps) => {
  const [loading, setLoading] = useState(false);

  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    (url) => axios.get(url).then((res) => res.data)
  );

  if (loading === true) {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }

  let socialMediaDisplay = (
    <div className={styles.socialmediaMenu}>
      <p>{`Don't forget to follow us on socialmedia`}</p>
      <FacebookLink color={'white'} type={'link'} />
      <TwitterLink color={'white'} type={'link'} />
      <InstagramLink color={'white'} />
      <YoutubeLink color={'white'} />
    </div>
  );

  return (
    <main className={styles.resultsPage}>
      <Image
        src='/spenden.jpg'
        alt='donations-page-background'
        title='donations-page-background'
        layout='fill'
        objectFit='cover'
      />

      <div className={styles.container}>
        <div className={styles.topRow}>
          {error ? (
            <div>
              <h2>Sorry, something went wrong!</h2>
              <p>{error.message}</p>
            </div>
          ) : !data ? (
            <div className={styles.loadingButton}>
              <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div>
              <h2>
                <span>Thanks for your donation!</span>
              </h2>
              <p>Check your inbox for the receipt.</p>
            </div>
          )}
        </div>
        <div className={styles.bottomRow}>
          {loading === true ? (
            <div className={styles.loadingButton}>
              <div className={styles.ldsRing}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <Link href='/'>
              <button
                className={styles.loginButton + ' ' + styles.button}
                onClick={() => setLoading(true)}
              >
                Take me back to the main page
              </button>
            </Link>
          )}

          {socialMediaDisplay}
        </div>
      </div>
    </main>
  );
};

Result.layout = 'result';

export default Result;

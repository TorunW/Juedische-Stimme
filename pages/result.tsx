import { useRouter } from 'next/router';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import useSWR from 'swr';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Result.module.css';

const Result: LayoutPage = (props: LayoutPageProps) => {
  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    (url) => axios.get(url).then((res) => res.data)
  );
  console.log(data);

  // add order number
  // add signupp for newsletter or follow social media???

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
            <div>
              <p>Loading...</p>
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
          <Link href='/'>
            <button> Take me back to the main page</button>
          </Link>
        </div>
      </div>
    </main>
  );
};

Result.layout = 'result';

export default Result;

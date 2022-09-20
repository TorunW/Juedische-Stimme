import { useRouter } from 'next/router';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import useSWR from 'swr';
import axios from 'axios';

const Result: LayoutPage = (props: LayoutPageProps) => {
  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    (url) => axios.get(url).then((res) => res.data)
  );

  return (
    <div>
      <h1>Payment Result</h1>
      <h1>RESULT</h1>
      <h1>RESULT</h1>
      <h1>RESULT</h1>
      <h1>RESULT</h1>
      {error ? (
        <div>
          <p>Sorry, something went wrong!</p>
        </div>
      ) : !data ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <h2>
            <span>Thanks for your order!</span>
          </h2>
          <p>Check your inbox for the receipt.</p>
        </div>
      )}
    </div>
  );
};

Result.layout = 'main';

export default Result;

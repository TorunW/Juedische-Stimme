import excuteQuery from 'lib/db';
import FacebookTokenForm from 'components/admin/FacebookTokenForm';
import styles from 'styles/Home.module.css'

export default function EditFbTokenPage(props) {
  return (
    <section className={styles.container}>
      <h2>EDIT FB TOKEN</h2>
      <FacebookTokenForm fbToken={JSON.parse(props.fbToken)[0]} />
    </section>
  );
}

EditFbTokenPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const fbTokenResponse = await excuteQuery({
    query: `SELECT * FROM fb_token LIMIT 1`,
  });
  const fbToken = JSON.stringify(fbTokenResponse);
  return {
    props: {
      fbToken,
    },
  };
};

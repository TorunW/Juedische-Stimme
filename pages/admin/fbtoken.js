import excuteQuery from 'lib/db';
import FacebookTokenForm from 'components/admin/FacebookTokenForm';

export default function EditFbTokenPage(props) {
  return (
    <div>
      <h2>EDIT FB TOKEN</h2>
      <FacebookTokenForm fbToken={JSON.parse(props.fbToken)[0]} />
    </div>
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

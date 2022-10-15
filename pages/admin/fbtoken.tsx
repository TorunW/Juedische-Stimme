import excuteQuery from 'lib/db';
import FacebookTokenForm from 'components/admin/FacebookTokenForm';
import { selectUserByEmail } from 'lib/queries/users';
import { getCookie, hasCookie } from 'cookies-next';
import { useDispatch, useSelector } from 'store/hooks';
import { useEffect } from 'react';
import { setLoggedUser } from 'store/users/usersSlice';

export default function EditFbTokenPage(props) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
  }, []);

  return (
    <section>
      <FacebookTokenForm fbToken={JSON.parse(props.fbToken)[0]} />
    </section>
  );
}

EditFbTokenPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  let userEmail: string;
  if (!hasCookie('Token', { req: context.req, res: context.res })) {
    return { redirect: { destination: '/login', permanent: false } };
  } else {
    userEmail = getCookie('UserEmail', {
      req: context.req,
      res: context.res,
    }).toString();
  }

  let loggedUser: string;
  if (userEmail) {
    const userResponse = await excuteQuery({
      query: selectUserByEmail(userEmail),
    });
    loggedUser = JSON.stringify(userResponse);
  }

  const fbTokenResponse = await excuteQuery({
    query: `SELECT * FROM fb_token LIMIT 1`,
  });
  const fbToken = JSON.stringify(fbTokenResponse);
  return {
    props: {
      fbToken,
      loggedUser,
    },
  };
};

import { getCookie, hasCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { selectUserByEmail } from 'lib/queries/users';
import excuteQuery from 'lib/db';
import { useDispatch, useSelector } from 'store/hooks';
import { setLoggedUser } from 'store/users/usersSlice';

function AdminDashboard(props) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.users);
  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
  }, []);
  return (
    <section id='admin-dashboard'>
      <h2>Dashboard</h2>
      <hr />
      <p>
        Hi{' '}
        {/* {loggedUser !== null
          ? loggedUser.user_nicename.length > 0
            ? loggedUser.user_nicename
            : loggedUser.user_email
          : ''} */}
        ! <br />
        quick overview of things in the admin, things that need attention etc
      </p>
    </section>
  );
}

AdminDashboard.layout = 'admin';
export default AdminDashboard;

export const getServerSideProps = async (context: NextPageContext) => {
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

  return {
    props: {
      loggedUser,
    },
  };
};

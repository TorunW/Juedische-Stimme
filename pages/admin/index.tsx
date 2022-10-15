import { getCookie, hasCookie } from 'cookies-next';
import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { selectUserByEmail } from 'lib/queries/users';
import excuteQuery from 'lib/db';
import { useDispatch, useSelector } from 'store/hooks';
import { setLoggedUser } from 'store/users/usersSlice';
import AdminTopBar from '@/components/atoms/AdminTopBar';
import { Typography, Card, Box } from '@mui/material';
import FacebookTokenForm from '@/components/admin/FacebookTokenForm';

function AdminDashboard(props) {
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (props.loggedUser)
      dispatch(setLoggedUser(JSON.parse(props.loggedUser)[0]));
  }, []);

  return (
    <Box>
      <AdminTopBar title='Dashboard' />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 4,
          minHeight: '50vh',
        }}
      >
        <Typography variant='h4'>
          Hello
          {loggedUser !== null
            ? loggedUser.display_name.length > 0
              ? ' ' + loggedUser.display_name
              : ' ' + loggedUser.user_email
            : ''}
          !
        </Typography>
        <Card sx={{ marginTop: 2, padding: 4 }}>
          <FacebookTokenForm />
        </Card>
      </Box>
    </Box>
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

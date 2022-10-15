import { useEffect } from 'react';
import excuteQuery from 'lib/db';
import { selectUsers } from 'lib/queries/users';
import { useDispatch } from 'store/hooks';
import { setUsers } from 'store/users/usersSlice';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import Users from 'components/admin/users/Users';
import AdminTopBar from '@/components/atoms/AdminTopBar';

const AdminUsersPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUsers(JSON.parse(props.users)));
  }, [props.users]);

  return (
    <section>
      <AdminTopBar title='Users List' />
      <Users />
    </section>
  );
};

AdminUsersPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const usersResponse = await excuteQuery({
    query: selectUsers(10, context.query.number),
  });
  const users = JSON.stringify(usersResponse);
  return {
    props: {
      users: users,
    },
  };
};

export default AdminUsersPage;

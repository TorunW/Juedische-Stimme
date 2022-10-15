import excuteQuery from 'lib/db';
import { selectUserById } from 'lib/queries/users';
import { LayoutPage } from 'types/LayoutPage.type';
import { LayoutPageProps } from 'types/LayoutPageProps.type';
import UserForm from '@/components/admin/users/UserForm';
import AdminTopBar from '@/components/atoms/AdminTopBar';

const AdminUserPage: LayoutPage = (props: LayoutPageProps) => {
  return (
    <>
      <AdminTopBar title={props.user ? 'Update' : 'Register new user'} />
      <UserForm user={JSON.parse(props.user)[0]} />
    </>
  );
};

AdminUserPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const userResponse = await excuteQuery({
    query: selectUserById(context.query.id),
  });
  const user = JSON.stringify(userResponse);
  return {
    props: {
      user: user,
    },
  };
};

export default AdminUserPage;

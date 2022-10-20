import { useEffect } from "react";
import excuteQuery from "lib/db";
import { selectUsers } from "lib/queries/users";
import { useDispatch } from "store/hooks";
import { setUsers } from "store/users/usersSlice";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";
import Users from "components/admin/users/Users";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const usersResponse = await excuteQuery({
      query: selectUsers(10, context.query.number),
    });
    const users = JSON.stringify(usersResponse);
    return {
      props: {
        users: users,
        loggedUser,
      },
    };
  }
);

const AdminUsersPage: LayoutPage = (props: LayoutPageProps) => {
  const {} = useLoggedUser(props);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUsers(JSON.parse(props.users)));
  }, [props.users]);

  return (
    <section>
      <AdminTopBar title="Users List" />
      <Users />
    </section>
  );
};

AdminUsersPage.layout = "admin";

export default AdminUsersPage;

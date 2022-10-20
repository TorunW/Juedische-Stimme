import excuteQuery from "lib/db";
import { selectUserById } from "lib/queries/users";
import { LayoutPage } from "types/LayoutPage.type";
import { LayoutPageProps } from "types/LayoutPageProps.type";
import UserForm from "@/components/admin/users/UserForm";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const userResponse = await excuteQuery({
      query: selectUserById(context.query.id),
    });
    const user = JSON.stringify(userResponse);
    return {
      props: {
        user,
        loggedUser,
      },
    };
  }
);

const AdminUserPage: LayoutPage = (props: LayoutPageProps) => {
  const {} = useLoggedUser(props);

  return (
    <>
      <AdminTopBar title="Update User" />
      <UserForm user={JSON.parse(props.user)[0]} />
    </>
  );
};

AdminUserPage.layout = "admin";

export default AdminUserPage;

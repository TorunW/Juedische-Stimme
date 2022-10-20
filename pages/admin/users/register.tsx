import UserForm from "@/components/admin/users/UserForm";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { useLoggedUser } from "hooks/useLoggedUser";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    return {
      props: {
        loggedUser,
      },
    };
  }
);

function Register(props) {
  const {} = useLoggedUser(props);
  return (
    <section>
      <AdminTopBar title="Register new User" />
      <UserForm />
    </section>
  );
}

Register.layout = "admin";

export default Register;

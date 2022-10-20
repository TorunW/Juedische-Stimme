import AdminTopBar from "@/components/atoms/AdminTopBar";
import MenuItemForm from "components/admin/menus/MenuItemForm";
import { useLoggedUser } from "hooks/useLoggedUser";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import styles from "styles/Home.module.css";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    return {
      props: {
        loggedUser,
      },
    };
  }
);

export default function AdminCreateMenuItemPage(props) {
  const {} = useLoggedUser(props);
  return (
    <div className={styles.container}>
      <AdminTopBar title="Create New Menu Item" />
      <MenuItemForm />
    </div>
  );
}

AdminCreateMenuItemPage.layout = "admin";

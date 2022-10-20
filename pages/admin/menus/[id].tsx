import excuteQuery from "lib/db";
import { selectMenuItemById } from "lib/queries/menuItems";
import MenuItemForm from "components/admin/menus/MenuItemForm";
import AdminTopBar from "@/components/atoms/AdminTopBar";
import { Container } from "@/components/atoms/Container";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const menuItemReponse = await excuteQuery({
      query: selectMenuItemById(context.query.id),
    });
    const menuItem = JSON.stringify(menuItemReponse);
    return {
      props: {
        menuItem,
        loggedUser,
      },
    };
  }
);

export default function AdminMenuItemEditPage(props) {
  const {} = useLoggedUser(props);
  const menuItem = JSON.parse(props.menuItem)[0];

  return (
    <>
      <AdminTopBar title="Edit Menu Item" />
      <Container>
        <MenuItemForm menuItem={menuItem} />
      </Container>
    </>
  );
}

AdminMenuItemEditPage.layout = "admin";

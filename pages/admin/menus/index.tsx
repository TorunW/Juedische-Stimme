import excuteQuery from "lib/db";
import MenuItems from "components/admin/menus/MenuItems";
import { selectMenuItems } from "lib/queries/menuItems";
import { createAdminServerSideProps } from "page/admin-server-side-props";
import { HomePageProps } from "pages";
import { useLoggedUser } from "hooks/useLoggedUser";

export const getServerSideProps = createAdminServerSideProps<HomePageProps>(
  async ({ context, data: { loggedUser } }) => {
    const menuItemsReponse = await excuteQuery({
      query: selectMenuItems(),
    });
    const menuItems = JSON.stringify(menuItemsReponse);
    return {
      props: {
        menuItems,
        loggedUser,
      },
    };
  }
);

export default function AdminMenuItemsPage(props) {
  const {} = useLoggedUser(props);
  return <MenuItems menuItems={JSON.parse(props.menuItems)} />;
}

AdminMenuItemsPage.layout = "admin";

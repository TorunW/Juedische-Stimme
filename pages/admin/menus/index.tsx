import excuteQuery from "lib/db";
import MenuItems from "components/admin/menus/MenuItems";
import { selectMenuItems } from "lib/queries/menuItems";

export default function AdminMenuItemsPage(props) {
  return <MenuItems menuItems={JSON.parse(props.menuItems)} />;
}

AdminMenuItemsPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const menuItemsReponse = await excuteQuery({
    query: selectMenuItems(),
  });
  const menuItems = JSON.stringify(menuItemsReponse);
  return {
    props: {
      menuItems,
    },
  };
};

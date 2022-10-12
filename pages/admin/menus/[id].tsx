import excuteQuery from 'lib/db';
import styles from 'styles/Home.module.css';
import { selectMenuItemById } from 'lib/queries/menuItems';
import MenuItemForm from 'components/admin/menus/MenuItemForm';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function AdminMenuItemEditPage(props) {
  const menuItem = JSON.parse(props.menuItem)[0];
  return (
    <div>
      <AdminTopBar title='Edit Menu Item' />
      <MenuItemForm menuItem={menuItem} />
    </div>
  );
}

AdminMenuItemEditPage.layout = 'admin';

export const getServerSideProps = async (context) => {
  const menuItemReponse = await excuteQuery({
    query: selectMenuItemById(context.query.id),
  });
  const menuItem = JSON.stringify(menuItemReponse);
  return {
    props: {
      menuItem,
    },
  };
};

import excuteQuery from 'lib/db';
import styles from 'styles/Home.module.css';
import MenuItems from 'components/admin/menus/MenuItems';
import { selectMenuItems } from 'lib/queries/menuItems';
import AdminTopBar from '@/components/atoms/AdminTopBar';

export default function AdminMenuItemsPage(props) {
  return (
    <div className={styles.container}>
      <AdminTopBar title='Menu Items' />
      <hr />
      <MenuItems menuItems={JSON.parse(props.menuItems)} />
    </div>
  );
}

AdminMenuItemsPage.layout = 'admin';

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

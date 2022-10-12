import AdminTopBar from '@/components/atoms/AdminTopBar';
import MenuItemForm from 'components/admin/menus/MenuItemForm';
import styles from 'styles/Home.module.css';

export default function AdminCreateMenuItemPage(props) {
  return (
    <div className={styles.container}>
      <AdminTopBar title='Create New Menu Item' />
      <MenuItemForm />
    </div>
  );
}

AdminCreateMenuItemPage.layout = 'admin';

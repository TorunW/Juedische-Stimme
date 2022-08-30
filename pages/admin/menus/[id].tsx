import excuteQuery from 'lib/db'
import styles from 'styles/Home.module.css'
import { selectMenuItemById } from 'lib/queries/menuItems';
import MenuItemForm from 'components/admin/MenuItemForm';

export default function AdminMenuItemEditPage(props) {
    const menuItem = JSON.parse(props.menuItem)[0];
    return (
        <div className={styles.container}>
            <h2>EDIT MENU ITEM</h2>
            <hr/>
            <MenuItemForm menuItem={menuItem}/>     
        </div>
    )
}

AdminMenuItemEditPage.layout = "admin"

export const getServerSideProps = async (context) => {
  const menuItemReponse = await excuteQuery({
    query: selectMenuItemById(context.query.id)
  });
  const menuItem = JSON.stringify(menuItemReponse);
  return {
    props:{
        menuItem
    }
  }
}
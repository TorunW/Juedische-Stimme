import excuteQuery from 'lib/db'
import styles from 'styles/Home.module.css'
import MenuItems from 'components/admin/MenuItems';
import { selectMenuItems } from 'lib/queries';

export default function AdminMenuItemsPage(props) {
    return (
        <div className={styles.container}>
            <h2>MENU ITEMS</h2>
            <hr/>
            <MenuItems
                menuItems={JSON.parse(props.menuItems)}
            />          
        </div>
    )
}

AdminMenuItemsPage.layout = "admin"

export const getServerSideProps = async (context) => {
  const menuItemsReponse = await excuteQuery({
    query: selectMenuItems()
  });
  const menuItems = JSON.stringify(menuItemsReponse);
  return {
    props:{
        menuItems
    }
  }
}
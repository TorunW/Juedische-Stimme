import MenuItemForm from 'components/admin/MenuItemForm'
import styles from 'styles/Home.module.css'

export default function AdminCreateMenuItemPage(props) {
  
    return (
        <div className={styles.container}>
            <h2>CREATE MENU ITEM</h2>
            <hr/>
            <MenuItemForm />
        </div>
    )
}

AdminCreateMenuItemPage.layout = "admin"
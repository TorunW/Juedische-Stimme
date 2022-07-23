import styles from 'styles/Home.module.css'
import CategoryForm from 'components/admin/CategoryForm'

export default function CreateCategoryPage({maxId}) {
  return (
    <div className={styles.container}>
      <h2>NEW CATEGORY</h2>
        <CategoryForm />
    </div>
  )
}

CreateCategoryPage.layout = "admin";
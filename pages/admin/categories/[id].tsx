import { useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import CategoryForm from 'components/admin/CategoryForm'
import { selectCategory } from 'lib/queries'
import { useDispatch, useSelector } from 'store/hooks'
import { setCategory } from 'store/categories/categoriesSlice'

export default function EditCategoryPage(props) {
  // const { state, dispatch } = useContext(Context);
  const dispatch = useDispatch()
  const { category } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(setCategory(JSON.parse(props.category)[0]))
  },[props.category])
  return (
    <div className={styles.container}>
      <h2>EDIT CATEGORY</h2>
      {category ? <CategoryForm category={category} /> : ''}
    </div>
  )
}

EditCategoryPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const categoryResponse = await excuteQuery({
    query: selectCategory({categoryId:context.query.id})
  });
  const category = JSON.stringify(categoryResponse);
  return {
    props:{
      category:category
    }
  }
}
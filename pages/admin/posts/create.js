import { useEffect } from 'react'

import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import PostForm from 'components/admin/PostForm'
import { selectCategories } from 'lib/queries'

import { useDispatch, useSelector } from 'react-redux'
import { setCatgories } from 'store/categories/categoriesSlice'

export default function CreatePostPage(props) {
    
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(setCatgories(JSON.parse(props.categories)))
  },[])

  let nextPostId = JSON.parse(props.nextPostId).length > 0 ? JSON.parse(props.nextPostId)[0].max_id : ''
  
  return (
    <div className={styles.container}>
      <h2>NEW POST</h2>
      <PostForm 
        nextPostId={nextPostId}
        categories={categories}
      />
    </div>
  )
}

CreatePostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const nextPostIdResponse = await excuteQuery({
    query: ` SELECT max_id FROM js_maxids WHERE js_maxids.table='posts'`
  });
  const nextPostId = JSON.stringify(nextPostIdResponse);

  const categoriesResponse = await excuteQuery({
    query: selectCategories(50,context.query.number)
  });
  const categories = JSON.stringify(categoriesResponse);
  return {
    props:{
      nextPostId,
      categories
    }
  }
}
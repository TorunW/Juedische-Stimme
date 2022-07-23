import { useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import PostForm from 'components/admin/PostForm'
import { selectCategories, selectPostByName } from 'lib/queries'

import { useDispatch, useSelector } from 'react-redux'
import { setPost } from 'store/posts/postsSlice'
import { setCatgories } from 'store/categories/categoriesSlice'

export default function EditPostPage(props) {

  const dispatch = useDispatch()
  const { post } = useSelector(state => state.posts)
  const { categories } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(setPost(JSON.parse(props.post)[0]))
    dispatch(setCatgories(JSON.parse(props.categories)))
  },[])
  
  return (
    <div className={styles.container}>
      <h2>EDIT POST</h2>
      {post ? <PostForm post={post} categories={categories} /> : ''}
    </div>
  )
}

EditPostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const postsResponse = await excuteQuery({
    query: selectPostByName(context.query.name)
  });
  const post = JSON.stringify(postsResponse);
  const categoriesResponse = await excuteQuery({
    query: selectCategories(50,context.query.number)
  });
  const categories = JSON.stringify(categoriesResponse);
  return {
    props:{
      post:post,
      categories
    }
  }
}
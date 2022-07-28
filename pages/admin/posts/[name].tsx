import { useEffect } from 'react'
import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'
import PostForm from 'components/admin/PostForm'
import { selectPostByName } from 'lib/queries/posts'
import { selectCategories, selectGalleries } from 'lib/queries'

import { useDispatch, useSelector } from 'store/hooks'
import { setPost } from 'store/posts/postsSlice'
import { setCatgories } from 'store/categories/categoriesSlice'
import { setGalleries } from 'store/galleries/galleriesSlice';
import { LayoutPage } from 'types/LayoutPage.type'
import { LayoutPageProps } from 'types/LayoutPageProps.type'
import { setLanguages } from 'store/languages/languagesSlice'

const EditPostPage: LayoutPage = (props: LayoutPageProps) => {

  const dispatch = useDispatch()
  const { post } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPost(JSON.parse(props.post)[0]))
    dispatch(setCatgories(JSON.parse(props.categories)))
    dispatch(setGalleries(JSON.parse(props.galleries)))
    dispatch(setLanguages({
      locales:props.locales,
      locale:props.locale,
      defaultLocale:props.defaultLocale
    }))
  },[])
  
  return (
    <div className={styles.container}>
      <h2>EDIT POST</h2>
      {post ? <PostForm post={post} /> : ''}
    </div>
  )
}

EditPostPage.layout = "admin";

export const getServerSideProps = async (context) => {
  const postsResponse = await excuteQuery({
    query: selectPostByName({name:context.query.name,showUnpublished:true})
  });
  const post = JSON.stringify(postsResponse);
  const categoriesResponse = await excuteQuery({
    query: selectCategories(50,context.query.number)
  });
  const categories = JSON.stringify(categoriesResponse);
  const galleriesResponse = await excuteQuery({
    query: selectGalleries(50,context.query.number)
  });
  const galleries = JSON.stringify(galleriesResponse);
  console.log(context)
  return {
    props:{
      post,
      categories,
      galleries,
      locales:context.locales,
      locale:context.locale,
      defaultLocale:context.defaultLocale
    }
  }
}

export default EditPostPage;
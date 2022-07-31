import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectPosts } from 'lib/queries/posts'
import { selectCategories, selectMenuItems } from 'lib/queries'
import Posts from 'components/Posts'
import SearchFilter from 'components/SearchFilter';

import styles from 'styles/Home.module.css'

import { useDispatch, useSelector } from 'store/hooks'
import { setPosts } from 'store/posts/postsSlice'
import { setCatgories } from 'store/categories/categoriesSlice'
import { setMenuItems } from 'store/nav/navSlice';
import { LayoutPage } from 'types/LayoutPage.type'
import { LayoutPageProps } from 'types/LayoutPageProps.type'

const PostsPage: LayoutPage = (props: LayoutPageProps) => {

  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.posts)
  const {categories} = useSelector((state) => state.categories)

  useEffect(() => {
    dispatch(setCatgories(JSON.parse(props.categories)))
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setMenuItems(JSON.parse(props.navItems)))
  },[props.posts])

  return (
    <div className={styles.container}>
        {categories ? <SearchFilter categoryName={props.categoryName} categories={categories} /> : ""}
        {posts ? <Posts posts={posts}/> : ""}
    </div>
  )
}

PostsPage.layout = "main"

export const getServerSideProps = async (context) => {

    const navItemsResponse = await excuteQuery({
        query: selectMenuItems()
    });
    const navItems = JSON.stringify(navItemsResponse) 

    const postsResponse = await excuteQuery({
      query: selectPosts({numberOfPosts:10,pageNum:context.query.number})
    });
    const posts = JSON.stringify(postsResponse);
    const categoriesResponse = await excuteQuery({
      query: selectCategories(100)
    });
    const categories = JSON.stringify(categoriesResponse);

    return {
      props:{
        posts,
        categories,
        pageNum:context.query.number,
        navItems
      }
    }
}

export default PostsPage
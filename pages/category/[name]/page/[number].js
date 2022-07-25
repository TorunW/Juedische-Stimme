import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectPostsByTag } from 'lib/queries/posts'
import { selectCategories, selectNavItems } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import SearchFilter from 'components/SearchFilter';

import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'store/posts/postsSlice';
import { setCatgories } from 'store/categories/categoriesSlice'
import { setMenuItems } from 'store/nav/navSlice'

export default function PostsPage(props) {


  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)
  const { categories } = useSelector(state => state.categories)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setCatgories(JSON.parse(props.categories)))
    dispatch(setMenuItems(JSON.parse(props.navItems)))
  },[])

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
        query: selectNavItems()
    });
    const navItems = JSON.stringify(navItemsResponse)

    const postsResponse = await excuteQuery({
      query: selectPostsByTag({
        slug:context.query.name.split(' ').join('-').toLowerCase(),
        numberOfPosts:10,
        pageNum:context.query.number,
        isCategory:true
      })
    });
    const posts = JSON.stringify(postsResponse);
    const categoriesResponse = await excuteQuery({
      query: selectCategories(100)
    });
    const categories = JSON.stringify(categoriesResponse);
    console.log(categories)
    return {
      props:{
        posts,
        categories,
        categoryName:context.query.name,
        pageNum:context.query.number,
        navItems
      }
    }
}
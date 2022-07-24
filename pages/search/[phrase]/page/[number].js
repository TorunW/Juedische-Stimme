import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectNavItems, selectPostsBySearchPhrase, selectCategories } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice';
import SearchFilter from 'components/SearchFilter'
import { setCatgories } from 'store/categories/categoriesSlice'

export default function PostsPage(props) {
  
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)
  const { categories } = useSelector(state => state.categories)


  useEffect(() => {
    dispatch(setMenuItems(JSON.parse(props.navItems)))
    dispatch(setCatgories(JSON.parse(props.categories)))
    dispatch(setPosts(JSON.parse(props.posts)))
  },[])

  console.log(posts, " POSTS")

  return (
    <div className={styles.container}>
        {categories ? <SearchFilter categoryName={props.categoryName} phrase={props.phrase} categories={categories} /> : ""}
        {posts && posts.length > 0 ? <Posts posts={posts} phrase={props.phrase}/> : <h2>nothing found for {'"' + props.phrase + '"'}!</h2>}
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
      query: selectPostsBySearchPhrase(context.query.phrase,10,context.query.number)
    });
    const posts = JSON.stringify(postsResponse);

    const categoriesResponse = await excuteQuery({
      query: selectCategories(100)
    });
    const categories = JSON.stringify(categoriesResponse);

    return {
      props:{
        posts:posts,
        phrase:context.query.phrase,
        pageNum:context.query.number,
        navItems,
        categories
      }
    }
  }
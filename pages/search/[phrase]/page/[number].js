import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectNavItems, selectPostsBySearchPhrase } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice'

export default function PostsPage(props) {
  
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setMenuItems(JSON.parse(props.navItems)))
  },[])

  console.log(posts, " POSTS")

  return (
    <div className={styles.container}>
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
    return {
      props:{
        posts:posts,
        phrase:context.query.phrase,
        pageNum:context.query.number,
        navItems
      }
    }
  }
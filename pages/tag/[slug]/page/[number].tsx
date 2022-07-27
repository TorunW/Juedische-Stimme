import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectPostsByTag } from 'lib/queries/posts'
import { selectMenuItems } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'

import { useDispatch, useSelector } from 'store/hooks'
import { setPosts } from 'store/posts/postsSlice';
import { setMenuItems } from 'store/nav/navSlice'
import { LayoutPage } from 'types/LayoutPage.type'
import { LayoutPageProps } from 'types/LayoutPageProps.type'

const TagPostsPage: LayoutPage = (props: LayoutPageProps) => {
  
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setMenuItems(JSON.parse(props.navItems)))
  },[])

  return (
    <div className={styles.container}>
        {posts ? <Posts posts={posts}/> : ""}
        {/* PAGINATION NEEDED */
        // get total number of items - in this case post by COUNTING the table rows
        // create a reuseable component to display pagination
        // pass props.pageNum, totalItemsCount, itemsPerPage to pagination component
        /* /PAGINATION NEEDED */}
    </div>
  )
}

TagPostsPage.layout = "main"

export const getServerSideProps = async (context) => {
  const navItemsResponse = await excuteQuery({
      query: selectMenuItems()
  });
  const navItems = JSON.stringify(navItemsResponse) 
  const postsResponse = await excuteQuery({
    query: selectPostsByTag({
        slug:context.query.slug,
        numberOfPosts:10,
        pageNum:context.query.number
    })
  });
  const posts = JSON.stringify(postsResponse);
  return {
    props:{
      posts:posts,
      slug:context.query.slug,
      pageNum:context.query.number,
      navItems
    }
  }
}

export default TagPostsPage;
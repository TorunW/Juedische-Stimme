
import { useEffect } from 'react'

import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'

import AdminPosts from 'components/admin/Posts'
import { countPostsByTag, selectPosts } from 'lib/queries/posts';

import { useDispatch, useSelector } from 'react-redux'
import { setPosts, setPostsPagination } from 'store/posts/postsSlice';


export default function AdminPostsPage(props) {
  
  // const { state, dispatch } = useContext(Context);
  const dispatch = useDispatch()
  const { posts, postsPerPage, postsCount, pageNum } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setPostsPagination({postsPerPage:props.postsPerPage,postsCount:props.postsCount,pageNum:props.pageNum}))
  },[props.posts])

  let postsDisplay;
  if (posts){
    postsDisplay = (
      <AdminPosts 
        posts={posts} 
        pageNum={pageNum} 
        postsPerPage={postsPerPage} 
        postsCount={postsCount} 
        type={"admin"} 
        title={"posts"}
      />
    )
  }
  
  return (
    <div id="admin-posts-page" className={styles.container}>
        <h2>Posts</h2>
        <hr/>
        {postsDisplay}
    </div>
  )
}

AdminPostsPage.layout = "admin"

export const getServerSideProps = async (context) => {
  const categoryCountResponse = await excuteQuery({
    query:countPostsByTag({})
  })
    const postsResponse = await excuteQuery({
      query: selectPosts({
        numberOfPosts:50,
        pageNum:context.query.number,
        showUnpublished:true,
        postType:'post', 
        locale: context.locale !== context.defaultLocale ? context.locale : '',
      })
    });
    const posts = JSON.stringify(postsResponse);
    return {
      props:{
        posts,
        pageNum:context.query.number,
        postsCount:categoryCountResponse[0]['COUNT(*)'],
        postsPerPage:50,
      }
    }
  }
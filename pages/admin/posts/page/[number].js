
import { useEffect } from 'react'

import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'

import AdminPosts from 'components/admin/Posts'
import { selectPosts } from 'lib/queries/posts';

import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'store/posts/postsSlice';


export default function AdminPostsPage(props) {
  
  // const { state, dispatch } = useContext(Context);
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
  },[props.posts])

  let postsDisplay;
  if (posts){
    postsDisplay = <AdminPosts posts={posts}/>
  }
  
  return (
    <div className={styles.container}>
        <h2>Posts</h2>
        <hr/>
        {postsDisplay}
    </div>
  )
}

AdminPostsPage.layout = "admin"

export const getServerSideProps = async (context) => {
    
    const postsResponse = await excuteQuery({
      query: selectPosts({
        numberOfPosts:50,
        pageNum:context.query.number,
        showUnpublished:true,
        postType:'post', 
        fieldsList:['post_title','post_name','post_date']})
    });
    const posts = JSON.stringify(postsResponse);
    return {
      props:{
        posts,
        pageNum:context.query.number
      }
    }
  }
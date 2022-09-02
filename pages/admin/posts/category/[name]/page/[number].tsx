
import { ReactElement, useEffect } from 'react'

import styles from 'styles/Home.module.css'
import excuteQuery from 'lib/db'

import AdminPosts from '@/components/admin/posts/Posts'
import { countPostsByTag, selectPosts } from 'lib/queries/posts';

import { useDispatch, useSelector } from 'store/hooks'
import { setPosts, setPostsPagination } from 'store/posts/postsSlice';


export default function AdminPostsPage(props) {
  
  // const { state, dispatch } = useContext(Context);
  const dispatch = useDispatch()
  const { posts, postsPerPage, postsCount, pageNum } = useSelector(state => state.posts)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setPostsPagination({postsPerPage:props.postsPerPage,postsCount:props.postsCount,pageNum:props.pageNum}))
  },[props.posts])

  let postsDisplay: ReactElement;
  if (posts){
    postsDisplay = (
      <AdminPosts 
        posts={posts} 
        pageNum={pageNum} 
        postsPerPage={postsPerPage} 
        postsCount={postsCount} 
        type={"admin/posts/category"} 
        title={props.categoryName}
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
        query:countPostsByTag({slug:context.query.name,isCategory:true})
    })
    const postsResponse = await excuteQuery({
      query: selectPosts({
        numberOfPosts:50,
        slug: context.query.name.split(' ').join('-').toLowerCase(),
        isCategory:true,
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
        categoryName:context.query.name
      }
    }
  }
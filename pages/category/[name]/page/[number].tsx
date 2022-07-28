import { useEffect } from 'react'
import excuteQuery from 'lib/db'
import { selectPostsByTag } from 'lib/queries/posts'
import { selectCategories, selectMenuItems } from 'lib/queries'
import Posts from 'components/Posts'
import styles from 'styles/Home.module.css'
import SearchFilter from 'components/SearchFilter';

import { useDispatch, useSelector } from 'store/hooks';
import { setPosts } from 'store/posts/postsSlice';
import { setCatgories } from 'store/categories/categoriesSlice'
import { setMenuItems } from 'store/nav/navSlice'
import { LayoutPage } from 'types/LayoutPage.type'
import { LayoutPageProps } from 'types/LayoutPageProps.type'
import { setLanguages } from 'store/languages/languagesSlice'

const CategoryPostsPage: LayoutPage = (props: LayoutPageProps) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts)
  const { categories } = useSelector((state) => state.categories)

  useEffect(() => {
    dispatch(setPosts(JSON.parse(props.posts)))
    dispatch(setCatgories(JSON.parse(props.categories)))
    dispatch(setMenuItems(JSON.parse(props.navItems)))
    dispatch(setLanguages({
      locales:props.locales,
      locale:props.locale,
      defaultLocale:props.defaultLocale
    }))
  },[])

  return (
    <div className={styles.container}>
        {categories ? <SearchFilter phrase={''} categoryName={props.categoryName} categories={categories} /> : ""}
        {posts ? <Posts posts={posts}/> : ""}
    </div>
  )
}

CategoryPostsPage.layout = "main"

export const getServerSideProps = async (context) => {

    const navItemsResponse = await excuteQuery({
        query: selectMenuItems()
    });
    const navItems = JSON.stringify(navItemsResponse)

    const postsResponse = await excuteQuery({
      query: selectPostsByTag({
        slug:context.query.name.split(' ').join('-').toLowerCase(),
        numberOfPosts:10,
        pageNum:context.query.number,
        isCategory:true,
        locale: context.locale !== context.defaultLocale ? context.locale : ''
      })
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
        categoryName:context.query.name,
        pageNum:context.query.number,
        navItems,
        locales:context.locales,
        locale:context.locale,
        defaultLocale:context.defaultLocale
      }
    }
}

export default CategoryPostsPage;